//#region Styles
import {
    Container,
    ContainerItemViewLink } from "./styles";
//#endregion
//#region Utils
import { typeStateViewNewStudent } from "../../../../../../../utils/types";
//#endregion

const ItemViewLink = ({ 
    text, 
    active 
}) => {
    return (
        <ContainerItemViewLink 
            className={active && "active"}>
            {text}
        </ContainerItemViewLink>
    );
}
const SidebarManagementView = ({
    stateView
}) => {
    const activeLinks = Object.values(typeStateViewNewStudent)
        .map(typeState => stateView === typeState);
    return (
        <Container>
            <ul>
                <ItemViewLink 
                    text="DATOS DEL APODERADO" 
                    active={activeLinks[0]}/>
                <ItemViewLink 
                    text="DATOS DEL ESTUDIANTE" 
                    active={activeLinks[1]}/>
                <ItemViewLink 
                    text="CUENTA" 
                    active={activeLinks[2]}/>
            </ul>
        </Container>
    );
}

export default SidebarManagementView;