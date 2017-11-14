package owlracle3d.estimator.slicers;

import org.apache.tomcat.util.http.fileupload.IOUtils;

import java.io.*;
import java.util.Properties;
import java.util.Random;

public class Slic3r implements Slicer {

    public static final String so = System.getProperty("os.name", "linux");

    private String inputFileName;

    private String outputFileName;

    private Process process;

    private Properties properties;

    @Override
    public boolean slice(String... params) throws IOException, InterruptedException {
        String executable;
        System.out.println(so);
        if (so.toLowerCase().contains("win")) {
            executable = "slicers\\slic3r-windows\\slic3r-console.exe";
            inputFileName = "\"" + inputFileName + "\"";
            outputFileName = "\"" + outputFileName + "\"";
        } else {
            executable = "bash slicers/slic3r-linux/Slic3r --no-gui";
        }

        String configFileName = storeTempConfigFile();

        String command = String.format("%s --load %s -o %s %s", executable, configFileName, outputFileName, inputFileName);
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
        if (properties == null) {
            properties = new Properties();
            properties.load(new FileReader(new File(getOriginalConfigFileName())));
        }
        return properties;
    }

    @Override
    public void setProperties(Properties properties) throws IOException {
        getProperties().putAll(properties);
    }

    @Override
    public void setInputFileName(String inputFileName) {
        this.inputFileName = inputFileName;
    }

    @Override
    public void setOutputFileName(String outputFileName) {
        this.outputFileName = outputFileName;
    }

    private String getOriginalConfigFileName() {
        return String.format("slicers" + File.separator + "slic3r-config.ini", so);
    }

    private String storeTempConfigFile() throws IOException {
        File file = new File("temp", new Random().nextLong() + "-slicer-config.ini");
        file.deleteOnExit();
        properties.store(new FileWriter(file), "");
        return file.getAbsolutePath();
    }

}
