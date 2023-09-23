//#region Libraries
import { 
    useState,
    useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    InputAdornment,
    IconButton
} from '@mui/material';
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
//#region Styles
import { 
    ContentFormSectionLogin
} from './styles';
//#endregion
//#region Components
import NoMatchMessageLogin from "../../../general/noMatchMessageLogin/NoMatchMessageLogin";
import CustomTextField from "../../../general/customTextField/CustomTextField";
import CustomButton from "../../../general/customButton/CustomButton";
//#endregion
//#region Utils
import useDidMount from '../../../../utils/hooks/useDidMount';
import { 
    regex, 
    fieldsHaveErrors  
} from '../../../../utils/validation';
//#endregion
//#region Services
import { loginAdmin, isLoggedAdmin } from '../../../../services/admin/auth';
//#endregion

const FormLogin = () => {
    //#region Extra hooks
    const didMount = useDidMount();
    //#endregion
    //#region States
    //#region Form
    const [form, setForm] = useState({
        user: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        user: false,
        password: false
    });
    //#endregion
    const [showPassword, setShowPassword] = useState(false);
    const [showNoMatchMessageLogin, setShowNoMatchMessageLogin] = useState(false);
    const [loadingLoginRequest, setLoadingLoginRequest] = useState(false);
    const [stateRequestLogin, setStateRequestLogin] = useState("");
    //#endregion
    //#region Effects
    useEffect(() => {
        validateField("user");
    }, [form.user]);
    useEffect(() => {
        validateField("password");
    }, [form.password]);
    //#endregion
    //#region Extra hooks
    const navigate = useNavigate();
    //#endregion
    //#region Functions
    const handleChangeTextField = (e, field) => {
        const { value } = e.target;
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
        showNoMatchMessageLogin && setShowNoMatchMessageLogin(false);
    }
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    }
    const validateField = (field) => {
        setErrors(prev => ({
            ...prev,
            [field]: !regex[field].test(form[field])
        }));
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if (fieldsHaveErrors(errors)) return;
        setLoadingLoginRequest(true);
        const response = await loginAdmin(form);
        setStateRequestLogin(response);
        if (isLoggedAdmin()) {
            console.clear();
            navigate("/admin/home");
        }
        else setShowNoMatchMessageLogin(true);
        setLoadingLoginRequest(false);
    }
    //#endregion
    if (!didMount) return null;
    return (
        <ContentFormSectionLogin onSubmit={handleLogin}>
            <section className="fields">
                <LoginTextFields
                    textFields={{
                        "user": {
                            type: "text", 
                            label: "Usuario",
                            helperText: "Deben haber de 8 a 16 caracteres.",
                            length: [8, 16] 
                        }, 
                        "password": {
                            type: showPassword ? "text" : "password",
                            label: "Contraseña",
                            helperText: "Deben haber entre 8 y 16 caracteres y al menos una mayúscula, una minúscula y un número.",
                            length: [8, 16], 
                            iconEnd: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        onClick={toggleShowPassword}>
                                            <Icon icon={showPassword 
                                                ? "ic:sharp-visibility-off"
                                                : "ic:round-visibility"} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                        }
                    }}
                    handleChangeTextField={handleChangeTextField}
                    form={form}
                    errors={errors}/>
            </section>
            <footer>
                <NoMatchMessageLogin 
                    show={showNoMatchMessageLogin}
                    stateRequestLogin={stateRequestLogin}/>
                <CustomButton 
                    type="submit"
                    text="INGRESAR"
                    className="secondary"
                    disabled={fieldsHaveErrors(errors) || loadingLoginRequest}
                    loading={loadingLoginRequest}/>
            </footer>
        </ContentFormSectionLogin>
    )
}

const LoginTextFields = ({ 
    textFields, 
    handleChangeTextField, 
    form,
    errors
}) => {
return (
    <>
        {Object.entries(textFields).map(([key, textField], idx)=> (
            <CustomTextField 
                key={idx}
                type={textField.type}
                label={textField.label}
                value={form[key]}
                onChange={(e) => handleChangeTextField(e, key)}
                onKeyPress={textField.onKeyPress && textField.onKeyPress}
                error={errors[key]}
                helperText={errors[key] && textField.helperText}
                inputProps={{
                    minLength: textField.length[0] && textField.length[0],
                    maxLength: textField.length[1] && textField.length[1]
                }} 
                InputProps={textField.iconEnd && {
                    endAdornment: textField.iconEnd
                }}/>
        ))}
    </>
);
}

export default FormLogin;