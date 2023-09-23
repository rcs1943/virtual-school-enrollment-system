package controllersStudent;

import dto.classroom.ClassroomVacancyDTO;
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


@WebServlet(name = "ControllerDetailClassroom", urlPatterns = {"/api/student/detail-classroom"})
public class ControllerGetDetailClassroom extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            
        final String codeGrade = request.getParameter("codeGrade");
        if (codeGrade == null){
            HelperController.templatePrintable(
                    FormatResponse.getErrorResponse("Code grade not sent.", 400) ,
                    response);
            return;
        }
        final ClassroomEntity classroomEntity = new ClassroomEntity();
        final StudentEntity studentEntity = new StudentEntity();
        
        final Integer codeGradeParsed = studentEntity.isValidCodeGrade(codeGrade);
        if (codeGradeParsed==null) {
            HelperController.templatePrintable(
                        FormatResponse.getErrorResponse("Code grade is not valid.", 400) ,
                        response);
            return;
        }
        final ClassroomVacancyDTO[] classroomVacancy = classroomEntity.getDetailClassroom(codeGradeParsed);
        HelperController.templatePrintable(
                classroomVacancy == null?
                FormatResponse.getErrorResponse("Code grade is not found.", 400):
                FormatResponse.getSuccessResponse(classroomVacancy),
                response);
    }
}
