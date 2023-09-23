package controllersAdmin;

import com.google.gson.JsonObject;
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

@WebServlet(name = "ControllerInsertRepresentative", urlPatterns = {"/api/student/insert-representative"})
public class ControllerInsertRepresentative extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final JsonObject body = HelperController.getRequestBody(request);
        final FormatResponse formatResponse = doEnrollment(body);
        HelperController.templatePrintable(formatResponse, response);
    }   
    private FormatResponse doEnrollment(final JsonObject body) {
        if (body == null) 
                return FormatResponse.getErrorResponse("The request body doesn't have json format.", 400);
        
        final RepresentativeDTO representative = new RepresentativeDTO();
        final InsertForRegisterEntity insertForRegisterEntity = new InsertForRegisterEntity();
       
        final String msgError = insertForRegisterEntity.validateRepresentativeForRegister(body, representative);
        if (msgError != null) 
            return FormatResponse.getErrorResponse(msgError, 400);
        
        final Boolean responseInsertRepresentative = insertForRegisterEntity.insertRepresentative(representative);

        if (!responseInsertRepresentative) {
            final JsonObject data = new JsonObject();
            final boolean representativeExists = true;
            data.addProperty("representativeExists", representativeExists);
            return FormatResponse.getSuccessResponse(data);
        }
        return FormatResponse.getSuccessResponse(responseInsertRepresentative);
        //TRUE => AGREGADO CON EXITO
    }
}
