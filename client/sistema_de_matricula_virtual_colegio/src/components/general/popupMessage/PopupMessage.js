//#region Styles
import { 
    ContainerMessage, 
    Message } from './styles';
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
const PopupMessage = ({ 
    onClick, 
    className, iconName, 
    color, message
}) => {
    return (
        <ContainerMessage onClick={onClick}>
            <Icon className={className} icon={iconName} color={color} />
            <Message className={className} color={color}>
                {message}
            </Message>
        </ContainerMessage>
    );
}

export default PopupMessage;