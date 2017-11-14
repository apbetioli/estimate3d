package owlracle3d.estimator.core;

import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Files {

    public static List<File> decompress(File zipFile) throws ArchiveException, IOException {

        List<File> archiveContents = new ArrayList<>();

        final InputStream is = new FileInputStream(zipFile);
        ArchiveInputStream ais = new ArchiveStreamFactory()
                .createArchiveInputStream(ArchiveStreamFactory.ZIP, is);

        File dir = new File(zipFile.getParentFile(), zipFile.getName().replace(".zip", ""));
        dir.mkdir();

        ZipArchiveEntry entry = (ZipArchiveEntry) ais.getNextEntry();
        while (entry != null) {

            if (entry.isDirectory()) {
                entry = (ZipArchiveEntry) ais.getNextEntry();
                continue;
            }

            String pathname = dir.getAbsolutePath() + File.separator + entry.getName();
            File outputFile = new File(pathname.replaceAll(" ", "_"));

            outputFile.getParentFile().mkdirs();
            outputFile.createNewFile();

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

    public static List<String> getFilenamesFromMultipartFiles(MultipartFile[] files)
            throws IOException, ArchiveException {

        List<String> results = new ArrayList<>();

        for (MultipartFile file : files) {

            File tempDir = new File("temp");
            tempDir.mkdir();

            File tempFile = new File(tempDir, file.getOriginalFilename().replaceAll(" ", "_"));
            tempFile.deleteOnExit();

            FileOutputStream os = new FileOutputStream(tempFile);
            IOUtils.copy(file.getInputStream(), os);
            os.close();

            if (file.getOriginalFilename().toLowerCase().endsWith(".stl") ||
                    file.getOriginalFilename().toLowerCase().endsWith(".gcode")) {

                results.add(tempFile.getAbsolutePath());

            } else if (file.getOriginalFilename().toLowerCase().endsWith(".zip")) {

                List<File> uncompressedFiles = decompress(tempFile);
                results.addAll(findSTLsOrGCodes(uncompressedFiles));

            } else {
                throw new IOException("Invalid file format " + file.getOriginalFilename());
            }
        }

        System.out.println(results.size() + " files to be analyzed");

        return results;
    }

    private static List<String> findSTLsOrGCodes(List<File> files) {
        List<String> results = new ArrayList<>();
        for (File file : files) {
            if (file.isDirectory()) {
                results.addAll(findSTLsOrGCodes(Arrays.asList(file.listFiles())));
            } else if (file.getName().toLowerCase().endsWith(".stl") ||
                    file.getName().toLowerCase().endsWith(".gcode")) {
                results.add(file.getAbsolutePath());
            }
        }
        return results;
    }

}
