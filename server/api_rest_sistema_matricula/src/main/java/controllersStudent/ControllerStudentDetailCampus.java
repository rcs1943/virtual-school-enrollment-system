package controllersStudent;

import dto.student.StudentDTO;
import entity.ClassroomEntity;
import entity.StudentEntity;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;
import utils.validation.Validation;

@WebServlet(name = "ControllerStudentDetailCampus", urlPatterns = {"/api/student/detail-campus"})
public class ControllerStudentDetailCampus extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final String dni = request.getParameter("dni");
        if (dni == null) {
            HelperController.templatePrintable(
                    FormatResponse.getErrorResponse("DNI not sent.", 400),
                    response);
            return;
        }
        final StudentEntity studentEntity = new StudentEntity();
        if (!Validation.isValidDNI(dni)) {
            HelperController.templatePrintable(
                    FormatResponse.getErrorResponse("DNI not valid.", 400),
                    response);
            return;
        }
        final StudentDTO student = new StudentDTO();
        student.setDni(dni);
        final StudentDTO detailsStudent = studentEntity.getDetailStudent(student);
        HelperController.templatePrintable(
                detailsStudent == null
                ? FormatResponse.getErrorResponse("Student not found.", 400)
                : FormatResponse.getSuccessResponse(detailsStudent), response);
    }
}
