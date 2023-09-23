//#region Libraries
import { 
    useState, 
    useEffect } from "react";
import { 
    useParams, 
    Navigate  
} from "react-router";
//#endregion
//#region Styles
import { 
    ContainerSectionActivation, 
    Title,
    CardContainer,
    SuccessInfo, 
    CustomButtonLink
} from './styles';
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
//#region Components
import SymbolHeader from "../../../components/general/symbolHeader/SymbolHeader";
import CustomButton from '../../../components/general/customButton/CustomButton';
//#endregion
//#region Services
import { activateStudentAccount } from "../../../services/admin/studentsRegister";
//#endregion

const AccountActivation = () => {
    //#region States
    const [isCorrectToken, setIsCorrectToken] = useState(null);
    //#endregion
    //#region Extra hooks
    const params = useParams();
    //#endregion
    //#region Effects
    useEffect(() => {
        verifyToken();
    }, []);
    //#endregion
    //#region Functions
    const verifyToken = async () => {
        if (!params.token) {
            setIsCorrectToken(false);
            return;
        }
        const [payload, err] = await activateStudentAccount(params.token);
        if (err || !payload.data) {
            setIsCorrectToken(false);
            return;
        }
        setIsCorrectToken(true);
    }
    if (isCorrectToken === null) 
        return null;
    if (!isCorrectToken) 
        return <Navigate to="/campus/login" replace={true}/>
    //#endregion
    return (
        <>
            <SymbolHeader/>
            <ContainerSectionActivation>
                <Title className="custom-title-3">¡TE DAMOS LA BIENVENIDA!</Title>
                <CardContainer>
                    <div><h5 className="custom-title-6">CUENTA ACTIVADA</h5></div>
                    <SuccessInfo>
                        <Icon icon="akar-icons:circle-check-fill"/>
                        <h4 className="custom-title-3">Cuenta creada con éxito</h4>
                        <p>
                            La activación de su cuenta se ha realizado correctamente, desde ahora podrá hacer uso de los servicios que ofrece la institución educativa “Victor Manuel Maurtua”  a través del campus virtual.  Para esto, se le hará entrega del código de estudiante y contraseña enviados al correo electrónico del apoderado.
                        </p>
                        <footer>
                            <CustomButtonLink to="/campus/login">
                                <CustomButton
                                    type="submit"
                                    text="INICIAR SESIÓN"/>
                            </CustomButtonLink>
                        </footer>
                    </SuccessInfo>
                </CardContainer>
            </ContainerSectionActivation>
        </>
    );
}

export default AccountActivation;