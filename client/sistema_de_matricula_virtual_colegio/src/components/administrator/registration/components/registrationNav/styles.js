//#region Libraries
import { 
    Link 
} from "react-router-dom";
import styled from "styled-components";
//#endregion

export const ContainerNav = styled.nav`
    background-color: var(--fourth-color);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    & li {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export const StyledLink = styled(Link)`
    width: 200px;
    padding: 25px 0px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: var(--fifth-color);
    transition: 0.4s;
    &.active, &:hover {
        background-color: var(--seventh-color);
        color: var(--third-color);
    }
`;