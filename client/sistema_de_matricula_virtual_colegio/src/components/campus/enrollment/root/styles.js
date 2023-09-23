//#region Libraries
import CustomButton from '../../../general/customButton/CustomButton';
import PopupMessage from '../../../general/popupMessage/PopupMessage';
import styled, { keyframes } from "styled-components";
//#endregion

export const ContainerSectionEnrollment = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const TaskInfo = styled.article`
    padding: 10px;
    width: 70%;
    & p {
        font-size: 22px;
    }
    @media (max-width: 650px) {
        width: 80%;
    }
`
export const FormDoEnrollment = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-bottom: 50px;
    & footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
`;
export const DoEnrollmentButton = styled(CustomButton)`
    width: 130px;
    border-radius: 8px;
    font-size: 18px !important;
`;
export const ShowEyePopupMessage = styled(PopupMessage)`
    & h3 {
        font-size: 18px !important;
        font-weight: bold !important;
    }
    & .iconify {
        font-size: 32px !important;
        font-weight: bold !important;
    }
    cursor: pointer;
`;

const animationMessage = keyframes`
    to {
        color: var(--verification);
    }
`;

export const SuccesResponseEnrollment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    & .message {
        margin: 5px 0;
        animation: linear ${animationMessage} 0.5s infinite alternate-reverse;
    }
`;