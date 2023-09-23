//#region Services
import { doRequest } from '../helpers';
import { getTokenStudent, isLoggedStudent } from './auth';
//#endregion

//#region Main
export const doRequestCampus = async (endpoint, method, body) => {
    return await doRequest(
        endpoint, method, 
        body, { 
            isLogged: isLoggedStudent,
            token: getTokenStudent()
        });
}
//#endregion