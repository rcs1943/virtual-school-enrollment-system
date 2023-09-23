//#region Libraries
import { Icon } from "@iconify/react";
import styled, { keyframes } from "styled-components";
//#endregion

export const Container = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    width: 95%;
    & footer {
        display: flex;
        align-self: flex-end;
        align-items: center;
        gap: 20px;
    }
    & footer button {
        width: 130px;
        display: flex;
    }
`;
export const Content = styled.section`
    display: flex;
    gap: 10px;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
`;
export const ContentGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    & .css-1u3bzj6-MuiFormControl-root-MuiTextField-root{
        min-width: 300px !important;
    }
`;
export const StyledIcon = styled(Icon)`
    font-size: 18px;
`;