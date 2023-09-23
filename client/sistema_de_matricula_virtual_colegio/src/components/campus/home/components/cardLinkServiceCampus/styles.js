//#region Libraries
import styled from "styled-components";
import { Link } from 'react-router-dom';
//#endregion

export const ContainerCardLinkServiceCampus = styled(Link)`
    text-decoration: none !important;
    display: flex;
    background-color: var(--third-color);
    flex-direction: column;
    padding: 30px;
    width: 300px;
    height: 190px;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #00000077;
    transition: 0.4s;
    &:hover {
        transform: scale(1.1);
    }
`;
export const HeaderCardLinkServiceCampus = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-bottom: 5px;
    height: 45%;
    border-bottom: 1px solid var(--sixth-color);
    & h4 {
        color: var(--fifth-color);
        font-size: 22px;    
    }
    & .iconify {
        font-size: 40px;
        color: var(--secondary-2-color);
    }
`;
export const DescriptionCardLinkServiceCampus = styled.p`
    margin: 0;
    margin-top: 10px;
    font-size: 14px;
    color: var(--sixth-color);
`;