package controllersStudent;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import dto.student.StudentDTO;
import entity.StudentEntity;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;

@WebServlet(name = "ControllerStudentCanEnroll", urlPatterns = {"/api/student/can-enroll"})
public class ControllerStudentCanEnroll extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final JsonObject body = HelperController.getRequestBody(request);
        final FormatResponse formatResponse = canEnroll(body);
        HelperController.templatePrintable(formatResponse, response);
    }
    
    private FormatResponse canEnroll(final JsonObject body) {
        //Validacion del body
        if (body == null)
            return FormatResponse.getErrorResponse("The request body doesn't have json format.", 400);
        final JsonElement codeStudent = body.get("codeStudent");
        if (codeStudent == null) 
            return FormatResponse.getErrorResponse("Mising parameters.", 400);
        
        // Validación del codigo de estudiante
        final StudentEntity entityStudent = new StudentEntity();
                
        final Integer codeStudentParsed = entityStudent.isValidCodeStudent(codeStudent.toString());
        if (codeStudentParsed == null){
            return FormatResponse.getErrorResponse("The code student is not valid.", 400);
        }
        
        // Estructura de la respuesta 
        final StudentDTO student = new StudentDTO();
        student.setCode(codeStudent.getAsInt());
        final JsonObject data = new JsonObject();
        final String reason = entityStudent.canEnroll(student).toString();
        data.addProperty("stateEnroll", reason);

        return FormatResponse.getSuccessResponse(data);
    }
}