package entity.admin;

import com.google.gson.JsonObject;
import dto.student.ActivationAccountStudentDTO;
import dto.student.RepresentativeDTO;
import dto.student.StudentDTO;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import model.AdminModel;
import utils.Encrypt;
import static utils.validation.Validation.isNullPropertyOfJson;

public class InsertForRegisterEntity {
    
    public RepresentativeDTO getEmailRepresentative(final ActivationAccountStudentDTO activationAccountStudent){
        final String dni = activationAccountStudent.getStudent().getDni();
        final ArrayList<HashMap<String,String>> table = new AdminModel().getRepresentativeEmail(dni);
        return table.size() > 0 ? getRepresentativeDTOforRowHashMap(table.get(0)) : null;
    }
    public RepresentativeDTO getEmailRepresentativeByCodeStudent(final ActivationAccountStudentDTO activationAccountStudent){
        final int code = activationAccountStudent.getStudent().getCode();
        final ArrayList<HashMap<String,String>> table = new AdminModel().getRepresentative(code);
        return table.size() > 0 ? getRepresentativeDTOforRowHashMap(table.get(0)) : null;
    }
    private RepresentativeDTO getRepresentativeDTOforRowHashMap(HashMap<String, String> row) {
        final RepresentativeDTO representative = new RepresentativeDTO();
            representative.setEmail(row.get("email"));
        return representative;
    }
    
    public boolean insertRepresentative(final RepresentativeDTO representative) {
        try {
            ArrayList<HashMap<String, String>> table = new AdminModel().insertRepresentative(representative);
            return "SUCCESS".equals(table.size() > 0 ? table.get(0).get("RES"): null);
        } catch (Exception e) {
            return false;
        }
    }
    
    public String insertStudent(final StudentDTO student) {
        try {
            ArrayList<HashMap<String, String>> table = new AdminModel().insertStudent(student);
            String response = table.get(0).get("RES");
            return response;
        } catch (Exception e) {
            return null;
        }
    }
    
    public boolean updateStudent(final StudentDTO student) {
        try {
            ArrayList<HashMap<String, String>> table = new AdminModel().updateStudent(student);
            return "SUCCESS".equals(table.size() > 0 ? table.get(0).get("RES"): null);
        } catch (Exception e) {
            return false;
        }
    }
    public boolean doAccountStudent(
            final ActivationAccountStudentDTO activationAccount) {
        try {
            final String encryptedPassword = Encrypt.doEncrypt(activationAccount.getPlainPassword());
            ArrayList<HashMap<String, String>> table = new AdminModel().doAccountStudent(
                    activationAccount, 
                    encryptedPassword);
            
            return "SUCCESS".equals(table.get(0).get("RES"));
        } catch (Exception e) {
            return false;
        }
    }
    
    final public ActivationAccountStudentDTO activeAccountStudent(final String token ) {
            final ArrayList<HashMap<String, String>> table = new AdminModel().activeAccountStudent(token);
            return "ERROR".equals(table.get(0).get("RES")) ? null : getActiveAccountRowHashMap(table.get(0));
    }
    
