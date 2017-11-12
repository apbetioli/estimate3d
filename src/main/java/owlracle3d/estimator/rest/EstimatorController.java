package owlracle3d.estimator.rest;

import org.apache.commons.compress.archivers.ArchiveException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import owlracle3d.estimator.slicers.Slicer;
import owlracle3d.estimator.slicers.Slic3r;
import owlracle3d.estimator.core.Estimative;
import owlracle3d.estimator.core.Files;
import owlracle3d.estimator.core.GCodeAnalyzer;

import javax.ws.rs.Produces;
import java.io.IOException;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api")
public class EstimatorController {

  @RequestMapping(path = "/estimate", method = RequestMethod.POST, consumes = "multipart/form-data")
  @Produces("application/json")
  @ResponseBody
  public Estimative estimate(@RequestPart("file") MultipartFile file)
      throws IOException, InterruptedException, ArchiveException {

    List<String> inputFileNames = Files.getFilenamesFromMultipartFile(file);

    Slicer slicer = new Slic3r();
    Properties properties = slicer.getProperties();
    properties.setProperty("filament_cost", "150");
    slicer.setProperties(properties);

    List<Estimative> estimatives = inputFileNames
        .stream()
        .map(inputFileName -> estimate(slicer, inputFileName, inputFileName + ".gcode"))
        .collect(Collectors.toList());

    if(estimatives.size() == 1)
      return estimatives.iterator().next();

    Estimative total = new Estimative();
    total.name = "TOTAL";

    for(Estimative part : estimatives)
      total.add(part);

    return total;
  }

  private Estimative estimate(Slicer slicer, String inputFileName, String outputFilename) {

    try {
      slicer.setInputFileName(inputFileName);
      slicer.setOutputFileName(outputFilename);

      if (!slicer.slice()) {
        String err = slicer.getError();
        System.err.println(err);
        throw new IOException(err);
      }

      System.out.println(slicer.getOutput());

      return new GCodeAnalyzer().estimate(outputFilename);

    } catch (Exception e) {
      throw new RuntimeException(e.getMessage(), e);
    }
  }


}
