package entity;

import dto.classroom.ClassroomDTO;
import dto.classroom.ClassroomVacancyDTO;
import dto.classroom.SectionDTO;
import dto.classroom.ShiftDTO;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import model.ClassroomModel;

public class ClassroomEntity {

    //<editor-fold defaultstate="defaultstate" desc="Action Methods">
    public SectionDTO[] getSections() {
        return toArraySectionDTOs(new ClassroomModel().getSections());
    }
    
    public ClassroomVacancyDTO[] getDetailClassroom(final Integer codeGrade){
        final ArrayList<HashMap<String,String>> table = new ClassroomModel().getDetailClassroom(codeGrade);
        return table.size() > 0 ? toArrayClassroomVacancyDTOs(table) : null;
    }
    private ClassroomVacancyDTO[] toArrayClassroomVacancyDTOs(ArrayList<HashMap<String, String>> table) {
        final Object[] objArray = EntityHelper.hashMapArrayListToObjArray(
                table, 
                this::getDTOforRowHashMapDetailClassroom
        );
        return Arrays.copyOf(objArray, objArray.length, ClassroomVacancyDTO[].class);
    }
    private ClassroomVacancyDTO getDTOforRowHashMapDetailClassroom(HashMap<String, String> row) {
        final ClassroomVacancyDTO classroomVacancy = new ClassroomVacancyDTO();
        final ClassroomDTO classroom = new ClassroomDTO();
        final ShiftDTO shift = new ShiftDTO();
        shift.setCategory(row.get("category"));
        final SectionDTO section = new SectionDTO(
                Integer.parseInt(row.get("code_section")),
                row.get("letter"),
                shift
        );
        classroom.setSection(section);
        classroomVacancy.setClassroom(classroom);
        classroomVacancy.setQuantity(Integer.parseInt(row.get("quantity")));

        return classroomVacancy ;
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="defaultstate" desc="Helper Methods">
    private SectionDTO getDTOforRowHashMap(HashMap<String, String> row) {
        return new SectionDTO(
                Integer.parseInt(row.get("CODE_SECTION")),
                row.get("LETTER"),
                new ShiftDTO(
                        Integer.parseInt(row.get("CODE_SHIFT")), 
                        row.get("CATEGORY")
                )
        );
    }
    private SectionDTO[] toArraySectionDTOs(ArrayList<HashMap<String, String>> table) {
        final Object[] objArray = EntityHelper.hashMapArrayListToObjArray(
                table, 
                (HashMap<String, String> row) -> getDTOforRowHashMap(row)
        );
        return Arrays.copyOf(objArray, objArray.length, SectionDTO[].class);
    }
    //</editor-fold>

}
