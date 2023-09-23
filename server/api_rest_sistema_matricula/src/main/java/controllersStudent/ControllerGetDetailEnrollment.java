package controllersStudent;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import dto.classroom.CourseTeacherDTO;
import dto.classroom.TeacherDTO;
import dto.enrollment.EnrollmentDTO;
import entity.StudentEntity;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;

@WebServlet(name = "ControllerGetDetailEnrollment", urlPatterns = {"/api/student/detail-enrollment"})
public class ControllerGetDetailEnrollment extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final JsonObject body = HelperController.getRequestBody(request);
        final FormatResponse formatResponse = getDetailEnrollent(body);
        HelperController.templatePrintable(formatResponse, response);
    }
    
    private FormatResponse getDetailEnrollent(final JsonObject body) {
        //Validacion del body
        if (body == null)
            return FormatResponse.getErrorResponse("The request body doesn't have json format.", 400);
        final JsonElement codeStudent = body.get("codeStudent");
        if (codeStudent == null) 
            return FormatResponse.getErrorResponse("Mising parameters.", 400);

        final StudentEntity entityStudent = new StudentEntity();
        
        // Validación del codigo de estudiante
        final Integer codeStudentParsed = entityStudent.isValidCodeStudent(codeStudent.toString());
        if (codeStudentParsed == null){
            return FormatResponse.getErrorResponse("The code student is not valid.", 400);
        }
        
        //Detalle de Matricula
        final EnrollmentDTO detailEnrollment = entityStudent.getDetailEnrollment(codeStudentParsed);
        //Obetener Tutor
        final TeacherDTO teacher = entityStudent.getTeacher(codeStudentParsed);
        //Obtener profesores por salón
        final CourseTeacherDTO[] classroomTeachers = entityStudent.getTeacherClassroom(codeStudentParsed);
        
        if (!areParametersValid(detailEnrollment, teacher, classroomTeachers)) 
            return FormatResponse.getErrorResponse("The student is not enrolled.", 400);
   
        return FormatResponse.getSuccessResponse(fillResponse(detailEnrollment, teacher, classroomTeachers));
    }
    
    private boolean areParametersValid(
            final EnrollmentDTO detailEnrollment, 
            final TeacherDTO teacher, 
            final CourseTeacherDTO[] classroomTeachers) {
        return  detailEnrollment != null && teacher != null && classroomTeachers != null;
    }
    
    private JsonObject fillResponse (
            final EnrollmentDTO detailEnrollment, 
            final TeacherDTO teacher, 
            final CourseTeacherDTO[] classroomTeachers) {
        final JsonObject data = new JsonObject();
        final Gson gson = new Gson();
        data.add("information", gson.fromJson(gson.toJson(detailEnrollment), JsonElement.class));
        data.add("formTeacher", gson.fromJson(gson.toJson(teacher), JsonElement.class));
        data.add("classroomTeachers", gson.fromJson(gson.toJson(classroomTeachers), JsonElement.class));
        return data;
    }
}
