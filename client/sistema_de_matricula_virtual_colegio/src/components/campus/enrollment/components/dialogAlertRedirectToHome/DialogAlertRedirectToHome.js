//#region Libraries
import {
    useState 
} from "react";
import {
    useNavigate 
} from "react-router-dom";
//#endregion
//#region Components
import DialogAlert from '../../../../general/dialogAlert/DialogAlert';
import CustomButton from '../../../../general/customButton/CustomButton';
//#endregion

const DialogAlertRedirectToHome = ({
    title,
    description 
}) => {
    //#region Extra Hooks
    const navigate = useNavigate();
    //#endregion
    //#region States
    const [showDialog, setShowDialog] = useState(true);
    const toggleShowDialog = () => {
        setShowDialog(prev => !prev);
    }
    const closeDialog = () => {
        setShowDialog(false);
        setTimeout(() => {
            navigate("/campus/home", { replace: true });
        }, 700);
    }
    //#endregion
    return (
        <DialogAlert 
            title={title}
            titleIcon="fa-solid:info-circle" 
            open={showDialog} 
            handleOpen={toggleShowDialog}
            handleClose={closeDialog}
            buttons={[
                () => <CustomButton
                    variant="outlined"
                    onClick={closeDialog}
                    text="ACEPTAR"/>
            ]}
            description={
                <p>{description}</p>
            }/>
    );
}

export default DialogAlertRedirectToHome;