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
  public Estimative estimate(
    @RequestPart("file") MultipartFile[] files, 
    @RequestPart(value="filament_cost", required=false) String filament_cost,
    @RequestPart(value="slicer", required=false) String slicerChoice)
      throws IOException, InterruptedException, ArchiveException {

    List<String> inputFileNames = Files.getFilenamesFromMultipartFiles(files);

    Slicer slicer = createSlicer(slicerChoice);
    
    Properties properties = slicer.getProperties();
    if(filament_cost != null)
      properties.setProperty("filament_cost", filament_cost);
    slicer.setProperties(properties);

    List<Estimative> estimatives = inputFileNames
        .stream()
        .map(inputFileName -> estimate(slicer, inputFileName))
        .collect(Collectors.toList());

    if(estimatives.size() == 1)
      return estimatives.iterator().next();

    Estimative total = new Estimative();
    total.name = "TOTAL";

    for(Estimative part : estimatives)
      total.add(part);

    return total;
  }

  private Slicer createSlicer(String slicerChoice) {
    if(slicerChoice == null || "slic3r".equals(slicerChoice))
      return new Slic3r();
    else
      throw new IllegalArgumentException("Invalid slicer " + slicerChoice);
  }

  private Estimative estimate(Slicer slicer, String inputFileName) {

    try {
      String outputFilename = inputFileName;

      if(!inputFileName.endsWith(".gcode")) {
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
      throw new RuntimeException(e.getMessage(), e);
    }
  }


}
