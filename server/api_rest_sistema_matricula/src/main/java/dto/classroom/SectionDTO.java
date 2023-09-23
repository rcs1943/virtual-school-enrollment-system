package dto.classroom;

public class SectionDTO {
    
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code;
    private String letter;
    private ShiftDTO shift;
    //</editor-fold>

    public SectionDTO() {
        code = null;
        letter = null;
        shift = null;
    }
    
    public SectionDTO(Integer code, String letter, ShiftDTO shift) {
        this.code = code;
        this.letter = letter;
        this.shift = shift;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">    
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    public ShiftDTO getShift() {
        return shift;
    }

    public void setShift(ShiftDTO shift) {
        this.shift = shift;
    }
    //</editor-fold>
}