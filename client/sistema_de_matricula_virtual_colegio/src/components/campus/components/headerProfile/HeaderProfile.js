//#region Libraries
import { 
    useState,
    useEffect 
} from 'react';
import { useNavigate } from 'react-router-dom';
//#endregion
//#region Styles
import { 
    ContainerProfile,
    ContentProfile,
    ContainerLogoutBtn } from './styles';
//#endregion
//#region Components
import DialogAlert from "../../../general/dialogAlert/DialogAlert";
import CustomButton from "../../../general/customButton/CustomButton";
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
//#region Services
import { logoutStudent } from '../../../../services/campus/auth';
import { getDetailCampus } from '../../../../services/campus/student';
//#endregion

const HeaderProfile = ({ only = false }) => {
    //#region States
    const [nameUser, setNameUser] = useState("");
    const [showLogout, setShowLogout] = useState(false);
    //#endregion
    //#region Effects
    useEffect(() => {
        const { fullName } = getDetailCampus();
        setNameUser(fullName);
    }, []);
    //#endregion
    //#region Functions
    const toggleShowLogout = () => setShowLogout(prev => (!prev));
    //#endregion
    return (
        <ContainerProfile onClick={toggleShowLogout}>
            <ContentProfile className={only && "only"}>
                <span className="custom-title-6">{nameUser}</span>
                <div className="icons">
                    <Icon icon="bx:bxs-user"/>
                    <Icon 
                        className={`arrow ${showLogout ? "up" : ""}`}
                        icon="bx:bxs-down-arrow"/>
                </div>
            </ContentProfile>
            <LogoutButton active={showLogout}/>
        </ContainerProfile>
    );
}

const LogoutButton = ({ active = false }) => {
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
                className={active && "active"} 
                onClick={() => setShowConfirmLogoutDialog(true)}>
                <Icon icon="bx:bx-log-out"/>
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
                                logoutStudent();
                                navigate("/campus/login");
                            }}/>,
                    () => <CustomButton 
                            text="No"
                            variant="outlined"
                            onClick={() => setShowConfirmLogoutDialog(false)}/>
                ]}/>
        </>
    );
}

export default HeaderProfile;