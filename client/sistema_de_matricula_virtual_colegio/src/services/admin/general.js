//#region Services
import { doRequest } from '../helpers';
import { getTokenAdmin, isLoggedAdmin } from './auth';
//#endregion

//#region Main
export const doRequestAdmin = async (endpoint, method, body) => {
    return await doRequest(
        endpoint, method, 
        body, { 
            isLogged: isLoggedAdmin,
            token: getTokenAdmin()
        });
}
//#endregion