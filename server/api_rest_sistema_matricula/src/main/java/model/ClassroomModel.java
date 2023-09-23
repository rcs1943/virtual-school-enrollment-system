package model;

import database.ProceduresDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

public class ClassroomModel extends ModelParent {
   
    //<editor-fold defaultstate="default" desc="Access Methods">
    public ArrayList<HashMap<String, String>> getSections() {
        return doActionQuery((Connection cnObj, PreparedStatement prSt) -> {
            prSt = cnObj.prepareStatement(
                    "SELECT \n" +
                    "	sec.code_section AS 'CODE_SECTION',\n" +
                    "    sec.letter AS 'LETTER',\n" +
                    "    sh.code_shift AS 'CODE_SHIFT',\n" +
                    "    sh.category AS 'CATEGORY'\n" +
                    "FROM section sec \n" +
                    "INNER JOIN shift sh\n" +
                    "ON sec.code_shift = sh.code_shift;");
            return prSt;
        });
    }
    //</editor-fold>
    
    public ArrayList<HashMap<String, String>> getDetailClassroom(final Integer codeGrado) {
        return doActionQuery((cnObj, prSt) -> {
            prSt = cnObj.prepareStatement(ProceduresDB.GET_DETAIL_CLASSROOM);
            prSt.setInt(1, codeGrado);
            return prSt;
        });
    }
    
}