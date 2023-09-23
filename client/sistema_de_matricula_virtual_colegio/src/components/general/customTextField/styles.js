import {
    TextField
} from '@mui/material';
import styled from "styled-components";

export const StyledTextField = styled(TextField)`
    & input {
        font-size: 18px !important;
    }
    &.registration {
        width: 400px;
    }
    &.css-1u3bzj6-MuiFormControl-root-MuiTextField-root{
        width: 100% !important;
    }
`;