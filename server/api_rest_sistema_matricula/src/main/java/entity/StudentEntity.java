package entity;

import com.google.gson.JsonElement;
import dto.classroom.ClassroomDTO;
import dto.classroom.CourseDTO;
import dto.classroom.CourseTeacherDTO;
import dto.classroom.GradeDTO;
import dto.classroom.SectionDTO;
import dto.classroom.ShiftDTO;
import dto.classroom.TeacherDTO;
import dto.enrollment.EnrollmentDTO;
import dto.enrollment.PaymentDTO;
import dto.student.StudentDTO;
import dto.student.AccountDTO;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import model.AdminModel;
import model.StudentModel;
import utils.Encrypt;
import utils.validation.Validation;
import utils.authentication.JWTAuthentication;
import utils.authentication.RoleAuthJWT;
import utils.enums.ResponseEnrollment;
import utils.validation.RegexPatternsValidation;

public class StudentEntity {
    
    //<editor-fold defaultstate="collapsed" desc="Action Methods">
    public String verifyAccount(final AccountDTO accountToLogin, final JWTAuthentication jwtAuth) {
        final String dni = accountToLogin.getStudent().getDni();
        final String password = accountToLogin.getPassword();
        final ArrayList<HashMap<String,String>> table = new StudentModel().verifyAccount(dni);
        final String hashedPassword = table.get(0).get("RES");
        final boolean notExistsAccount = "NOT_FOUND".equals(hashedPassword);
        if (notExistsAccount) 
            return null;
        final boolean matched = Encrypt.matchWithHashedValue(password, hashedPassword);
        System.out.println(matched);
        if (!matched)
            return null;
        return jwtAuth.getToken(dni, RoleAuthJWT.STUDENT_ROLE);
    }
    public EnrollmentDTO getDetailEnrollment(final Integer codigoStudent){
        final ArrayList<HashMap<String,String>> table = new StudentModel().getDetailEnrollment(codigoStudent);
        return table.size() > 0 ? getDTOforDetailEnrollment(table.get(0)) : null;
    }
    
