package controllersAdmin;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.student.StudentDTO;
import entity.admin.GetStudentRegisterEntity;
import entity.admin.InsertForRegisterEntity;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;

@WebServlet(name = "ControllerInsertStudent", urlPatterns = {"/api/student/register"})
public class ControllerStudentRegister extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final FormatResponse formatResponse = getRegisterStudents(request);
        HelperController.templatePrintable(formatResponse, response);
    }   
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final JsonObject body = HelperController.getRequestBody(request);
        final FormatResponse formatResponse = insertStudent(body);
        HelperController.templatePrintable(formatResponse, response);
    }   
    
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException { 
        final JsonObject body = HelperController.getRequestBody(request);
        final FormatResponse formatResponse = updateStudent(body);
        HelperController.templatePrintable(formatResponse, response);
    }
    
    private FormatResponse getRegisterStudents(final HttpServletRequest request) {
        final String limitTop = request.getParameter("limitTop"),
                seeSize = request.getParameter("seeSize");
    
        boolean seeSizeValue = Boolean.parseBoolean(seeSize);
        if (limitTop == null)
            return FormatResponse.getErrorResponse("Parameter not sent.", 400);
        final GetStudentRegisterEntity getStudentRegisterEntity = new GetStudentRegisterEntity();
        final Integer parsedLimitTop = getStudentRegisterEntity.isNumberGreaterThanZero(limitTop);
        if (parsedLimitTop == null) 
            return FormatResponse.getErrorResponse("Parameter limitTop is not number valid.", 400);
        final int amount = 3;
        final int newLimitTop = parsedLimitTop-1;

        final StudentDTO[] students = getStudentRegisterEntity.getStudentRegister(newLimitTop,amount);
        if (students == null) 
                return FormatResponse.getErrorResponse("Not found.", 400);
        final JsonObject data = new JsonObject();
        if (seeSizeValue) {
            final Integer totalSize = getStudentRegisterEntity.getTotalSize();
            if (totalSize == null) {
                return FormatResponse.getErrorResponse("Unexpected error.", 400);
            }
            data.addProperty("totalSize", totalSize);
        }
        data.add("students", HelperController.toJsonElement(students, new Gson()) ) ;
            return FormatResponse.getSuccessResponse(data);
    }
    
    private FormatResponse insertStudent(final JsonObject body) {
        if (body == null) 
                return FormatResponse.getErrorResponse("The request body doesn't have json format.", 400);
        final StudentDTO student = new StudentDTO();
        final InsertForRegisterEntity insertForRegisterEntity = new InsertForRegisterEntity();
        final String msgError = insertForRegisterEntity.validateStudentForRegister(body, student);
        if (msgError != null) 
            return FormatResponse.getErrorResponse(msgError, 400);
        final String responseInsertStudent = insertForRegisterEntity.insertStudent(student);
        
        final JsonObject data = new JsonObject();
        data.addProperty("stateInsert", responseInsertStudent);
        return FormatResponse.getSuccessResponse(data);
    }

    private FormatResponse updateStudent(final JsonObject body) {
        if (body == null) 
                return FormatResponse.getErrorResponse("The request body doesn't have json format.", 400);
        
        final StudentDTO student = new StudentDTO();
        final InsertForRegisterEntity insertForRegisterEntity = new InsertForRegisterEntity();
        final String msgError = insertForRegisterEntity.validateStudentForUpdate(body, student);
        if (msgError != null) 
            return FormatResponse.getErrorResponse(msgError, 400);
        final Boolean responseUpdateStudent = insertForRegisterEntity.updateStudent(student);
        if (!responseUpdateStudent) 
            return FormatResponse.getErrorResponse("There is a student with the same DNI. ", 400);
        return FormatResponse.getSuccessResponse(responseUpdateStudent);   
    }
}