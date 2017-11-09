package owlracle3d.estimator.core;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.multipart.MultipartFile;

public class Files {

  public static List<File> decompress(File zipFile) throws ArchiveException, IOException {

    List<File> archiveContents = new ArrayList<>();

    final InputStream is = new FileInputStream(zipFile);
    ArchiveInputStream ais = new ArchiveStreamFactory()
        .createArchiveInputStream(ArchiveStreamFactory.ZIP, is);

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

  public static List<String> getFilenamesFromMultipartFile(MultipartFile file)
      throws IOException, ArchiveException {

    File tempDir = new File("temp");
    tempDir.mkdir();

    File tempFile = new File(tempDir, file.getOriginalFilename());
    tempFile.deleteOnExit();

    FileOutputStream os = new FileOutputStream(tempFile);
    IOUtils.copy(file.getInputStream(), os);
    os.close();

    if (file.getOriginalFilename().endsWith(".stl")) {
      return Arrays.asList(tempFile.getAbsolutePath());

    } else if (file.getOriginalFilename().endsWith(".zip")) {

      List<String> results = decompress(tempFile)
          .stream()
          .map(file1 -> file1.getAbsolutePath())
          .collect(Collectors.toList());

      return results;
    } else {
      throw new IOException("Invalid file format " + file.getOriginalFilename());
    }

  }

}
