//#region Libraries
import {
    Button 
} from "@mui/material";
import styled from "styled-components";
//#endregion
//#region Components
import CustomLoader from "../customLoader/CustomLoader";
//#endregion

export const StyledButton = styled(Button)`
    padding: 5px 30px !important;
    border: 0;
    position: relative;
    &.MuiButton-contained {
        border-radius: 5px;
        background-color: var(--primary-color) !important;
    }
    &.secondary {
        border-radius: 5px;
        background-color: var(--seventh-color) !important;
        color: var(--third-color) !important;
    }
    &.secondary:hover {
        background-color: var(--seventh-color-dark) !important;
    }
    &:disabled {
        color: #b5b5b5 !important;
        background-color: #353535 !important;
    }
`;
export const StyledCustomLoader = styled(CustomLoader)`
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
`;