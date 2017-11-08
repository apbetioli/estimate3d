package owlracle3d.estimator;

import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.Produces;
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api")
public class EstimatorController {

    @RequestMapping(path = "/estimate", method = RequestMethod.POST, consumes = "multipart/form-data")
    @Produces("application/json")
    @ResponseBody
    public List<Estimative> estimate(@RequestPart("file") MultipartFile file)
            throws IOException, InterruptedException, ArchiveException {

        Process process = execute(file);

        if(process.exitValue() != 0) {
            String err = getError(process);
            System.err.println(err);
            throw new IOException(err);
        }

        String out = getOutput(process);
        System.out.println(out);

        return parseGCode(file.getOriginalFilename());
    }

    private Process execute(MultipartFile file) throws IOException, InterruptedException, ArchiveException {

        String filesForInput = getFilesForSlicer(file);

        String command = String.format("bash slic3r/Slic3r --load %s --no-gui -o %s %s",
                getConfigFileName(), getOutputFilename(file.getOriginalFilename()), filesForInput);
        System.out.println("Executing: " + command);

        Process process = Runtime.getRuntime().exec(command);
        process.waitFor();
        return process;
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

    private String getOutputFilename(String originalFilename) {
        return String.format("temp/%s.gcode", originalFilename);
    }

    private String getError(Process process) throws IOException {
        ByteArrayOutputStream error = new ByteArrayOutputStream();
        IOUtils.copy(process.getErrorStream(), error);
        return error.toString();
    }

    private String getOutput(Process process) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        IOUtils.copy(process.getInputStream(), output);
        return output.toString();
    }

    private List<Estimative> parseGCode(String originalFilename) throws FileNotFoundException {
        String outputFilename = getOutputFilename(originalFilename);
        File outputFile = new File(outputFilename);
        Scanner scanner = new Scanner(outputFile);

        Estimative estimative = new Estimative();

        while (scanner.hasNextLine()) {
            String line = nextLine(scanner);
            if (line.startsWith("filamentused")) {
                String[] values = line.split("=");
                String[] dimensions = values[1].split("\\(");
                estimative.length = dimensions[0];
                estimative.volume = dimensions[1].replace(")", "");
                break;
            }
        }

        String[] values = nextLine(scanner).split("=");
        if ("filamentused".equals(values[0])) {
            estimative.weight = values[1];

            values = nextLine(scanner).split("=");
            estimative.cost = values[1];
        }
        else
            estimative.cost = values[1];

        return Arrays.asList(estimative);
    }

    private String nextLine(Scanner scanner) {
        return scanner.nextLine().replaceAll("[; \\)]", "");
    }

    private String getFilesForSlicer(MultipartFile file) throws IOException, ArchiveException {

        File tempDir = new File("temp");
        tempDir.mkdir();

        File tempFile = new File(tempDir, file.getOriginalFilename());
        tempFile.deleteOnExit();

        FileOutputStream os = new FileOutputStream(tempFile);
        IOUtils.copy(file.getInputStream(), os);
        os.close();

        if (file.getOriginalFilename().endsWith(".stl")) {
            return tempFile.getAbsolutePath();

        } else if (file.getOriginalFilename().endsWith(".zip")) {

            final StringBuilder names = new StringBuilder();

            decompress(tempFile)
                    .stream()
                    .map(file1 -> file1.getAbsolutePath() + " ")
                    .collect(Collectors.toList())
                    .forEach(names::append);

            return names.toString();
        } else {
            throw new IOException("Invalid file format " + file.getOriginalFilename());
        }

    }

    public List<File> decompress(File zipFile) throws ArchiveException, IOException {

        List<File> archiveContents = new ArrayList<>();

        final InputStream is = new FileInputStream(zipFile);
        ArchiveInputStream ais = new ArchiveStreamFactory().createArchiveInputStream(ArchiveStreamFactory.ZIP, is);

        ZipArchiveEntry entry = (ZipArchiveEntry) ais.getNextEntry();
        while (entry != null) {
            File outputFile = new File(zipFile.getParentFile(), entry.getName());
            OutputStream os = new FileOutputStream(outputFile);

            IOUtils.copy(ais, os);
            os.close();

            archiveContents.add(outputFile);

            entry = (ZipArchiveEntry) ais.getNextEntry();
        }

        ais.close();
        is.close();

        return archiveContents;
    }

    static class Estimative {
        public String cost;
        public String length;
        public String volume;
        public String weight;
    }
}
