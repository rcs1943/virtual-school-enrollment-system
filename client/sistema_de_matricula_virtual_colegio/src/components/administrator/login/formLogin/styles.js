//#region Libraries
import styled from "styled-components";
//#endregion

export const ContentFormSectionLogin = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
    & .fields {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
    }
    & footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }
`