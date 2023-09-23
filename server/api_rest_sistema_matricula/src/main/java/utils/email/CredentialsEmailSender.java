package utils.email;

import utils.CustomFileReader;

public class CredentialsEmailSender {
    final public static String 
            EMAIL_USER = "email.12345.tester.email@gmail.com", 
            EMAIL_PASSWORD = getEmailPassword();
    final public static String getEmailPassword() {
        return new CustomFileReader().read("C:/emailPassword.txt");
    }
}
