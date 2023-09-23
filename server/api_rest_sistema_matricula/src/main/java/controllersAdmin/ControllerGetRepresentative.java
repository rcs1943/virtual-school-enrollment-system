package controllersAdmin;

import dto.student.RepresentativeDTO;
import entity.StudentEntity;
import entity.admin.GetStudentRegisterEntity;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;

@WebServlet(name = "ControllerGetRepresentative", urlPatterns = {"/api/student/representative"})
public class ControllerGetRepresentative extends HttpServlet {
    
protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            
    final String codeStudent = request.getParameter("codeStudent");
    if (codeStudent == null){
        HelperController.templatePrintable(
                FormatResponse.getErrorResponse("Parameter not sent.", 400) ,
                response);
        return;
    }
    final GetStudentRegisterEntity getStudentRegisterEntity = new GetStudentRegisterEntity();
    final StudentEntity entityStudent = new StudentEntity();
        
    // Validación del codigo de estudiante
    final Integer intcodeStudent = entityStudent.isValidCodeStudent(codeStudent);
    if (intcodeStudent == null) {
        HelperController.templatePrintable(
                FormatResponse.getErrorResponse("Parameter codeStudent is not number.", 400) ,
                response);
        return;
    }
    final RepresentativeDTO representative = getStudentRegisterEntity.getRepresentative(intcodeStudent);
    HelperController.templatePrintable(representative == null?
            FormatResponse.getErrorResponse("Not found", 400):
            FormatResponse.getSuccessResponse(representative),
            response);
    }
}
