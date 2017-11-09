package owlracle3d.estimator.rest;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import javax.ws.rs.Produces;
import org.apache.commons.compress.archivers.ArchiveException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import owlracle3d.estimator.command.Command;
import owlracle3d.estimator.command.Slic3rCommand;
import owlracle3d.estimator.core.Estimative;
import owlracle3d.estimator.core.Files;
import owlracle3d.estimator.core.GCodeAnalyzer;

@RestController
@RequestMapping(path = "/api")
public class EstimatorController {

  @RequestMapping(path = "/estimate", method = RequestMethod.POST, consumes = "multipart/form-data")
  @Produces("application/json")
  @ResponseBody
  public List<Estimative> estimate(@RequestPart("file") MultipartFile file)
      throws IOException, InterruptedException, ArchiveException {

    List<String> inputFileNames = Files.getFilenamesFromMultipartFile(file);

    return inputFileNames
        .stream()
        .map(inputFileName -> execute(inputFileName, inputFileName + ".gcode"))
        .collect(Collectors.toList());
  }

  private Estimative execute(String inputFileName, String outputFilename) {

    try {
      Command command = new Slic3rCommand();
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
      throw new RuntimeException("Error", e);
    }
  }


}
