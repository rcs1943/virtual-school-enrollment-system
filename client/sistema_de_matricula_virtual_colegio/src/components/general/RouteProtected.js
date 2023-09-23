import { Navigate } from 'react-router-dom';
import { isLoggedStudent } from '../../services/campus/auth';
import { isLoggedAdmin } from '../../services/admin/auth';

const RenderRouteProtected = ({
    children, 
    renders, 
    to 
}) => {
    return renders  
        ? children  
        : <Navigate to={to} replace={true}/>;
}

const RouteProtected = ({ 
    element, 
    isLogged, 
    rootPath, reverse 
}) => {
    const props = {
        renders: reverse ? !isLogged() : isLogged(), 
        to: `${rootPath}/${reverse ? "home" : "login"}` 
    };
    return (
        <RenderRouteProtected {...props}>
            {element}
        </RenderRouteProtected>
    );
}
export const RouteProtectedStudent = ({ children, reverse = false }) => {
    return (
        <RouteProtected 
            rootPath="/campus" element={children} 
            reverse={reverse} 
            isLogged={isLoggedStudent}/>
    );
}
export const RouteProtectedAdmin = ({ children, reverse = false }) => {
    return (
        <RouteProtected 
            rootPath="/admin" element={children} 
            reverse={reverse} 
            isLogged={isLoggedAdmin}/>
    );
}