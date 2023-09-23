import { 
    TableContainer, 
    TableCell, 
    TableRow } from '@mui/material';
import styled from "styled-components";

export const StyledContainerTable = styled(TableContainer)`
    padding: 10px;
    width: ${(props) => (props.width)} !important;
`;
export const StyledCaptionTable = styled.caption`
    caption-side: top !important;
    background-color: var(--fourth-color);
    font-size: 16px !important;
    & span {
        font-weight: bold;
    }
`;
export const StyledTableRow = styled(TableRow)`
    &:nth-of-type(odd) {
        background-color: #ebebeb;
    }
    &:last-child td, &:last-child th {
        border: 0;
    }
`;
export const StyledTableCell = styled(TableCell)`
    text-align: center;
    transition: 0.5s;
    &.MuiTableCell-head {
        background-color: var(--secondary-2-color);
        color: #ffffff;
    }
    &.secondary.MuiTableCell-head {
        background-color: var(--fifth-color);
    }
    &.MuiTableCell-body {
        font-size: 14px;
    }
    &.MuiTableCell-body.secondary {
        padding: 0px 20px;
        &:nth-child(1) {
            background-color: var(--sixth-color);
            color: var(--third-color);
            font-weight: bold;
            width: max-content;
        }
    }
    &.MuiTableCell-body.secondary:hover {
        background: #ffff0088;
    }
`;

export const ContainerInputTable = styled.div`
    position: relative;
`;
export const StyledInputTable = styled.input`
    padding: 3px 10px;
    outline: none;
    border: 0;
    border-radius: 5px;
    text-overflow: ellipsis;
    transition: 0.4s;
    cursor: pointer;
    &:not(:disabled) {
        color: var(--fourth-color);
        background-color: var(--fifth-color);
    }
    &:disabled {
        background-color: transparent;
    }
    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`;