package controllersStudent;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;
import utils.email.CredentialsEmailSender;
import utils.email.EmailSender;

@WebServlet(name = "ControllerSections", urlPatterns = {"/api/student/sections"})
public class ControllerSections extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HelperController.templatePrintable(
                FormatResponse.getSuccessResponse(new EmailSender().send("sotomaycol03@gmail.com", "HOLA", "ADIOS")), response);
    }
}
