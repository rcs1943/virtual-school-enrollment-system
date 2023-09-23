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
//#region Styles
import { 
    ContentFormSectionLogin,
    IsNewStudent
} from './styles';
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
//#region Components
import DialogAlert from '../../../general/dialogAlert/DialogAlert';
import NoMatchMessageLogin from "../../../general/noMatchMessageLogin/NoMatchMessageLogin";
import CustomTextField from '../../../general/customTextField/CustomTextField';
import CustomButton from '../../../general/customButton/CustomButton';
//#endregion
//#region Utils
import useDidMount from '../../../../utils/hooks/useDidMount';
import { 
    regex,
    fieldsHaveErrors, 
    handleKeyPressOnlyNumbers
} from '../../../../utils/validation';
//#endregion
//#region Services
import { 
    loginStudent, 
    isLoggedStudent } from '../../../../services/campus/auth';
import { 
    getDetailCampusRequest,  
    setDetailCampus 
} from '../../../../services/campus/student';
//#endregion

const FormLogin = () => {
    //#region Extra hooks
    const didMount = useDidMount();
    //#endregion
    //#region States
    //#region Form
    const [form, setForm] = useState({
        dni: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        dni: false,
        password: false
    });
    //#endregion
    const [showPassword, setShowPassword] = useState(false);
    const [showDialogRememberRegister, setShowDialogRememberRegister] = useState(false);
    const [showNoMatchMessageLogin, setShowNoMatchMessageLogin] = useState(false);
    const [loadingLoginRequest, setLoadingLoginRequest] = useState(false);
    const [stateRequestLogin, setStateRequestLogin] = useState("");
    //#endregion
    //#region Effects
    useEffect(() => {
        validateField("dni");
    }, [form.dni]);
    useEffect(() => {
        validateField("password");
    }, [form.password]);
    useEffect(() => {
        if (localStorage.getItem("alreadyRememberRegister")) 
            return;
        setShowDialogRememberRegister(true);
        localStorage.setItem("alreadyRememberRegister", "true");
    }, []);
    //#endregion
    //#region Extra hooks
    const navigate = useNavigate();
    //#endregion
    //#region Functions
    const validateField = (field) => {
        setErrors(prev => ({
            ...prev,
            [field]: !regex[field].test(form[field])
        }));
    }
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
    const toggleShowDialogRememberRegister = () => {
        setShowDialogRememberRegister(prev => !prev);
    }
    const saveDetailStudent = async (dni) => {
        const [payload, err] = await getDetailCampusRequest(dni);
        if (!err && payload.data) {
            const { data } = payload;
            setDetailCampus({
                codeStudent: data.code,
                fullName: `${data.fatherSurname} ${data.motherSurname}, ${data.name}`, 
                dni
            });
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if (fieldsHaveErrors(errors)) return;
        setLoadingLoginRequest(true);
        const response = await loginStudent(form);
        setStateRequestLogin(response);
        if (isLoggedStudent()) {
            await saveDetailStudent(form.dni);
            console.clear();
            navigate("/campus/home");
        }
        else setShowNoMatchMessageLogin(true);
        setLoadingLoginRequest(false);
    }
    //#endregion
    if (!didMount) return null;
    return (
        <ContentFormSectionLogin 
            onSubmit={handleLogin}>
            <section className="fields">
                <LoginTextFields
                    textFields={{
                        "dni": {
                            type: "text", 
                            label: "Número de DNI",
                            helperText: "Deben haber 8 dígitos numéricos.",
                            onKeyPress: handleKeyPressOnlyNumbers,
                            length: [8, 8] 
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
                    disabled={fieldsHaveErrors(errors) || loadingLoginRequest}
                    text="Ingresar"
                    loading={loadingLoginRequest}/>
                <IsNewStudent>
                    <span className="description">¿Eres nuevo?</span>
                    <span 
                        className="open-dialog"
                        onClick={toggleShowDialogRememberRegister}>Presiona aquí</span>
                </IsNewStudent>
            </footer>
            <DialogAlert 
                open={showDialogRememberRegister} 
                handleOpen={toggleShowDialogRememberRegister}
                title="¡RECUERDA!"
                icons="ci:error-outline"
                buttons={[
                    () => <a 
                        href="http://victor-manuel-maurtua.edu.pe.devel/admision"
                        target="_blank">
                        <CustomButton
                            variant="outlined"
                            text="VER MÁS"/>
                    </a>,
                    () => <CustomButton
                        variant="outlined"
                        onClick={() => setShowDialogRememberRegister(false)}
                        text="Cerrar"/>
                ]}
                description={
                    <ul>
                        <li>Para poder iniciar sesión debes haber presentado los documentos solicitados  en la instución.</li>
                        <li>Se te asiganará un código de estudiante y contraseña que serán enviados a tu correo electrónico. </li>
                        <li>Con los datos generados ya podrás iniciar sesión.</li>
                    </ul>
                }/>
        </ContentFormSectionLogin>
    );
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