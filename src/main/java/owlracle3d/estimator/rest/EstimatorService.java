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

    @RequestMapping(path = "/estimate", method = RequestMethod.POST, consumes = "multipart/form-data")
    @Produces("application/json")
    @ResponseBody
    public Estimative estimate(
            @RequestPart("file") MultipartFile[] files,

            @RequestPart(value = "slicer", required = false) @DefaultValue("slic3r") String slicerChoice,
            @RequestPart(value = "filament_density", required = false) @DefaultValue("1.24") String filamentDensity,
            @RequestPart(value = "fill_density", required = false) @DefaultValue("15") String fillDensity,
            @RequestPart(value = "layer_height", required = false) @DefaultValue("0.2") String layer_height,
            @RequestPart(value = "brim_width", required = false) @DefaultValue("0") String brim_width,

            @RequestPart(value = "preheat_bed_time", required = false) @DefaultValue("5") String preheatBedTime,
            @RequestPart(value = "preheat_hotend_time", required = false) @DefaultValue("2") String preheatHotendTime,

            @RequestPart(value = "filament_cost", required = false) @DefaultValue("130") String filamentCost,
            @RequestPart(value = "power_rating", required = false) @DefaultValue("1400") String powerRating,
            @RequestPart(value = "cost_of_energy", required = false) @DefaultValue("0.72") String costOfEnergy,

            @RequestPart(value = "fail_average", required = false) @DefaultValue("20") String fail_average,
            @RequestPart(value = "spray_use", required = false) @DefaultValue("0.2") String spray_use,
            @RequestPart(value = "additional_cost", required = false) @DefaultValue("0") String additional_cost,

            @RequestPart(value = "investment", required = false) @DefaultValue("2000") String investment,
            @RequestPart(value = "desired_return_time", required = false) @DefaultValue("12") String desired_return_time,
            @RequestPart(value = "work_hours", required = false) @DefaultValue("8") String work_hours,

            @RequestPart(value = "profit", required = false) @DefaultValue("200") String profit

    )
            throws IOException, InterruptedException, ArchiveException {

        List<String> inputFileNames = Files.getFilenamesFromMultipartFiles(files);

        Slicer slicer = createSlicer(slicerChoice);

        updateSlicerProperties(slicer, filamentCost, filamentDensity, fillDensity, layer_height, brim_width);

        List<Estimative> estimatives = inputFileNames
                .stream()
                .map(inputFileName -> estimate(slicer, inputFileName))
                .collect(Collectors.toList());

        BigDecimal preheatTimes = new BigDecimal(preheatBedTime).add(new BigDecimal(preheatHotendTime));

        Estimative total = new Estimative();
        total.name = "TOTAL";

        for (Estimative part : estimatives) {
            part.time = part.time.add(preheatTimes);
            part.energy_cost = calculateEnergyCost(powerRating, costOfEnergy, part.time);

            part.additional_cost = new BigDecimal(additional_cost)
                    .add(new BigDecimal(spray_use))
                    .setScale(2, BigDecimal.ROUND_HALF_UP);

            part.roi = calculateROI(investment, desired_return_time, work_hours, part.time);

            part.fail_average = new BigDecimal(fail_average);
            part.profit = new BigDecimal(profit);

            total.add(part);
        }

        total.fail_average = new BigDecimal(fail_average);
        total.profit = new BigDecimal(profit);

        return total;
    }

    private BigDecimal calculateROI(String investment, String desired_return_time, String work_hours, BigDecimal time) {
        return new BigDecimal(investment)
                .divide(new BigDecimal(desired_return_time), 2, RoundingMode.HALF_UP)
                .divide(new BigDecimal(30), 2, RoundingMode.HALF_UP)
                .divide(new BigDecimal(work_hours), 2, RoundingMode.HALF_UP)
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

    private void updateSlicerProperties(Slicer slicer,
                                        String filamentCost,
                                        String filamentDensity,
                                        String fillDensity,
                                        String layer_height,
                                        String brim_width)
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
        if (layer_height != null)
            properties.setProperty("layer_height", layer_height);
        if (brim_width != null)
            properties.setProperty("brim_width", brim_width);
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
