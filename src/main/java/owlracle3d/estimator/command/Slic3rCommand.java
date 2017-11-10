package owlracle3d.estimator.command;

import java.io.*;
import java.util.Properties;

import org.apache.tomcat.util.http.fileupload.IOUtils;

public class Slic3rCommand implements Command {

  @Override
  public void execute(String... params) throws IOException, InterruptedException {
    String command = String.format("bash slic3r/Slic3r --load %s --no-gui -o %s %s",
        getConfigFileName(), outputFileName, inputFileName);
    System.out.println("Executing: " + command);

    process = Runtime.getRuntime().exec(command);
    process.waitFor();
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
    properties.load(new FileReader(new File("slic3r/config.ini")));
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
    properties.store(new FileWriter(new File("slic3r/config.ini")), "");
  }

  @Override
  public boolean success() {
    return process.exitValue() == 0;
  }

  private String getConfigFileName() {
    //TODO criar config.ini manualmente conforme dados do form
    //Pré-configs para  ABS/PLA (density, temperature, etc)
    //Entrada de custo de filamento
    //Entrada do tempo de aquecimento da base, hotend
    //Entrada do custo de energia ?
    //Qual é o tempo de impressão?

    return "slic3r/config.ini";
  }

  private String inputFileName;

  private String outputFileName;

  private Process process;
}
