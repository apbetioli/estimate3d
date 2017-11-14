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
            @RequestPart(value = "filament_cost", required = false) @DefaultValue("150") String filamentCost,
            @RequestPart(value = "slicer", required = false) @DefaultValue("slic3r") String slicerChoice,
            @RequestPart(value = "preheat_bed_time", required = false) @DefaultValue("0") String preheatBedTime,
            @RequestPart(value = "preheat_hotend_time", required = false) @DefaultValue("0") String preheatHotendTime,
            @RequestPart(value = "filament_density", required = false) @DefaultValue("1.24") String filamentDensity,
            @RequestPart(value = "power_rating", required = false) @DefaultValue("600") String powerRating,
            @RequestPart(value = "cost_of_energy", required = false) @DefaultValue("0") String costOfEnergy,
            @RequestPart(value = "fill_density", required = false) @DefaultValue("15") String fillDensity)
            throws IOException, InterruptedException, ArchiveException {

        List<String> inputFileNames = Files.getFilenamesFromMultipartFiles(files);

        Slicer slicer = createSlicer(slicerChoice);

        updateSlicerProperties(slicer, filamentCost, filamentDensity, fillDensity);

        List<Estimative> estimatives = inputFileNames
                .stream()
                .map(inputFileName -> estimate(slicer, inputFileName))
                .collect(Collectors.toList());

        BigDecimal preheatTimes = new BigDecimal(preheatBedTime).add(new BigDecimal(preheatHotendTime));

        Estimative total = new Estimative();
        total.name = "TOTAL";

        for (Estimative part : estimatives) {
            part.time = part.time.add(preheatTimes);
            part.energyCost = calculateEnergyCost(powerRating, costOfEnergy, part);
            total.add(part);
        }

        return total;
    }

    private BigDecimal calculateEnergyCost(String powerRating, String costOfEnergy, Estimative part) {
        return part.time
                .multiply(new BigDecimal(powerRating))
                .multiply(new BigDecimal(costOfEnergy))
                .divide(new BigDecimal(60 * 1000), 2, RoundingMode.HALF_UP);
    }

    //TODO move to slicer
    private void updateSlicerProperties(Slicer slicer, String filamentCost, String filamentDensity, String fillDensity) throws IOException {
        Properties properties = slicer.getProperties();
        if (filamentCost != null)
            properties.setProperty("filament_cost", filamentCost);
        if (filamentDensity != null)
            properties.setProperty("filament_density", filamentDensity);
        if (fillDensity != null)
            properties.setProperty("fill_density", fillDensity + "%");
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

        try {
            String outputFilename = inputFileName;

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
        }
    }


}
