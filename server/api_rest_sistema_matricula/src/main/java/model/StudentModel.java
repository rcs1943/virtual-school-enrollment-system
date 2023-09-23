package model;

import database.ProceduresDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;

public class StudentModel extends ModelParent {
    
    public ArrayList<HashMap<String, String>> verifyAccount(final String dni) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_PASSWORD);
            prSt.setString(1, dni);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> getDetailStudent(final String dni) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_DETAIL_STUDENT);
            prSt.setString(1, dni);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> verifyPay(final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.VERIFY_PAY);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> verifyGradeToEnroll(final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.VERYFY_GRADE);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> verifyEnroll(final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.VERIFY_ENROLL);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> gradeToEnrollment(final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_GRADE_TO_ENROLLMENT);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> doEnrollment(
            final Integer codeStudent,
            final Integer codeGrade,
            final Integer codeSection) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.DO_ENROLLMENT);
            prSt.setInt(1, codeStudent);
            prSt.setInt(2, codeGrade);
            prSt.setInt(3, codeSection);
            return prSt;
        });
    }
    
    public ArrayList<HashMap<String, String>> getDetailEnrollment(
            final Integer codeStudent) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_DETAIL_ENROLLMENT);
            prSt.setInt(1, codeStudent);
            return prSt;
        });
    }
}
