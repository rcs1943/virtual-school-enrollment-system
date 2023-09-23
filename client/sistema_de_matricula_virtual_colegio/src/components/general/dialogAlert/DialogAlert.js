//#region Libraries
import { forwardRef } from 'react';
import {
    Slide 
} from '@mui/material';
//#endregion
//#region Styles
import { 
    ContainerCustomDialogAlert, 
    HeaderCustomDialogAlert,
    FooterCustomDialogAlert
} from './styles';
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
//#region Components
//#endregion

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAlert = ({
        open, 
        handleOpen,
        handleClose, 
        title, 
        description,
        buttons,
        titleIcon
    }) => {
    return (
        <ContainerCustomDialogAlert 
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose ? handleClose : () => handleOpen(false)}>
            {title && 
                <HeaderCustomDialogAlert>
                    {titleIcon && <Icon icon={titleIcon}/>}
                    <h3 className="custom-title-2">{title}</h3>
                </HeaderCustomDialogAlert>
            }
            <article className="content-dialog">
                {description || <p>Descripción</p>}
            </article>
            <FooterCustomDialogAlert>
                {Array.isArray(buttons) && 
                    buttons.map(
                        (ButtonMapping, idx) => <ButtonMapping key={idx}/>)}
            </FooterCustomDialogAlert>
        </ContainerCustomDialogAlert>
    );
}


export default DialogAlert;