
package dto.classroom;

public class CourseTeacherDTO {

    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private TeacherDTO teacher;
    private CourseDTO course;
    //</editor-fold>

    public CourseTeacherDTO() {
    }

    public CourseTeacherDTO(Integer code, TeacherDTO teacher, CourseDTO course) {
        this.code = code;
        this.teacher = teacher;
        this.course = course;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public TeacherDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }
    
    //</editor-fold>
    
    
}
