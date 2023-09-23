//#region Libraries
import { 
    useEffect 
} from 'react';
import { 
    Routes, 
    Route, 
    Navigate 
} from "react-router-dom";
//#endregion
//#region Components
import Login from "../views/campus/login/Login";
import Home from "../views/campus/home/Home";
import Enrollment from '../views/campus/enrollment/Enrollment';
import Intranet from '../views/campus/intranet/Intranet';
import AulaVirtual from '../views/campus/aula-virtual/AulaVirtual';
import ActivateAccount from '../views/campus/activate-account/ActivateAccount'
import { RouteProtectedStudent } from '../components/general/RouteProtected';
//#endregion
//#region Utils
import changeTitle from '../utils/changeTitle.js';
//#endregion

const Campus = () => {
    //#region Effects
    useEffect(() => {
        changeTitle("Campus");
    }, []);
    //#endregion
    return (
        <Routes>
            <Route 
                path="login" 
                element={
                    <RouteProtectedStudent reverse={true}>
                        <Login/>
                    </RouteProtectedStudent>}/>
            <Route path="home" 
                element={
                    <RouteProtectedStudent>
                        <Home/>
                    </RouteProtectedStudent>}/>
            <Route path="matricula/*" 
                element={
                    <RouteProtectedStudent>
                        <Enrollment/>
                    </RouteProtectedStudent>}/>
            <Route path="intranet" 
                element={
                    <RouteProtectedStudent>
                        <Intranet/>
                    </RouteProtectedStudent>}/>
            <Route path="aula-virtual" 
                element={
                    <RouteProtectedStudent>
                        <AulaVirtual/>
                    </RouteProtectedStudent>}/>
            <Route 
                path="activar-cuenta/:token"
                element={<ActivateAccount/>}/>
            <Route 
                path="*"
                element={<Navigate to="/campus/home" replace={true}/>}/>
        </Routes>
    );
}

export default Campus;