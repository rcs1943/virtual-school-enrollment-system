//#region Libraries
import styled, { keyframes } from "styled-components";
//#endregion

export const ContentFormSectionLogin = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
    & .fields {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    & footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
    & footer, footer button {
        width: 100%;
    }
`;

export const IsNewStudent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 13px;
    & .description {
        color: #b5b5b5;
    }
    & .open-dialog {
        color: var(--primary-color);
        font-weight: bold;
        cursor: pointer;
        transition: 0.35s;
    }
    & .open-dialog:hover {
        color: var(--secondary-color);
    }
`;