
package dto.student;

public class HistoryDetailStudentDTO {
    private Integer code;
    private Double repeat;
    private StudentDTO student;

    public HistoryDetailStudentDTO() {
        this.code = null;
        this.repeat = null;
        this.student = null;
    }

    public HistoryDetailStudentDTO(Integer code, Double repeat, StudentDTO student) {
        this.code = code;
        this.repeat = repeat;
        this.student = student;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Double getRepeat() {
        return repeat;
    }

    public void setRepeat(Double repeat) {
        this.repeat = repeat;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }
    
    
    
}
