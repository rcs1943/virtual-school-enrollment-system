//#region Libraries
import { 
    useState,
    useEffect
} from 'react';
import {
    useNavigate, 
    Navigate 
} from "react-router-dom";
//#endregion
//#region Styles
import { 
    ContainerSectionEnrollment,
    TaskInfo, 
    DoEnrollmentButton, 
    FormDoEnrollment, 
    ShowEyePopupMessage, 
    SuccesResponseEnrollment
} from './styles';
//#endregion
//#region Components
import EnrollmentData from './components/enrollmentData/EnrollmentData';
import CustomDataTable from '../../../general/customDataTable/CustomDataTable';
import PopupMessage from '../../../general/popupMessage/PopupMessage';
//#endregion
//#region Services
import { getDetailCampus } from '../../../../services/campus/student';
import { 
    getGradeToEnroll, 
    getDetailClassroom, 
    doEnrollment 
} from '../../../../services/campus/enrollment';
//#endregion

const responseEnrollmentType = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR", 
    LOADING: "LOADING"
};

const EnrollmentRoot = ({ manageCanEnroll, enrolled = false }) => {
    //#region States
    const [information, setInformation] = useState({
        dni: "",
        fullName: "",
        grade: {
            code: 0,
            name: ""
        },
        shiftCategory: "-", 
        codeSection: 0
    });
    const [classroomsObj, setClassroomsObj] = useState([]);
    const [showTableInformationSections, setShowTableInformationSections] = useState(false);
    const [responseEnrollment, setResponseEnrollment] = useState("");
    //#endregion
    //#region Effects
    useEffect(() => {
        !enrolled && fillEnrollmentInformation();
    }, []);
    //#endregion
    //#region Functions
    const changeSection = (section) => {
        setInformation(prev => ({
            ...prev,
            codeSection: section.code,
            shiftCategory: section.shift.category 
        }));
    }
    const getSectionTable = () => {
        return {
            fields: ["Sección", "Vacantes", "Turno"],
            rows: classroomsObj.map(classroomObj => ({
                section: classroomObj.classroom.section.letter,
                quantity: classroomObj.quantity, 
                shift: classroomObj.classroom.section.shift.category
            }))
        };
    }
    const fillEnrollmentInformation = async () => {
        const  { codeStudent, ...restDetailCampus } = getDetailCampus();
        const resGradeToEnroll = await getGradeToEnroll();
        const grade = resGradeToEnroll[0].data;
        const resDetailClassroom = await getDetailClassroom(grade.code);
        setClassroomsObj(prev => (
            [ 
                ...prev, 
                ...resDetailClassroom[0].data 
            ]
        ));
        setInformation(prev => ({
            ...prev,
            ...restDetailCampus,
            grade
        }));
    }
    const doEnrollmentSubmit = async (e) => {
        e.preventDefault();
        const  { codeStudent } = getDetailCampus();
        const { codeSection, grade } = information;
        
        setResponseEnrollment(responseEnrollmentType.LOADING);
        const [payload, err] = await doEnrollment({
            codeStudent,
            codeGrade: grade.code,
            codeSection 
        });
        if (err || !payload.data || !payload.data.enrolled) {
            setResponseEnrollment(responseEnrollmentType.ERROR);
            return;
        }
        setResponseEnrollment(responseEnrollmentType.SUCCESS);
        setTimeout(async () => {
            await manageCanEnroll();
        }, 3000);
    }
    const toggleShowTableInformationSections = () => {
        setShowTableInformationSections(prev => !prev);
    }
    //#endregion
    if (enrolled === true) 
        return (<Navigate to="/campus/matricula/informacion" replace={true}/>);
    const tableDataVacancies = getSectionTable();
    return (
        <ContainerSectionEnrollment>
            <TaskInfo>
                <h3 className="custom-title-2">MATRÍCULA</h3>
                <p>
                    Rellene el siguiente formulario con los datos solicitados para realizar la matrícula. Recuerde que solo se puede realizar una vez, por lo tanto no se puede modificar.
                </p>
            </TaskInfo>
            <FormDoEnrollment onSubmit={doEnrollmentSubmit}>
                <EnrollmentData 
                    information={information}
                    sections={classroomsObj.map(obj => obj.classroom.section)}
                    changeSection={changeSection}/>
                <footer>
                    <DoEnrollmentButton 
                        type="submit"
                        variant="contained"
                        className="secondary"
                        disabled={
                            information.codeSection < 1  
                            || responseEnrollment === responseEnrollmentType.LOADING
                            || responseEnrollment === responseEnrollmentType.SUCCESS} 
                        loading={
                            responseEnrollment === responseEnrollmentType.LOADING}
                        text="REALIZAR MATRÍCULA"/>
                {responseEnrollment === responseEnrollmentType.SUCCESS 
                    && (
                        <SuccesResponseEnrollment>
                            <h3 className="message">Redirigiendo a información de matrícula...</h3>
                            <PopupMessage 
                                color="var(--verification)" 
                                message="La matrícula se ha realizado correctamente" 
                                iconName="bi:check-circle-fill"/>
                        </SuccesResponseEnrollment>
                    )}
                {responseEnrollment === responseEnrollmentType.ERROR 
                    && <PopupMessage 
                            color="var(--seventh-color)"
                            message="Ocurrió un error inesperado" 
                            iconName="clarity:error-line"/>}
                    <ShowEyePopupMessage 
                        message="VER VACANTES" 
                        onClick={toggleShowTableInformationSections}
                        iconName={`el:eye-${showTableInformationSections 
                            ? "close" : "open"}`}/>
                </footer>
            </FormDoEnrollment>
            {showTableInformationSections 
            && <CustomDataTable 
                rows={tableDataVacancies.rows}
                fields={tableDataVacancies.fields}
                width="70%"/>}
        </ContainerSectionEnrollment>
    );
}

export default EnrollmentRoot;