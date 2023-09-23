//#region Libraries
import styled from "styled-components";
import { Link } from 'react-router-dom';
//#endregion

export const ContainerCardLinkServiceCampus = styled(Link)`
    text-decoration: none !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--nine-color);
    padding: 10px;
    width: 250px;
    border-radius: 26px;
    box-shadow: inset 0 2px 2px 0 #00000077;
    transition: 0.4s;
    filter: brightness(90%);
    &:hover {
        transform: scale(1.05);
        filter: brightness(130%);
    }
`;
export const TitleCardLinkServiceCampus = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    & .iconify {
        font-size: 100px;
        color: #000000;
    }
    & h4 {
        color: #000000;
        font-size: 24px;    
        font-weight: 600;
        margin: 0;
    }
`;