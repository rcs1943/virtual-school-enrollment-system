package dto.admin;

public class AdminAccountDTO {
    private String user, password;

    public AdminAccountDTO() {
    }
    
    public AdminAccountDTO(String user, String password) {
        this.user = user;
        this.password = password;
    }
    //<editor-fold defaultstate="collapsed" desc="Getters y setters">
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //</editor-fold>
}