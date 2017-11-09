package owlracle3d.estimator.command;

import java.io.FileNotFoundException;
import java.io.IOException;
import owlracle3d.estimator.core.Estimative;

public interface Command {

  void execute(String... params) throws IOException, InterruptedException;

  String getError() throws IOException;

  String getOutput() throws IOException;

  void setInputFileName(String inputFileName);

  void setOutputFileName(String outputFileName);

  boolean success();
}
