//#region Libraries
import {
    useState, 
    useEffect 
} from "react";
import {
    Routes, 
    Route, 
    Navigate 
} from "react-router-dom";
//#endregion
//#region Components
import HeaderUser from '../../../components/campus/enrollment/components/headerUser/HeaderUser';
import InternalNav from '../../../components/general/internalNav/InternalNav';
import EnrollmentInformation from '../../../components/campus/enrollment/information/EnrollmentInformation';
import EnrollmentRoot from '../../../components/campus/enrollment/root/EnrollmentRoot';
import DialogAlertRedirectToHome from '../../../components/campus/enrollment/components/dialogAlertRedirectToHome/DialogAlertRedirectToHome';
//#endregion
//#region Utils
import useDidMount from "../../../utils/hooks/useDidMount";
//#endregion
//#region Services
import { canEnroll } from "../../../services/campus/enrollment";
//#endregion

const informationInternalNav = (() => {
    const root = "/campus/matricula"
    return [
        {
            path: "/campus/home", 
            nameRoute: "INICIO" 
        },
        {
            path: root, 
            nameRoute: "MATRÍCULA" 
        },
        {
            path: `${root}/informacion`, 
            nameRoute: "INFORMACIÓN" 
        }
    ];
})();

const enrollResponse = {
    CAN_ENROLL: "CAN_ENROLL",
    COMPLETED_STUDIES: "COMPLETED_STUDIES",
    ENROLLED: "ENROLLED",
    NO_PAID: "NO_PAID",
    ERROR: "ERROR"
};

const Enrollment = () => {
    //#region Extra hooks
    const didMount = useDidMount();
    //#endregion
    //#region States
    const [stateEnroll, setStateEnroll] = useState("");
    //#endregion
    //#region Effects
    useEffect(() => {
        manageCanEnroll();
    }, []);
    //#endregion
    //#region Functions
    const manageCanEnroll = async () => {
        const [payload, err] = await canEnroll();
        if (!payload.data || err) {
            setStateEnroll(enrollResponse.ERROR);
            return;
        }
        setStateEnroll(payload.data.stateEnroll);
    } 
    //#endregion
    if (!didMount) return null;
    switch (stateEnroll) {
        case enrollResponse.ERROR:
            return (
                <DialogAlertRedirectToHome 
                    title="ERROR INESPERADO" 
                    description="Ha ocurrido un error inesperado. Inténtelo más tarde."/>
            );
        case "": return null;
        case enrollResponse.COMPLETED_STUDIES:
            return (
                <DialogAlertRedirectToHome 
                    title="INFORMACIÓN" 
                    description="Usted ya completó sus estudios satisfactoriamente."/>
                );
        case enrollResponse.ENROLLED:
            break;
        case enrollResponse.NO_PAID:
            return (
                <DialogAlertRedirectToHome 
                    title="PAGO NO REALIZADO" 
                    description="Debe realizar el pago correspondiente para poder matricularse."/>
            );
        default:
            break;
    }
    const enrolled = (stateEnroll === enrollResponse.ENROLLED);
    return (
        <>
            <HeaderUser/>
            <InternalNav 
                information={informationInternalNav}/>
            <Routes>
                <Route
                    path="informacion" 
                    element={
                        <EnrollmentInformation
                            enrolled={enrolled}/>
                    }/>
                <Route
                    path="" 
                    element={
                        <EnrollmentRoot 
                            manageCanEnroll={manageCanEnroll} 
                            enrolled={enrolled}/>
                    }/>
                <Route
                    path="*"
                    element={<Navigate to="/campus/matricula" replace={true}/>}/>
            </Routes>
        </>
    );
}

export default Enrollment;