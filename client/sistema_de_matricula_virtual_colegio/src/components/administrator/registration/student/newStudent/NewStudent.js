//#region Libraries
import { useState } from "react";
//#endregion
//#region Styles
import { 
    Container, 
    Content } from "./styles";
//#endregion
//#region Components
import InternalNav from "../../../../general/internalNav/InternalNav";
import SidebarManagementView from './components/sidebarManagementView/SidebarManagementView';
import FormInfoRepresentative from './components/formInfoRepresentative/FormInfoRepresentative';
import FormInfoStudent from './components/formInfoStudent/FormInfoStudent';
import FormGenerateAccount from './components/formGenerateAccount/FormGenerateAccount';
//#endregion
//#region Utils
import { informationInternalNav } from "../Student"; 
import { typeStateViewNewStudent } from "../../../../../utils/types";
//#endregion


const NewStudent = () => {
    //#region States
    const [stateView, setStateView] = useState(typeStateViewNewStudent.INFO_REPRESENTATIVE);
    const [helperData, setHelperData] = useState({
        dniRepresentative: "42324424", 
        student: {
            fullName: "-", 
            dni: "-", 
            address: "-",
            dateBirth: "-"
        }
    });
    const itemsView = {
        [typeStateViewNewStudent.INFO_REPRESENTATIVE]: (
                <FormInfoRepresentative 
                    nextForm={
                        (dniRepresentative) => {
                            setHelperData(prev => ({ ...prev, dniRepresentative }));
                            changeStateView(typeStateViewNewStudent.INFO_STUDENT);
                        }}/>
            ), 
        [typeStateViewNewStudent.INFO_STUDENT]: (
                <FormInfoStudent 
                    dniRepresentative={helperData.dniRepresentative}
                    nextForm={
                        (student) => {
                            setHelperData(prev => ({ ...prev, student }));
                            changeStateView(typeStateViewNewStudent.GENERATE_ACCOUNT);
                        }}/>
            ), 
        [typeStateViewNewStudent.GENERATE_ACCOUNT]: (
                <FormGenerateAccount 
                    dataStudent={helperData.student}/>
            )
    }
    const changeStateView = (state) => {
        setStateView(state);
    }
    //#endregion
    return (
        <>
            <SidebarManagementView stateView={stateView}/>
            <Container>
                <InternalNav information={informationInternalNav}/>
                <Content>
                    {itemsView[stateView]}
                </Content>
            </Container>
        </>
    );
}

export default NewStudent;