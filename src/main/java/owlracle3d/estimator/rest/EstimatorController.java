package owlracle3d.estimator.rest;

import org.apache.commons.compress.archivers.ArchiveException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import owlracle3d.estimator.command.Command;
import owlracle3d.estimator.command.Slic3rCommand;
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

    Command command = new Slic3rCommand();
    Properties properties = command.getProperties();
    properties.setProperty("filament_cost", "150");
    command.setProperties(properties);

    List<Estimative> estimatives = inputFileNames
        .stream()
        .map(inputFileName -> execute(command, inputFileName, inputFileName + ".gcode"))
        .collect(Collectors.toList());

    if(estimatives.size() == 1)
      return estimatives.iterator().next();

    Estimative total = new Estimative();
    total.name = "TOTAL";

    for(Estimative part : estimatives)
      total.add(part);

    return total;
  }

  private Estimative execute(Command command, String inputFileName, String outputFilename) {

    try {
      command.setInputFileName(inputFileName);
      command.setOutputFileName(outputFilename);
      command.execute();

      if (!command.success()) {
        String err = command.getError();
        System.err.println(err);
        throw new IOException(err);
      }

      String out = command.getOutput();
      System.out.println(out);

      return new GCodeAnalyzer().estimate(outputFilename);

    } catch (Exception e) {
      throw new RuntimeException(e.getMessage(), e);
    }
  }


}
