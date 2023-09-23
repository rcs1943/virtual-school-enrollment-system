
package dto.enrollment;
import dto.student.StudentDTO;

public class PaymentDTO {
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private String date;
    private Double amountPayment;
    private BankDTO bank;
    private StudentDTO student;
    //</editor-fold>

    public PaymentDTO() {
        this.amountPayment = null;
        this.code = null;
        this.bank = null;
        this.student = null;
        this.date = null;
    }

    public PaymentDTO(Integer code, String date, Double amountPayment, BankDTO bank, StudentDTO student) {
        this.code = code;
        this.date = date;
        this.amountPayment = amountPayment;
        this.bank = bank;
        this.student = student;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getAmountPayment() {
        return amountPayment;
    }

    public void setAmountPayment(Double amountPayment) {
        this.amountPayment = amountPayment;
    }

    public BankDTO getBank() {
        return bank;
    }

    public void setBank(BankDTO bank) {
        this.bank = bank;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }
    //</editor-fold>
    
}
