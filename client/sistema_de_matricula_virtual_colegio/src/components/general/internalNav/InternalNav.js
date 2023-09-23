//#region Libraries
import { 
    useState, 
    useEffect 
} from 'react';
import { useLocation } from 'react-router';
//#endregion
//#region Styles
import { ContainerNav, NavLink, ArrowNav } from './styles';
//#endregion

const InternalNav = ({ information = [
            { path: "", nameRoute: "" }
        ] 
    }) => {
    //#region Extra Hooks
    const location = useLocation();
    //#endregion
    //#region States
    const [currentPath, setCurrentPath] = useState(0);
    //#endregion
    //#region Effects
    useEffect(() => {
        setCurrentPath((prev) => {
            const { pathname } = location;
            for (const idx in information) {
                const currentPath = information[idx].path;
                if (areEquals(currentPath, pathname)) 
                    return Number(idx);
            }
            return prev;
        });
    }, [location.pathname]);
    //#endregion
    //#region Functions
    const areEquals = (currentPath, pathname) => {
        console.log();
        return pathname === currentPath || pathname === `${currentPath}/`;
    }
    //#endregion
    return (
        <ContainerNav>
            <ul>
                {
                (currentPath <= 0 
                ? [information[0]] 
                : [...information]).map((row, idx) => (
                        <InternalNavLink key={idx}
                            text={row.nameRoute}
                            to={row.path}
                            end={
                                currentPath === idx || 
                                (currentPath >= information.length 
                                && idx === information.length - 1)
                            }/>
                    ))
                    .filter((_, idx) => idx < currentPath + 1)
                }
            </ul>
        </ContainerNav>
    );
}

const InternalNavLink = ({ text, to, end }) => {
    return (
        <>
            <li><NavLink to={to}>{text}</NavLink></li>
            {!end && <ArrowNav>{">"}</ArrowNav>}
        </>
    );
}

export default InternalNav;