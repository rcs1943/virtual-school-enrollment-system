//#region Styles
import {
    Container 
} from "./styles";
//#endregion
//#region Utils
import { messageFailedLogin } from "../../../utils/validation";
//#endregion

const NoMatchMessageLogin = ({ 
    stateRequestLogin, 
    show 
}) => {
    return (
        show && 
            <Container>
                {messageFailedLogin[stateRequestLogin]}
            </Container>
    );
}

export default NoMatchMessageLogin;