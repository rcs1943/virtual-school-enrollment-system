package dto.student;

public class AccountDTO {
    
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private StudentDTO student;
    private String password;
    //</editor-fold>  

    public AccountDTO(){
        this.code = null;
        this.student = null;
        this.password = null;
    }

    public AccountDTO(Integer code, StudentDTO student, String password) {
        this.code = code;
        this.student = student;
        this.password = password;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Properties">
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //</editor-fold>  
    
}
