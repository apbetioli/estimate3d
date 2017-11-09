package owlracle3d.estimator.core;

import com.fasterxml.jackson.core.PrettyPrinter;
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

    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      if (line.startsWith("; filament used")) {
        line = line.replaceAll("[; \\)]", "");
        String[] values = line.split("=");
        String[] dimensions = values[1].split("\\(");
        estimative.length = dimensions[0];
        estimative.volume = dimensions[1].replace(")", "");
        break;
      }
    }

    if(scanner.hasNextLine()) {
      String line = scanner.nextLine();
      if (line.startsWith("; filament used")) {
        line = line.replaceAll("[; \\)]", "");
        String[] values = line.split("=");
        estimative.weight = values[1];

        line = line.replaceAll("[; \\)]", "");
        values = line.split("=");
        estimative.cost = values[1];
      } else {
        line = line.replaceAll("[; \\)]", "");
        String[] values = line.split("=");
        estimative.cost = values[1];
      }
    }

    scanner.close();

    System.out.println(estimative);
    return estimative;
  }

}
