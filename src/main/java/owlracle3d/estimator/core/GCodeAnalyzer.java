package owlracle3d.estimator.core;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class GCodeAnalyzer {

  public Estimative estimate(String filename) throws FileNotFoundException {
    System.out.println("Analyzing " + filename);

    File source = new File(filename);
    source.deleteOnExit();
    Scanner scanner = new Scanner(source);

    Estimative estimative = new Estimative();
    estimative.name = source.getName();

    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();

      if (line.startsWith("; filament used") && line.contains("cm3")) {
        String[] values = splitValues(line);
        String[] dimensions = values[1].split("\\(");
        estimative.length = Double.parseDouble(dimensions[0].replace("mm", ""));
        estimative.volume = Double.parseDouble(dimensions[1].replace("cm3", "").replace(")", ""));
      }

      if (line.startsWith("; filament used") && line.endsWith("g")) {
        estimative.weight = Double.parseDouble(splitValues(line)[1].replace("g", ""));
      }

      if (line.startsWith("; total filament cost")) {
        estimative.cost = Double.parseDouble(splitValues(line)[1]);
      }

    }

    scanner.close();

    System.out.println(estimative);
    return estimative;
  }

  private String[] splitValues(String line) {
    return line.replaceAll("[; \\)]", "").split("=");
  }

}
