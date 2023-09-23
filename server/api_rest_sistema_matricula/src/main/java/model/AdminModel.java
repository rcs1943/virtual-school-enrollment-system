package model;

import database.ProceduresDB;
import dto.admin.AdminAccountDTO;
import dto.student.ActivationAccountStudentDTO;
import dto.student.RepresentativeDTO;
import dto.student.StudentDTO;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;

public class AdminModel extends ModelParent {
    
    public ArrayList<HashMap<String, String>> getRegisterStudent(            
        final Integer limitTop,
        final Integer amount) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_REGISTER_STUDENT);
            prSt.setInt(1, limitTop);
            prSt.setInt(2, amount);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> getRepresentative(            
        final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_REPRESENTATIVE);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
    public ArrayList<HashMap<String, String>> getRepresentativeEmail(
        final String studentDni) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_REPRESENTATIVE_EMAIL);
            prSt.setString(1, studentDni);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> getTeacher(            
        final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_TEACHER);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> getTeacherClassroom(            
        final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_TEACHER_CLASSROOM);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> getAmountRegister(){
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_AMOUNT_REGISTER);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> updateStudent(
            final StudentDTO student) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.UPDATE_STUDENT);
                
                if (!setParameterIfNull(prSt, 1, Types.VARCHAR, student.getName())) {
                    prSt.setString(1, student.getName());
                }
                if (!setParameterIfNull(prSt, 2, Types.VARCHAR, student.getFatherSurname())) {
                    prSt.setString(2, student.getFatherSurname());
                }
                if (!setParameterIfNull(prSt, 3, Types.VARCHAR, student.getMotherSurname())) {
                    prSt.setString(3, student.getMotherSurname());
                }
                if (!setParameterIfNull(prSt, 4, Types.DATE, student.getDateBirth())) {
                    prSt.setDate(4, new Date(student.getDateBirth()));
                }
                if (!setParameterIfNull(prSt, 5, Types.VARCHAR, student.getDni())) {
                    prSt.setString(5, student.getDni());
                }
                if (!setParameterIfNull(prSt, 6, Types.VARCHAR, student.getAddress())) {
                    prSt.setString(6, student.getAddress());
                }
                if (!setParameterIfNull(prSt, 7, Types.BOOLEAN, student.getActive())) {
                    prSt.setBoolean(7, student.getActive());
                }
                prSt.setInt(8, student.getCode());
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> insertStudent(
            final StudentDTO student) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.INSERT_STUDENT);
            prSt.setString(1, student.getName());
            prSt.setString(2, student.getFatherSurname());
            prSt.setString(3, student.getMotherSurname());
            prSt.setDate(4, new Date(student.getDateBirth()));
            prSt.setString(5, student.getDni());
            prSt.setString(6, student.getAddress());
            prSt.setString(7, student.getRepresentative().getDni());
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> insertRepresentative(
            final RepresentativeDTO representative) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.INSERT_REPRESENTATIVE);
            prSt.setString(1, representative.getName());
            prSt.setString(2, representative.getFatherSurname());
            prSt.setString(3, representative.getMotherSurname());
            prSt.setString(4, representative.getDni());
            prSt.setString(5, representative.getEmail());
            prSt.setString(6, representative.getPhone());
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> verifyAcountAdmin(
            final AdminAccountDTO adminAcount) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.VERIFY_ACOUNT_ADMIN);
            prSt.setString(1, adminAcount.getUser());
            return prSt;
        });
    }

    public ArrayList<HashMap<String, String>> doAccountStudent(
            final ActivationAccountStudentDTO activationAccount,
            final String encryptedPassword) {
        return doActionQuery((Connection cnObj, PreparedStatement prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.DO_ACCOUNT_STUDENT);
            prSt.setString(1, activationAccount.getStudent().getDni());
            prSt.setString(2, activationAccount.getToken());
            prSt.setString(3, encryptedPassword);
            prSt.setString(4, activationAccount.getPlainPassword());
            return prSt;
        });
    }

    public ArrayList<HashMap<String, String>> activeAccountStudent(
            final String token) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.ACTIVE_ACCOUNT_STUDENT);
            prSt.setString(1, token);
            return prSt;
        });
    }
}
