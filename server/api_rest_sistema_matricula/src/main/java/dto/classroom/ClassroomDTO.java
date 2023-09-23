
package dto.classroom;


public class ClassroomDTO {

    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private SectionDTO section;
    private GradeDTO grade;
    private TeacherDTO teacher;
    //</editor-fold>

    public ClassroomDTO() {
    }

    public ClassroomDTO(Integer code, SectionDTO section, GradeDTO grade, TeacherDTO teacher) {
        this.code = code;
        this.section = section;
        this.grade = grade;
        this.teacher = teacher;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public SectionDTO getSection() {
        return section;
    }

    public void setSection(SectionDTO section) {
        this.section = section;
    }

    public GradeDTO getGrade() {
        return grade;
    }

    public void setGrade(GradeDTO grade) {
        this.grade = grade;
    }

    public TeacherDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }
    //</editor-fold>

}
