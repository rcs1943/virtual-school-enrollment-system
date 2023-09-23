
package dto.enrollment;

public class TypeSchoolDTO {
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private String type;
    //</editor-fold>

    public TypeSchoolDTO() {
        this.code = null;
        this.type = null;
    }

    public TypeSchoolDTO(Integer code, String type) {
        this.code = code;
        this.type = type;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    //</editor-fold>
    
}
