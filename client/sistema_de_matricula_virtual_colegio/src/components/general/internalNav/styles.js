//#region Libraries
import styled from "styled-components";
import { Link } from 'react-router-dom';
//#endregion

export const ContainerNav = styled.nav`
    & ul {
        display: flex;
        align-items: center;
        gap: 10px;
        list-style: none;
        margin: 30px;
        padding: 0;
    }
`;
export const NavLink = styled(Link)`
    color: var(--secondary-2-color) !important;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
        color: var(--seventh-color) !important;
    }
`;
export const ArrowNav = styled.span`
    color: var(--seventh-color);
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 4px;
`;
