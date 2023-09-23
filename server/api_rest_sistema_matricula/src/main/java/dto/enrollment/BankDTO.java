
package dto.enrollment;

public class BankDTO {
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private String name;
    //</editor-fold>

    public BankDTO() {
        this.code = null;
        this.name = null;
    }

    public BankDTO(Integer code, String name) {
        this.code = code;
        this.name = name;
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
    //</editor-fold>

}
