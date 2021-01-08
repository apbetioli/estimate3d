package owlracle3d.estimator.rest;

import org.apache.commons.compress.archivers.ArchiveException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import owlracle3d.estimator.core.Estimative;
import owlracle3d.estimator.core.Files;
import owlracle3d.estimator.core.GCodeAnalyzer;
import owlracle3d.estimator.slicers.Slic3r;
import owlracle3d.estimator.slicers.Slicer;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.Produces;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api")
public class EstimatorService {

    @PostMapping(path = "/estimate", consumes = "multipart/form-data")
    @Produces("application/json")
    @ResponseBody
    public Estimative estimate(
            @RequestParam("file") MultipartFile[] files,

            @RequestParam(value = "slicer", required = false, defaultValue = "slic3r") String slicerChoice,
            @RequestParam(value = "filament_density", required = false, defaultValue = "1.24") String filamentDensity,
            @RequestParam(value = "fill_density", required = false, defaultValue = "15") String fillDensity,
            @RequestParam(value = "layer_height", required = false, defaultValue = "0.2") String layerHeight,
            @RequestParam(value = "brim_width", required = false, defaultValue = "0") String brimWidth,

            @RequestParam(value = "preheat_bed_time", required = false, defaultValue = "5") String preheatBedTime,
            @RequestParam(value = "preheat_hotend_time", required = false, defaultValue = "2") String preheatHotendTime,

            @RequestParam(value = "filament_cost", required = false, defaultValue = "130") String filamentCost,
            @RequestParam(value = "power_rating", required = false, defaultValue = "1400") String powerRating,
            @RequestParam(value = "cost_of_energy", required = false, defaultValue = "0.72") String costOfEnergy,

            @RequestParam(value = "fail_average", required = false, defaultValue = "20") String failAverage,
            @RequestParam(value = "spray_use", required = false, defaultValue = "0.2") String sprayUse,
            @RequestParam(value = "additional_cost", required = false, defaultValue = "0") String additionalCost,

            @RequestParam(value = "investment", required = false, defaultValue = "2000") String investment,
            @RequestParam(value = "desired_return_time", required = false, defaultValue = "12") String desiredReturnTime,
            @RequestParam(value = "work_hours", required = false, defaultValue = "8") String workHours,

            @RequestParam(value = "profit", required = false, defaultValue = "200") String profit,
            @RequestParam(value = "transaction_fee", required = false, defaultValue = "4") String transactionFee,

            @RequestPart("filament_charge") String filamentCharge,
            @RequestPart("energy_charge") String energyCharge,
            @RequestPart("print_time_charge") String printTimeCharge,
            @RequestPart("additional_charge") String additionalCharge

    )
            throws IOException, InterruptedException, ArchiveException {

        List<String> inputFileNames = Files.getFilenamesFromMultipartFiles(files);

        Slicer slicer = createSlicer(slicerChoice);

        updateSlicerProperties(slicer, filamentCost, filamentDensity, fillDensity, layerHeight, brimWidth);

        List<Estimative> estimatives = inputFileNames
                .stream()
                .map(inputFileName -> estimate(slicer, inputFileName))
                .collect(Collectors.toList());

        BigDecimal preheatTimes = new BigDecimal(preheatBedTime).add(new BigDecimal(preheatHotendTime));

        Estimative total = new Estimative();
        total.name = "TOTAL";
        total.transaction_fee = new BigDecimal(transactionFee);

        for (Estimative part : estimatives) {
            part.transaction_fee = new BigDecimal(transactionFee);
            part.filament_cost = part.calculateFilamentCost(filamentCost);
            part.time = part.time.add(preheatTimes);
            part.energy_cost = calculateEnergyCost(powerRating, costOfEnergy, part.time);

            part.additional_cost = new BigDecimal(additionalCost)
                    .add(new BigDecimal(sprayUse))
                    .setScale(2, BigDecimal.ROUND_HALF_UP);

            part.roi = calculateROI(investment, desiredReturnTime, workHours, part.time);

            part.fail_average = new BigDecimal(failAverage);
            part.profit = new BigDecimal(profit);

            part.filament_charge = part.calculateFilamentCharge(filamentCharge);
            part.energy_charge = part.calculateEnergyCharge(costOfEnergy, energyCharge);
            part.print_time_charge = calculatePrintTimeCharge(printTimeCharge, part.time);
            part.additional_charge =  new BigDecimal(additionalCharge)
                    .setScale(2, BigDecimal.ROUND_HALF_UP);

            total.add(part);
        }

        total.fail_average = new BigDecimal(failAverage);
        total.profit = new BigDecimal(profit);

        return total;
    }

    private BigDecimal calculateROI(String investment, String desiredReturnTime, String workHours, BigDecimal time) {
        return new BigDecimal(investment)
                .divide(new BigDecimal(desiredReturnTime), 2, RoundingMode.HALF_UP)
                .divide(new BigDecimal(30), 2, RoundingMode.HALF_UP)
                .divide(new BigDecimal(workHours), 2, RoundingMode.HALF_UP)
                .divide(new BigDecimal(60), 2, RoundingMode.HALF_UP)
                .multiply(time)
                .setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    private BigDecimal calculateEnergyCost(String powerRating, String costOfEnergy, BigDecimal time) {
        return time
                .multiply(new BigDecimal(powerRating))
                .multiply(new BigDecimal(costOfEnergy))
                .divide(new BigDecimal(60 * 1000), 2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculatePrintTimeCharge(String printTimeCharge,  BigDecimal time) {
        return time
                .multiply(new BigDecimal(printTimeCharge))
                .divide(new BigDecimal(60), 2, RoundingMode.HALF_UP);
    }

    private void updateSlicerProperties(Slicer slicer,
                                        String filamentCost,
                                        String filamentDensity,
                                        String fillDensity,
                                        String layerHeight,
                                        String brimWidth)
            throws IOException {

        Properties properties = slicer.getProperties();
        if (filamentCost != null)
            properties.setProperty("filament_cost", filamentCost);
        if (filamentDensity != null)
            properties.setProperty("filament_density", filamentDensity);
        if (fillDensity != null) {
            properties.setProperty("fill_density", fillDensity + "%");
            properties.setProperty("fill_pattern", fillDensity.equals("100") ? "rectilinear" : "cubic");
        }
        if (layerHeight != null)
            properties.setProperty("layer_height", layerHeight);
        if (brimWidth != null)
            properties.setProperty("brim_width", brimWidth);
        slicer.setProperties(properties);
    }

    //TODO create factory
    private Slicer createSlicer(String slicerChoice) {
        if (slicerChoice == null || "slic3r".equals(slicerChoice))
            return new Slic3r();
        else
            throw new IllegalArgumentException("Invalid slicer " + slicerChoice);
    }

    private Estimative estimate(Slicer slicer, String inputFileName) {

        String outputFilename = inputFileName;

        try {
            if (!inputFileName.endsWith(".gcode")) {
                outputFilename += ".gcode";

                slicer.setInputFileName(inputFileName);
                slicer.setOutputFileName(outputFilename);

                if (!slicer.slice()) {
                    String err = slicer.getError();
                    System.err.println(err);
                    throw new IOException(err);
                }

                System.out.println(slicer.getOutput());
            }

            return new GCodeAnalyzer().estimate(outputFilename);

        } catch (Exception e) {
            //TODO improve exception handling
            throw new RuntimeException(e.getMessage(), e);
        } finally {
            new File(inputFileName).delete();
            new File(outputFilename).delete();
        }
    }


}
