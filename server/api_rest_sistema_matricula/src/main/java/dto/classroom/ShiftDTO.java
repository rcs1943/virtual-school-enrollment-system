package dto.classroom;

public class ShiftDTO {
    
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private String category;
    //</editor-fold>

    public ShiftDTO() {
        code = null;
        category = null;
    }

    public ShiftDTO(Integer code, String category) {
        this.code = code;
        this.category = category;
    }

    //<editor-fold defaultstate="collapsed" desc="Getters y setters">
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    //</editor-fold>
    
}
