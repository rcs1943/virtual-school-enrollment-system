package utils.email;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailSender {
    
    public boolean send(
            final String destinatary, 
            final String subject, 
            final String message) {
        final Session session = Session.getDefaultInstance(getProperties());
        // session.setDebug(true);
        final MimeMessage messageObj = new MimeMessage(session);
        try {
            messageObj.setFrom(
                    new InternetAddress(
                            CredentialsEmailSender.EMAIL_USER));
            final Message.RecipientType recipient = Message.RecipientType.TO;
            messageObj.addRecipient(recipient, new InternetAddress(destinatary));
            messageObj.setSubject(subject);
            messageObj.setContent(message, "text/html");
            
            final Transport transport = session.getTransport("smtp");
            transport.connect(
                    CredentialsEmailSender.EMAIL_USER, 
                    CredentialsEmailSender.EMAIL_PASSWORD);
            transport.sendMessage(
                    messageObj, 
                    messageObj.getRecipients(recipient));
            transport.close();
            return true;
        }
        catch (Exception ex) {
            return false;
        }        
    }
    private Properties getProperties() {
        final Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", 587);
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
        properties.put("mail.smtp.starttls.enable", true);
        return properties;
    }
}
