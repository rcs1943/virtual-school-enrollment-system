//#region Libraries
import styled from "styled-components";
//#endregion
//#region Components
import HeaderProfile from '../../../components/campus/components/headerProfile/HeaderProfile.js';
//#endregion

export const ContainerSectionHome = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
`;
export const HeaderSectionHome = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--third-color);
    gap: 15px;
    padding: 60px 0;
    & > img {
        width: 90px;
    }
`;
export const ContentSectionHome = styled.article`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 60px 40px;
    gap: 20px;
`;

export const HeaderProfileHome = styled(HeaderProfile)`
    border-radius: 20px !important;
    transition: 0.35s !important;
    z-index: 0;
    align-self: flex-end;
    margin-right: 10px;
    span {
        color: var(--fifth-color) !important;
    }
    .iconify {
        color: var(--fifth-color) !important;
    }
    .arrow {
        border-top: 6px solid var(--fifth-color) !important; 
    }
    &:hover {
        background-color: #F1F1F1 !important;
    }
`;