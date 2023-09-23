//#region Libraries
import { 
    useNavigate, 
    useLocation } from 'react-router';
import { Icon } from '@iconify/react';
//#endregion
//#region Styles
import { 
    Container, Offset, 
    ContainerButtonAddRegister
} from "./styles";
//#endregion
//#region Components
import RegistrationNav from '../registrationNav/RegistrationNav';
import SymbolHeader from "../../../../general/symbolHeader/SymbolHeader";
//#endregion

const RegistrationHeader = ({ infoRoutes }) => {
    //#region Extra Hooks
    const location = useLocation();
    //#endregion
    //#region Function
    const getShowButtonNewRegister = () => {
        return location.pathname === "/admin/registro/alumno" || 
            location.pathname === "/admin/registro/alumno/";
    }
    //#endregion
    const showButtonNewRegister = getShowButtonNewRegister();
    return (
        <>
            <Container>
                <SymbolHeader className="admin no-fixed"/>
                <RegistrationNav 
                    location={location} 
                    infoRoutes={infoRoutes}/>
                {showButtonNewRegister 
                    && <ButtonAddRegister/>}
            </Container>
            <Offset height={showButtonNewRegister ? "200px" : "150px"}/>
        </>
    );
};

const ButtonAddRegister = () => {
    const navigate = useNavigate();
    return (
        <ContainerButtonAddRegister>
            <button onClick={() => navigate("/admin/registro/alumno/nuevo")}>
                <Icon icon="carbon:add-alt"/>
                <span>Nuevo Registro</span>
            </button>
        </ContainerButtonAddRegister>
    );
}
export default RegistrationHeader;