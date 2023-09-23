//#region Libraries
import { 
    useState,
    useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//#endregion
//#region Styles
import { 
    ContainerLogoutBtn
} from './styles';
//#endregion
//#region Components
import DialogAlert from "../../../general/dialogAlert/DialogAlert";
import CustomButton from "../../../general/customButton/CustomButton";
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
//#region Services
import { logoutAdmin } from '../../../../services/admin/auth';
//#endregion

const LogoutBtn = ({
        className
    }) => {
    //#region Extra hooks
    const navigate = useNavigate();
    //#endregion
    //#region States
    const [showConfirmLogoutDialog, setShowConfirmLogoutDialog] = useState(false);
    //#endregion
    //#region Functions
    const toggleShowConfirmLogoutDialog = () => {
        setShowConfirmLogoutDialog(prev => !prev);
    }
    //#endregion
    return (
        <>
            <ContainerLogoutBtn 
                className={className}
                onClick={() => setShowConfirmLogoutDialog(true)}>
                <Icon icon="ri:logout-box-line"/>
                <span className="custom-title-3">Cerrar sesión</span>
            </ContainerLogoutBtn>
            <DialogAlert 
                open={showConfirmLogoutDialog}
                handleOpen={toggleShowConfirmLogoutDialog}
                description={<p>¿Está seguro de cerrar sesión?</p>}
                buttons={[
                    () => <CustomButton 
                            text="Sí"
                            variant="outlined"
                            onClick={() => {
                                logoutAdmin();
                                navigate("/admin/login");
                            }}/>,
                    () => <CustomButton 
                            text="No"
                            variant="outlined"
                            onClick={() => setShowConfirmLogoutDialog(false)}/>
                ]}/>
        </>
    );
}

export default LogoutBtn;