//#region Libraries
import styled from "styled-components";
import {
    Select,
    MenuItem
} from '@mui/material';
//#endregion

export const ContainerEnrollmentData = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    margin-bottom: 20px;
    @media (max-width: 750px) {
        width: 92%
    }
`;
export const FrameEnrollmentData = styled.section`
    display: flex;
    flex-direction: column;
    gap: 35px;
    border: 1px solid #737373;
    border-radius: 20px;
    padding: 30px 40px;
    width: 90%;
    & .content {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    & h3 {
        font-weight: 600;
        margin: 0;
        padding: 0;
        font-size: 20px;
    }
    @media (max-width: 750px) {
        width: 100%;
    }
`
export const ContainerDataField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    & .description {
        font-size: 20px;
        color: #737373;
        font-weight: 400;
        margin: 0;
    }
    & .value {
        font-size: 19px;
        font-weight: 400;
        margin-left: 25px;
    }
    & .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: var(--primary-color);
    }
    & .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 5px 0 5px 15px;
    }
`;
export const SelectSection = styled(Select)`
    width: 150px !important;
    & div {
        text-align: center !important;
    }
    border-radius: 10px;
    font-size: 20px;
    margin-left: 30px;
`;
export const MenuItemSection = styled(MenuItem)`
    display: flex !important;
    justify-content: center !important;
`;
export const ContentEnrollmentData = styled.section`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    & .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        gap: 15px;
    }
`;
