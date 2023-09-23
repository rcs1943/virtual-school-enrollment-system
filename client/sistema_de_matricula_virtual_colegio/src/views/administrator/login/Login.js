//#region Libraries
import { Navigate } from 'react-router-dom';
//#endregion
//#region Styles
import {
    ContainerBackgroundBlue
} from '../../../components/administrator/components/styles';
import { 
    ContentSectionLogin,
    AdminImgContainer,
} from './styles';
//#endregion
//#region Images
import adminImg from '../../../img/administrator/login/admin-icon.png';
//#endregion
//#region Components
import FormLogin from "../../../components/administrator/login/formLogin/FormLogin";
//#endregion

const Login = () => {
    return (
        <>
            <ContainerBackgroundBlue>
                <ContentSectionLogin>
                    <AdminImgContainer>
                        <img src={adminImg} alt="Icono Admin"/>
                    </AdminImgContainer>
                    <h2 className="custom-title-2">INICIAR SESIÓN</h2>
                    <FormLogin/>
                </ContentSectionLogin>
            </ContainerBackgroundBlue>
        </>
    );
}

export default Login;