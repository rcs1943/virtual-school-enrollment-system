//#region Libraries
import { 
    useState,
    useEffect 
} from 'react';
import {
    Navigate 
} from "react-router-dom";
//#endregion
//#region Styles
import { ContainerEnrollmentInformation } from './styles';
//#endregion
//#region Components
import EnrollmentDataInformation from "./components/enrollmentDataInformation/EnrollmentDataInformation";
import EnrollmentTableInformation from "./components/enrollmentTableInformation/EnrollmentTableInformation";
//#region Utils
import { getDate } from '../../../../utils/date';
import useDidMount from "../../../../utils/hooks/useDidMount";
//#endregion
//#region Services
import { getDetailCampus } from '../../../../services/campus/student';
import { getDetailEnrollment } from '../../../../services/campus/enrollment';
//#endregion

const getTeacherFullName = (teacher) => `${teacher.fatherSurname} ${teacher.motherSurname}, ${teacher.name}`;

const EnrollmentInformation = ({ enrolled }) => {
    //#region Extra hooks
    const didMount = useDidMount();
    //#endregion
    //#region States
    const [dataInformation, setDataInformation] = useState({
        fullName: "-", 
        grade: "-",
        section: "-",
        shift: "-",
        dni: "-",
        date: "-"
    });
    const [tableInformation, setTableInformation] = useState([]);
    //#endregion
    //#region Effects
    useEffect(() => {
        enrolled && doGetDetailEnrollment();
    }, []);
    //#endregion
    //#region Functions
    const doGetDetailEnrollment = async () => {
        const { codeStudent, ...restDetailCampus } = getDetailCampus();
        const [payload, err] =  await getDetailEnrollment(codeStudent);
        if (!payload.data || err) return;
        const { 
            information, 
            classroomTeachers, 
            formTeacher } = payload.data;
        fillInformation(restDetailCampus, information);
        fillTableData(formTeacher, classroomTeachers);
    }
    const fillInformation = (detailCampus, information) => {
        setDataInformation(prev => ({
            ...prev, 
            ...detailCampus, 
            date: getDate(information.date),
            grade: information.classroom.grade.name, 
            section: information.classroom.section.letter, 
            shift: information.classroom.section.shift.category
        }));
    };
    const fillTableData = (formTeacher, classroomTeachers) => {
        setTableInformation({
            formTeacher: getTeacherFullName(formTeacher),
            courses: classroomTeachers.map(
                (classroomTeacher, idx) => ({
                    numberIdx: idx + 1,
                    course: classroomTeacher.course.name,
                    teacher: getTeacherFullName(classroomTeacher.teacher)
                }))
        });
    }
    //#endregion
    if (!didMount) return null;
    if (!enrolled) 
        return (<Navigate to="/campus/matricula/" replace={true}/>);
    return (
        <ContainerEnrollmentInformation>
            <EnrollmentDataInformation 
                dataInformation={dataInformation}/>
            <EnrollmentTableInformation 
                tableInformation={tableInformation}/>
        </ContainerEnrollmentInformation>
    );
};

export default EnrollmentInformation;
