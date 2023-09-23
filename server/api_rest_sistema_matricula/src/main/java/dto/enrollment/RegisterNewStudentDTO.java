
package dto.enrollment;

public class RegisterNewStudentDTO {
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private PaymentDTO payment;
    //</editor-fold>

    public RegisterNewStudentDTO() {
        this.code = null;
        this.payment = null;
    }

    public RegisterNewStudentDTO(Integer code, PaymentDTO payment) {
        this.code = code;
        this.payment = payment;
    }
    
    
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public PaymentDTO getPayment() {
        return payment;
    }

    public void setPayment(PaymentDTO payment) {
        this.payment = payment;
    }
    //</editor-fold>
    
}