    private ActivationAccountStudentDTO getActiveAccountRowHashMap(HashMap<String, String> row) {
        final ActivationAccountStudentDTO activationAccount = new ActivationAccountStudentDTO();
            StudentDTO student = new StudentDTO();
            student.setCode(Integer.parseInt(row.get("code_student")));
            activationAccount.setStudent(student);
            activationAccount.setPlainPassword(row.get("plain_password"));
        return activationAccount;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Activation for Do Account Student">
    public String validateStudentForDoAccountStudent(JsonObject jObj, ActivationAccountStudentDTO activationAccountStudent) {
        if (isNullPropertyOfJson(jObj, "dni") ||
                (!isNullPropertyOfJson(jObj, "dni") &&  
                    !isValidPropertyValueString(jObj.get("dni").getAsString(), 8, 8)))
            return validateRepresentativeErrorMsg("dni");
        final StudentDTO student = new StudentDTO();
        student.setDni(jObj.get("dni").getAsString());
        activationAccountStudent.setStudent(student);
        return null;
    }
    //</editor-fold >
    
    //<editor-fold defaultstate="collapsed" desc="Validate Representative for Register">
    public String validateRepresentativeForRegister(JsonObject jObj, RepresentativeDTO representative) {
        try {
            if (isNullPropertyOfJson(jObj, "name") ||
                    (!isNullPropertyOfJson(jObj, "name") &&  
                        !isValidPropertyValueString(jObj.get("name").getAsString(), 1, 50)))
                return validateRepresentativeErrorMsg("name");
            if (isNullPropertyOfJson(jObj, "fatherSurname") ||
                    (!isNullPropertyOfJson(jObj, "fatherSurname") &&  
                        !isValidPropertyValueString(jObj.get("fatherSurname").getAsString(), 1, 100)))
                return validateRepresentativeErrorMsg("fatherSurname");
            if (isNullPropertyOfJson(jObj, "motherSurname") ||
                    (!isNullPropertyOfJson(jObj, "motherSurname") &&  
                        !isValidPropertyValueString(jObj.get("motherSurname").getAsString(), 1, 100)))
                return validateRepresentativeErrorMsg("motherSurname");
            if (isNullPropertyOfJson(jObj, "dni") ||
                    (!isNullPropertyOfJson(jObj, "dni") &&  
                        !isValidPropertyValueString(jObj.get("dni").getAsString(), 8, 8)))
                return validateRepresentativeErrorMsg("dni");
            if (isNullPropertyOfJson(jObj, "email") ||
                    (!isNullPropertyOfJson(jObj, "email") &&  
                        !isValidPropertyValueString(jObj.get("email").getAsString(), 8, 50)))
                return validateRepresentativeErrorMsg("email");
            if (isNullPropertyOfJson(jObj, "phone") ||
                    (!isNullPropertyOfJson(jObj, "phone") &&  
                        !isValidPropertyValueString(jObj.get("phone").getAsString(), 9, 9)))
                return validateRepresentativeErrorMsg("phone");
        }
        catch (NumberFormatException ex) {
            return "Error parsing to number | " + ex.getMessage();
        }
        representative.setName(jObj.get("name").getAsString());
        representative.setFatherSurname(jObj.get("fatherSurname").getAsString());
        representative.setMotherSurname(jObj.get("motherSurname").getAsString());
        representative.setDni(jObj.get("dni").getAsString());
        representative.setEmail(jObj.get("email").getAsString());
        representative.setPhone(jObj.get("phone").getAsString());
        return null;
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Validate Student for Register">
    public String validateStudentForRegister(JsonObject jObj, StudentDTO student) {
        try {
            if (isNullPropertyOfJson(jObj, "name") ||
                    (!isNullPropertyOfJson(jObj, "name") &&  
                        !isValidPropertyValueString(jObj.get("name").getAsString(), 1, 50)))
                return validateRepresentativeErrorMsg("name");
            if (isNullPropertyOfJson(jObj, "fatherSurname") ||
                    (!isNullPropertyOfJson(jObj, "fatherSurname") &&  
                        !isValidPropertyValueString(jObj.get("fatherSurname").getAsString(), 1, 100)))
                return validateRepresentativeErrorMsg("fatherSurname");
            if (isNullPropertyOfJson(jObj, "motherSurname") ||
                    (!isNullPropertyOfJson(jObj, "motherSurname") &&  
                        !isValidPropertyValueString(jObj.get("motherSurname").getAsString(), 1, 100)))
                return validateRepresentativeErrorMsg("motherSurname");
            if (isNullPropertyOfJson(jObj, "dateOfBirth") ||
                    (!isNullPropertyOfJson(jObj, "dateOfBirth") &&  
                        !isValidPropertyValueDate(jObj.get("dateOfBirth").getAsLong())))
                return validateRepresentativeErrorMsg("dateOfBirth");
            if (isNullPropertyOfJson(jObj, "dni") ||
                    (!isNullPropertyOfJson(jObj, "dni") &&  
                        !isValidPropertyValueString(jObj.get("dni").getAsString(), 8, 8)))
                return validateRepresentativeErrorMsg("dni");
            if (isNullPropertyOfJson(jObj, "address") ||
                    (!isNullPropertyOfJson(jObj, "address") &&  
                        !isValidPropertyValueString(jObj.get("address").getAsString(), 8, 250)))
                return validateRepresentativeErrorMsg("address");
            if (isNullPropertyOfJson(jObj, "dniRepresentative") ||
                    (!isNullPropertyOfJson(jObj, "dniRepresentative") &&  
                        !isValidPropertyValueString(jObj.get("dniRepresentative").getAsString(), 8, 8)))
                return validateRepresentativeErrorMsg("dniRepresentative");
        }
        catch (NumberFormatException ex) {
            return "Error parsing to number | " + ex.getMessage();
        }
        student.setName(jObj.get("name").getAsString());
        student.setFatherSurname(jObj.get("fatherSurname").getAsString());
        student.setMotherSurname(jObj.get("motherSurname").getAsString());
        student.setDateBirth(jObj.get("dateOfBirth").getAsLong());
        student.setDni(jObj.get("dni").getAsString());
        student.setAddress(jObj.get("address").getAsString());
        RepresentativeDTO representative = new RepresentativeDTO();
        representative.setDni(jObj.get("dniRepresentative").getAsString());
        student.setRepresentative(representative);
        return null;
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Validate Student for Update">
    public String validateStudentForUpdate(JsonObject jObj, StudentDTO student) {
        int quantityNullValues = 0;
        try {
            if (isNullPropertyOfJson(jObj, "codeStudent")||
                    (!isNullPropertyOfJson(jObj, "codeStudent") 
                    && jObj.get("codeStudent").getAsInt() <1))
                return validateRepresentativeErrorMsg("codeStudent");
            if (!isNullPropertyOfJson(jObj, "dni") && 
                    !isValidPropertyValueString(jObj.get("dni").getAsString(), 8, 8))
                return validateRepresentativeErrorMsg("dni");
            quantityNullValues = incrementQuantityNullValues("dni", jObj, quantityNullValues);
            if (!isNullPropertyOfJson(jObj, "name") && 
                    !isValidPropertyValueString(jObj.get("name").getAsString(), 1, 50))
                return validateRepresentativeErrorMsg("name");
            quantityNullValues = incrementQuantityNullValues("name", jObj, quantityNullValues);
            if (!isNullPropertyOfJson(jObj, "fatherSurname") && 
                    !isValidPropertyValueString(jObj.get("fatherSurname").getAsString(), 1, 50))
                return validateRepresentativeErrorMsg("fatherSurname");
            quantityNullValues = incrementQuantityNullValues("fatherSurname", jObj, quantityNullValues);
            if (!isNullPropertyOfJson(jObj, "motherSurname") && 
                    !isValidPropertyValueString(jObj.get("motherSurname").getAsString(), 1, 50))
                return validateRepresentativeErrorMsg("motherSurname");
            quantityNullValues = incrementQuantityNullValues("motherSurname", jObj, quantityNullValues);
            if (!isNullPropertyOfJson(jObj, "address") && 
                    !isValidPropertyValueString(jObj.get("address").getAsString(), 1, 300))
                return validateRepresentativeErrorMsg("address");
            quantityNullValues = incrementQuantityNullValues("address", jObj, quantityNullValues);
            if (!isNullPropertyOfJson(jObj, "dateOfBirth") &&
                    !isValidPropertyValueDate(jObj.get("dateOfBirth").getAsLong()))
                return validateRepresentativeErrorMsg("dateOfBirth");
            quantityNullValues = incrementQuantityNullValues("dateOfBirth", jObj, quantityNullValues);
            if (!isNullPropertyOfJson(jObj, "active") &&
                    !isValidPropertyValueBoolean(jObj.get("active").getAsBoolean()) &&
                    jObj.get("active").getAsBoolean())
                return validateRepresentativeErrorMsg("active");
            quantityNullValues = incrementQuantityNullValues("active", jObj, quantityNullValues);
            
        }
        catch (Exception e) {
            return "Parameter is not valid | " + e.getMessage();
        }
        if (quantityNullValues == 7)
            return "There is any parameters for update";
        
        student.setDni(isNullPropertyOfJson(jObj, "dni") 
                ? null : jObj.get("dni").getAsString());
        student.setName(isNullPropertyOfJson(jObj, "name") 
                ? null : jObj.get("name").getAsString());
        student.setFatherSurname(isNullPropertyOfJson(jObj, "fatherSurname") 
                ? null : jObj.get("fatherSurname").getAsString());
        student.setMotherSurname(isNullPropertyOfJson(jObj, "motherSurname") 
                ? null : jObj.get("motherSurname").getAsString());
        student.setAddress(isNullPropertyOfJson(jObj, "address") 
                ? null : jObj.get("address").getAsString());  
        student.setDateBirth(isNullPropertyOfJson(jObj, "dateOfBirth") 
                ? null : jObj.get("dateOfBirth").getAsLong());
        student.setActive(isNullPropertyOfJson(jObj, "active") 
                ? null : (jObj.get("active").getAsBoolean()));
        student.setCode(jObj.get("codeStudent").getAsInt());
        return null;
    }
    //</editor-fold>
    
    
    public boolean existsId(String idParam) {
        return idParam != null;
    }
    private boolean isValidPropertyValueString(final String value, int limitDown, int limitUp) {
        final int length = value.length();
        return length >= limitDown && length <= limitUp;
    }
    private boolean isValidPropertyValueDate(final Long value) {
        try {
            Date date = new Date(value);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
    private boolean isValidPropertyValueBoolean(final Boolean value) {
            return value;
    }
    private boolean isValidPropertyValueInteger(int value, Integer limitDown, Integer limitUp) {
        return value >= (limitDown != null ? limitDown : Integer.MIN_VALUE) && 
                value <= (limitUp != null ? limitUp : Integer.MAX_VALUE);
    }
    private int incrementQuantityNullValues(String key, JsonObject jObj, int previousValue) {
        return isNullPropertyOfJson(jObj, key) ? previousValue + 1 : previousValue;
    }
    private String validateRepresentativeErrorMsg(final String noValidParameterName) {
        return "The " + noValidParameterName + " is not a valid parameter.";
    }
    
    public boolean validateToken (final String token){
        return isValidPropertyValueString(token,25,25);
    }
}
