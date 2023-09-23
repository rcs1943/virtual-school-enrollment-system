//#region Styles
import { 
    Container } from "./styles";
//#endregion
//#region Components
import PopupMessage from "../../../../../../general/popupMessage/PopupMessage";
import CustomLoader from "../../../../../../general/customLoader/CustomLoader";
//#endregion
//#region Utils
import { typeStateResponseUpdate } from "../../../../../../../utils/types";
//#endregion

const UpdateMessage = ({ stateResponseUpdate }) => {
    return (
        <Container>
            <ContentUpdateMessage stateResponseUpdate={stateResponseUpdate}/>
        </Container>
    );
}

const ContentUpdateMessage = ({ stateResponseUpdate }) => {
    switch (stateResponseUpdate) {
        case typeStateResponseUpdate.ERROR:
            return (
                <PopupMessage
                    className="update-result-message" 
                    color="var(--seventh-color)" 
                    message="Valor inválido. No se pudo actualizar el campo." 
                    iconName="clarity:error-line"/>
            );
        case typeStateResponseUpdate.UNEXPECTED_ERROR:
            return (
                <PopupMessage
                    className="update-result-message" 
                    color="var(--seventh-color)" 
                    message="¡Error inesperado! Inténtelo más tarde." 
                    iconName="clarity:error-line"/>
            );
        case typeStateResponseUpdate.LOADING:
            return <CustomLoader size={10} spacing={5}/>
        case typeStateResponseUpdate.SUCCESS:
            return (
                <PopupMessage
                    className="update-result-message" 
                    color="var(--verification)" 
                    message="¡Campo actualizado exitosamente!" 
                    iconName="bi:check-circle-fill"/>
            );
        default: 
            return null;
    }
}

export default UpdateMessage;