    public StudentDTO getDetailStudent(final StudentDTO student){
        final String dni = student.getDni();
        final ArrayList<HashMap<String,String>> table = new StudentModel().getDetailStudent(dni);
        return table.size() > 0 ? getDTOforRowHashMap(table.get(0)) : null;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Enrollment validation">
    public boolean hasPaid(final StudentDTO student){
        try {
            int codigo = student.getCode();
            final ArrayList<HashMap<String,String>> table = new StudentModel().verifyPay(codigo);
            final String verifyPay = table.get(0).get("RES");
            return Integer.parseInt(verifyPay) == 1;
        } catch (Exception e) {
            return false;
        }
    }
    public boolean verifyGradeEnroll(final StudentDTO student){
        try {
            int codigo = student.getCode();
            final ArrayList<HashMap<String,String>> table = new StudentModel().verifyGradeToEnroll(codigo);
            final String verifyGrade = table.get(0).get("RES");
            return Integer.parseInt(verifyGrade) == 1;
        } catch (Exception e) {
            return false;
        }
    }
    public boolean verifyEnroll(final StudentDTO student){
        try {
            int codigo = student.getCode();
            final ArrayList<HashMap<String,String>> table = new StudentModel().verifyEnroll(codigo);
            final String verifyEnroll = table.get(0).get("RES");
            return Integer.parseInt(verifyEnroll) == 1;
        } catch (Exception e) {
            return false;
        }
    }
    public boolean canEnrolled (final StudentDTO student){
        final boolean paid = hasPaid(student);
        final boolean verifiedEnroll = verifyEnroll(student);
        return paid && verifiedEnroll;
    }
    
    public ResponseEnrollment canEnroll(final StudentDTO student){
        if (!verifyGradeEnroll(student)) 
            return ResponseEnrollment.COMPLETED_STUDIES;
        if (!verifyEnroll(student)) 
            return ResponseEnrollment.ENROLLED;
        if (!hasPaid(student)) 
            return ResponseEnrollment.NO_PAID;
        return ResponseEnrollment.CAN_ENROLL ;
    }
    //</editor-fold>
    
    //Get grade to entollment
    public GradeDTO getGradeToEnrollment(final Integer codeStudent){
        final ArrayList<HashMap<String,String>> table = new StudentModel().gradeToEnrollment(codeStudent);
        return table.size() > 0 ? getgradeDTOforRowHashMap(table.get(0)) : null;
    }
    
    // Boolean para validar si se puede hacer la matricula
    public Boolean doEnrollment(
        final Integer codeStudent,
        final Integer codeGrade,
        final Integer codeSection){
        try {
            final ArrayList<HashMap<String,String>> table = new StudentModel().
                doEnrollment(codeStudent, codeGrade, codeSection);
            String valueEnroll = table.size() > 0 ? table.get(0).get("RES"): null;
            return  "SUCCESSFULLY".equals(valueEnroll);
        } catch (Exception e) {
            return false;
        }     
    }
    //</editor-fold>
    
    public boolean isValidAccount(final AccountDTO accountToLogin) {
        return Validation.isValidDNI(accountToLogin.getStudent().getDni()) 
                && Validation.isValidPassword(accountToLogin.getPassword());
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Helper Methods">
    private GradeDTO getgradeDTOforRowHashMap(HashMap<String, String> row) {
        final GradeDTO grade = new GradeDTO();
        grade.setCode(Integer.parseInt(row.get("code_grade")));
        grade.setName(row.get("name_grade"));
        return grade;
    }
    
    private StudentDTO getDTOforRowHashMap(HashMap<String, String> row) {
        final StudentDTO student = new StudentDTO();
        student.setCode(Integer.parseInt(row.get("code_student")));
        student.setName(row.get("_name"));
        student.setFatherSurname(row.get("father_surname"));
        student.setMotherSurname(row.get("mother_surname"));
        return student;
    }
    
     private EnrollmentDTO getDTOforDetailEnrollment(HashMap<String, String> row){
        final EnrollmentDTO enrollment = new EnrollmentDTO();

        final StudentDTO student = new StudentDTO();
        student.setName(row.get("_name"));
        student.setFatherSurname(row.get("father_surname"));
        student.setMotherSurname(row.get("mother_surname"));
        student.setDni(row.get("dni"));
        final PaymentDTO payment= new PaymentDTO();
        payment.setCode(Integer.parseInt(row.get("code_payment")));
        final ClassroomDTO classroom = new ClassroomDTO();
        final GradeDTO grade = new GradeDTO();
        grade.setName(row.get("name_grade"));
        final ShiftDTO shift = new ShiftDTO();
        shift.setCategory(row.get("category"));
        final SectionDTO section = new SectionDTO();
        section.setLetter(row.get("letter"));
        section.setShift(shift);
        classroom.setGrade(grade);
        classroom.setSection(section);
        payment.setStudent(student);
        enrollment.setPayment(payment); //name-apellidos- apelidos -dni-codigo de pago
        enrollment.setCode(Integer.parseInt(row.get("code_enrollment")));//codigo de matricula
        String str=row.get("date_enrollment");  
        Date date=Date.valueOf(str);
        enrollment.setDate(date.getTime());
        enrollment.setClassroom(classroom); //grado-letra-seccion
        return enrollment;
    }
    //</editor-fold>
     
    //<editor-fold defaultstate="collapsed" desc="Get Teacher Classroom">
    public CourseTeacherDTO[] getTeacherClassroom(final Integer codeStudent){
        final ArrayList<HashMap<String,String>> table = new AdminModel().getTeacherClassroom(codeStudent);
        return table.size() > 0 ? toArrayTeacherClassroomDTOs(table) : null;
    }
    
    private CourseTeacherDTO[] toArrayTeacherClassroomDTOs(ArrayList<HashMap<String, String>> table) {
        final Object[] objArray = EntityHelper.hashMapArrayListToObjArray(
                table, 
                (HashMap<String, String> row) -> getTeacherClassroomDTOforRowHashMap(row)
        );
        return Arrays.copyOf(objArray, objArray.length, CourseTeacherDTO[].class);
    }
        
    private CourseTeacherDTO getTeacherClassroomDTOforRowHashMap(HashMap<String, String> row) {
        final CourseTeacherDTO courseTeacher = new CourseTeacherDTO();
        final CourseDTO course = new CourseDTO();
            course.setName(row.get("name_course"));
        courseTeacher.setCourse(course);
        final TeacherDTO teacher = new TeacherDTO();
            teacher.setName(row.get("_name"));
            teacher.setFatherSurname(row.get("father_surname"));
            teacher.setMotherSurname(row.get("mother_surname"));
        courseTeacher.setTeacher(teacher);
        return courseTeacher;
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Get Teacher">
    public TeacherDTO getTeacher(final Integer codeStudent){
        final ArrayList<HashMap<String,String>> table = new AdminModel().getTeacher(codeStudent);
        return table.size() > 0 ? getTeacherDTOforRowHashMap(table.get(0)) : null;
    }
    private TeacherDTO getTeacherDTOforRowHashMap(HashMap<String, String> row) {
        final TeacherDTO teacher = new TeacherDTO();
        teacher.setName(row.get("_name"));
        teacher.setFatherSurname(row.get("father_surname"));
        teacher.setMotherSurname(row.get("mother_surname"));
        return teacher;
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="General Validation">
    public Integer isValidCodeStudent(String codeStudent) {
	return Validation.isValidCode(codeStudent, null);
    }
    public Integer isValidCodeGrade(String codeGrade) {
        return Validation.isValidCode(codeGrade, 6);
    }
    public Integer isValidCodeSection(String codeSection) {
        return Validation.isValidCode(codeSection, null);
    }
    public boolean isGradeValid(final GradeDTO newGrade){
        int grade = newGrade.getCode();
        return grade < 6;
    }
    public String isValidDNI(final String dni) {
        try {
            if (Validation.regexIsMatched(RegexPatternsValidation.DNI, dni)) {
                return dni;
            }
            return null ;
        } catch (Exception e) {
            return null;
        }
    }
    public Date isValidDate(final String dateStr) {
        try {
            final Long dateLong = Long.parseLong(dateStr);
            final Date date = new Date(dateLong);
            return date ;
        } catch (Exception e) {
            return null;
        }
    }
    public Boolean isValidBoolean(final String booleanStr) {
        try {
            return("1".equals(booleanStr));
        } catch (Exception e) {
            return null;
        }
    }
    public String isvalidString (final JsonElement str){
        try {
            return str.toString();
        } catch (Exception e) {
            return null;
        }
    }
    //</editor-fold>
}