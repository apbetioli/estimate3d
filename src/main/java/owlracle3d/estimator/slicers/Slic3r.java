package owlracle3d.estimator.slicers;

import java.io.*;
import java.util.Properties;

import org.apache.tomcat.util.http.fileupload.IOUtils;

public class Slic3r implements Slicer {

  public static final String so = System.getProperty("os.name", "linux");

  private String inputFileName;

  private String outputFileName;

  private Process process;

  @Override
  public boolean slice(String... params) throws IOException, InterruptedException {
    String executable;
    System.out.println(so);
    if(so.toLowerCase().contains("win")) {
      executable = "slicers\\slic3r-windows\\slic3r-console.exe";
      inputFileName = "\"" + inputFileName + "\"";
      outputFileName = "\"" + outputFileName + "\"";
    } else {
      executable = "bash slicers/slic3r-linux/Slic3r --no-gui";      
    }

    String command = String.format("%s --load %s -o %s %s", executable, getConfigFileName(), outputFileName, inputFileName);
    System.out.println("Executing: " + command);

    process = Runtime.getRuntime().exec(command);
    return process.waitFor() == 0;
  }

  @Override
  public String getError() throws IOException {
    ByteArrayOutputStream error = new ByteArrayOutputStream();
    IOUtils.copy(process.getErrorStream(), error);
    return error.toString();
  }

  @Override
  public String getOutput() throws IOException {
    ByteArrayOutputStream output = new ByteArrayOutputStream();
    IOUtils.copy(process.getInputStream(), output);
    return output.toString();
  }

  @Override
  public Properties getProperties() throws IOException {
    Properties properties = new Properties();
    properties.load(new FileReader(new File(getConfigFileName())));
    return properties;
  }

  @Override
  public void setInputFileName(String inputFileName) {
    this.inputFileName = inputFileName;
  }

  @Override
  public void setOutputFileName(String outputFileName) {
    this.outputFileName = outputFileName;
  }

  @Override
  public void setProperties(Properties properties) throws IOException {
    properties.store(new FileWriter(new File(getConfigFileName())), "");
  }

  private String getConfigFileName() {
    return String.format("slicers"+File.separator+"slic3r-config.ini", so);
  }

}
