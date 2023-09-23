//#region Libraries
import { Navigate } from 'react-router-dom';
//#endregion
//#region Styles
import { 
    ContainerSectionLogin,
    ContentSectionLogin,
    ContentHeaderSectionLogin 
} from './styles';
//#endregion
//#region Images
import schoolImg from '../../../img/campus/login/school-img.jpg';
//#endregion
//#region Components
import SymbolHeader from "../../../components/general/symbolHeader/SymbolHeader";
import FormLogin from "../../../components/campus/login/formLogin/FormLogin";
//#endregion

const Login = () => {
    return (
        <>
            <SymbolHeader showTitle={true}/>
            <ContainerSectionLogin>
                <img src={schoolImg} alt="escuela, colegio"/>
                <ContentSectionLogin>
                    <ContentHeaderSectionLogin>
                        <h2 className="custom-title-2">INICIAR SESIÓN</h2>
                        <h4 className="custom-title-4">Introduce tu información</h4>
                    </ContentHeaderSectionLogin>
                    <FormLogin/>
                </ContentSectionLogin>
            </ContainerSectionLogin>
        </>
    )
}

export default Login;