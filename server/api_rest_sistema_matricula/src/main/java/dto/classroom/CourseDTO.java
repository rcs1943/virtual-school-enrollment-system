
package dto.classroom;

public class CourseDTO {
    
     //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private String name;
    private GradeDTO grade;    
    //</editor-fold>

    public CourseDTO() {
        code = null;
        name = null;
        grade = null;
    }

    public CourseDTO(Integer code, String name, GradeDTO grade) {
        this.code = code;
        this.name = name;
        this.grade = grade;
    }
    
     //<editor-fold defaultstate="collapsed" desc="Getters y setters">

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GradeDTO getGrade() {
        return grade;
    }

    public void setGrade(GradeDTO grade) {
        this.grade = grade;
    }
     //</editor-fold>
    
}
