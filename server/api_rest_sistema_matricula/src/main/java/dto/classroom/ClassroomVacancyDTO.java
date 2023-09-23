
package dto.classroom;

public class ClassroomVacancyDTO {
    
    //<editor-fold defaultstate="collapsed" desc="Properties">
    private Integer code, quantity;
    private ClassroomDTO classroom;
    //</editor-fold>

    public ClassroomVacancyDTO() {
        code = null;
        quantity = null;
        classroom = null;
    }

    public ClassroomVacancyDTO(Integer code, Integer quantity, ClassroomDTO classroom) {
        this.code = code;
        this.quantity = quantity;
        this.classroom = classroom;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ClassroomDTO getClassroom() {
        return classroom;
    }

    public void setClassroom(ClassroomDTO classroom) {
        this.classroom = classroom;
    }
    //</editor-fold>

    
}
