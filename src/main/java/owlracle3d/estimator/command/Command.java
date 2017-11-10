package owlracle3d.estimator.command;

import java.io.IOException;
import java.util.Properties;

public interface Command {

  void execute(String... params) throws IOException, InterruptedException;

  String getError() throws IOException;

  String getOutput() throws IOException;

  Properties getProperties() throws IOException;

  void setInputFileName(String inputFileName);

  void setOutputFileName(String outputFileName);

  boolean success();

  void setProperties(Properties properties) throws IOException;
}
