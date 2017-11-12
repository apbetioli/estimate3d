package owlracle3d.estimator.slicers;

import java.io.IOException;
import java.util.Properties;

public interface Slicer {

  boolean slice(String... params) throws IOException, InterruptedException;

  String getError() throws IOException;

  String getOutput() throws IOException;

  Properties getProperties() throws IOException;

  void setInputFileName(String inputFileName);

  void setOutputFileName(String outputFileName);

  void setProperties(Properties properties) throws IOException;
}
