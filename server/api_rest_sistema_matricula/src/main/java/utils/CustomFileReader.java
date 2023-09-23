package utils;

import java.io.File;
import java.util.Scanner;

public class CustomFileReader {
    public String read(final String path) {
        try {
            final File file = new File(path);
            Scanner scanner = new Scanner(file);
            String strValue = "";
            while (scanner.hasNextLine()) {
                strValue += scanner.nextLine();
            }
            return strValue;
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }
}
