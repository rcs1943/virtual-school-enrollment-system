package controllersAdmin;

import com.google.gson.JsonObject;
import dto.student.ActivationAccountStudentDTO;
import dto.student.RepresentativeDTO;
import entity.admin.InsertForRegisterEntity;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;
import utils.RandomString;
import utils.email.EmailSender;
import utils.email.EmailTemplate;

@WebServlet(name = "ControllerDoAccountStudent", urlPatterns = {"/api/student/generate-account"})
public class ControllerDoAccountStudent extends HttpServlet {

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final JsonObject body = HelperController.getRequestBody(request);
        final FormatResponse formatResponse = doAccountStudent(body);
        HelperController.templatePrintable(formatResponse, response);
    }  
    
    private FormatResponse doAccountStudent(final JsonObject body) {
        //Validación del body
        if (body == null) 
                return FormatResponse.getErrorResponse("The request body doesn't have json format.", 400);
        
        final InsertForRegisterEntity insertForRegisterEntity = new InsertForRegisterEntity();
        final ActivationAccountStudentDTO activationAccountStudent = new ActivationAccountStudentDTO();
        
        //Validación de parametros
        final String msgError = insertForRegisterEntity.validateStudentForDoAccountStudent(body, activationAccountStudent);
        if (msgError != null) 
            return FormatResponse.getErrorResponse(msgError, 400);
        
        final RandomString generateToken = new RandomString();
        //Validación de activacion
        activationAccountStudent.setPlainPassword(generateToken.generate(9));
        activationAccountStudent.setToken(generateToken.generate(25));
        
        final Boolean responseDoAccount = insertForRegisterEntity.doAccountStudent(
                activationAccountStudent);
        if (!responseDoAccount) 
            return FormatResponse.getErrorResponse("The code student does not exist", 400);
        
        
        //Obtención de correo del apoderado 
        final RepresentativeDTO representative = insertForRegisterEntity.getEmailRepresentative(activationAccountStudent);
        //Envio de Token al Representante
        final String content = EmailTemplate.getDoAccount(activationAccountStudent.getToken()) ;
        final boolean emailSender =new EmailSender().send(representative.getEmail(), "Activar Cuenta", content);
        if (!emailSender)
            return FormatResponse.getErrorResponse("Error sending mail. ", 400);
        
        return FormatResponse.getSuccessResponse(responseDoAccount);
    }
}