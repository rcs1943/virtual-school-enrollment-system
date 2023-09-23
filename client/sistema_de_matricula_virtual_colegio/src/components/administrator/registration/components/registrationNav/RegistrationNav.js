//#region Libraries
import { useEffect, useState } from "react";
//#endregion
//#region Styles
import {
    ContainerNav, 
    StyledLink 
} from "./styles";
//#endregion
//#region Components
import LogoutBtn from "../../../components/logoutBtn/LogoutBtn";
//#endregion

const RegistrationNav = ({ infoRoutes = [], location }) => {
    //#region Effects
    useEffect(() => {
        handlerActiveRegistrationLinks();
    }, [location.pathname]);
    //#endregion
    //#region States
    const [activeRegistrationLinks, setActiveRegistrationLinks] = useState([]);
    //#endregion
    //#region Functions
    const handlerActiveRegistrationLinks = () => {
        const newActive = infoRoutes
            .map(route => location.pathname
                .includes(`/admin/registro/${route.path}`));
        setActiveRegistrationLinks(newActive);
    }
    //#endregion
    return (
        <ContainerNav>
            <ul>
                {infoRoutes.map((route, idx) => (
                    <li key={idx}>
                        <RegistrationLink 
                            to={route.path}
                            text={route.nameRoute}
                            active={activeRegistrationLinks[idx]}/>
                    </li>
                ))}
            </ul>
            <LogoutBtn className="secondary"/>
        </ContainerNav>
    );
};

const RegistrationLink = ({ 
        to, text, active = false 
    }) => {
    return (
        <StyledLink 
            to={`/admin/registro/${to}`}
            className={active ? "active" : ""}>{text}</StyledLink>
    );
}

export default RegistrationNav;