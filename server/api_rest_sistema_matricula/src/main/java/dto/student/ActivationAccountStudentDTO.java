
package dto.student;

public class ActivationAccountStudentDTO {
    
    private Integer code;
    private StudentDTO student;
    private String token;
    private String plainPassword;

    public ActivationAccountStudentDTO() {
    }

    public ActivationAccountStudentDTO(Integer code, StudentDTO student, String token, String plainPassword) {
        this.code = code;
        this.student = student;
        this.token = token;
        this.plainPassword = plainPassword;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPlainPassword() {
        return plainPassword;
    }

    public void setPlainPassword(String plainPassword) {
        this.plainPassword = plainPassword;
    }
    
    
}
