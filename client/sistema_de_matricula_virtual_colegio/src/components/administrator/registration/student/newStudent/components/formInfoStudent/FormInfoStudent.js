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
	CustomInputDate } from "./styles";
import { 
	Container,
	Content, 
	ContentGroup, 
	StyledIcon } from "../components/styles";
//#endregion
//#region Components
import CustomTextField from '../../../../../../general/customTextField/CustomTextField';
import CustomButton from '../../../../../../general/customButton/CustomButton';
import PopupMessage from "../../../../../../general/popupMessage/PopupMessage";
//#endregion
//#region Utils
import { 
	fieldsHaveErrors, 
	handleKeyPressOnlyNumbers, 
	regex } from "../../../../../../../utils/validation";
import { getTimeMillis } from "../../../../../../../utils/date";
//#endregion
//#region Services
import {
	addStudent 
} from "../../../../../../../services/admin/studentsRegister";
//#endregion

const regexForm = {
	dni: regex.dni, 
	name: regex.name,
	fatherSurname: regex.surname,
	motherSurname: regex.surname, 
	address: regex.address,
    dateBirth: regex.date 
}
const IconField = ({ icon }) => {
	return (
		<InputAdornment position="start">
			<StyledIcon icon={icon}/>
		</InputAdornment>
	);
}
const ResolveMessage = ({ show, error = true, message }) => {
	return (
		show && 
		<PopupMessage
			className="form-new-student-message"
			color={error ? "var(--seventh-color)" : "var(--verification)"} 
			message={message}
			iconName={error ? "clarity:error-line" : "bi:check-circle-fill"}/>
	);
}
const typeStateResponse = {
	ADDED: "ADDED", 
	EXISTS: "EXISTS",
	ERROR: "ERROR"
};

const FormInfoStudent = ({
    nextForm, 
    dniRepresentative 
}) => {
    //#region States
    const [form, setForm] = useState({
        dni: "",
        name: "",
        fatherSurname: "",
        motherSurname: "",
		address: "",
        dateBirth: { 
            strValue: "",
            value: 0
        }
    });
    const [errors, setErrors] = useState({
        dni: false,
        name: false,
        fatherSurname: false,
        motherSurname: false, 
		address: false, 
        dateBirth: false 
    });
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [currentField, setCurrentField] = useState(null);
	const [loadingSubmitRequest, setLoadingSubmitRequest] = useState(false);
	const [stateResponse, setStateResponse] = useState("");
    //#endregion
    //#region Effects
	useEffect(() => {
		// Iniciando valores de error en el form
		Object.keys(errors).forEach(key => validateField(key));
	}, []);
	useEffect(() => {
		if (!currentField)
			return;
		validateField(currentField);
	}, [form[currentField]]);
	//#endregion
    //#region Functions
    const validateField = (field) => {
        setErrors(prev => ({
            ...prev,
            [field]: !regexForm[field].test(field === "dateBirth" ? form[field].strValue : form[field])
        }));
    }
    const resetFlow = () => {
		if (!showErrorMessage) return;
		setShowErrorMessage(false);
		setStateResponse("");
	}
    const handleChangeField = (value, field) => {
        resetFlow();
        setCurrentField(field);
        if (field !== "dateBirth") {
            setForm(prev => ({
                ...prev,
                [field]: value
            }));
            return;
        }
        setForm(prev => ({
            ...prev,
            [field]: {
                strValue: value, 
                value: getTimeMillis(value)
            }
        }));
    }
    //#endregion
	const getResolveMessage = () => {
		return ({
			[typeStateResponse.EXISTS]: `El estudiante con dni ${form.dni}, ya está registrado`, 
			[typeStateResponse.ERROR]: "Ocurrió un error inesperado al enviar los datos" 
		})[stateResponse];
	}
	const handleDoRequestSubmit = async (e) => {
        e.preventDefault();
        const { dateBirth, ...restForm } = form;
        setLoadingSubmitRequest(true);
        const [payload, err] = await addStudent({
            ...restForm, 
            dateOfBirth: dateBirth.value, 
            dniRepresentative
        });
		setLoadingSubmitRequest(false);
		setShowErrorMessage(true);
        if (err || !payload.data) {
			setStateResponse(typeStateResponse.ERROR);
			return;
		}
        const { stateInsert } = payload.data;
        if (stateInsert === "STU_EXI") {
            setStateResponse(typeStateResponse.EXISTS);
            return;
        }
		// nextForm();
        setShowErrorMessage(false);
		setStateResponse(typeStateResponse.ADDED);
		nextForm({
            fullName: `${form.fatherSurname} ${form.motherSurname}, ${form.name}`, 
            dni: form.dni,
            address: form.address, 
            dateBirth: form.dateBirth.strValue
        });
	}

    return (
        <Container onSubmit={handleDoRequestSubmit}>
			<Content className="fields">
				<ContentGroup>
					<Fields 
						textFields={{
							dni: {
								type: "text",
								label: "Número de DNI",
								helperText: "Deben haber 8 dígitos numéricos",
								length: [8, 8],
								onKeyPress: handleKeyPressOnlyNumbers, 
								icon: <IconField icon="bxs:id-card"/>
							},
							fatherSurname: {
								type: "text",
								label: "Apellido Paterno",
								helperText: "Debe haber 1 y 25 caracteres",
								length: [1, 25],
								icon: <IconField icon="bi:person-square"/>
							},
                            address: {
								type: "text",
								label: "Dirección",
								helperText: "Debe haber entre 5 y 50 caracteres como máximo",
								length: [8, 50], 
								icon: <IconField icon="entypo:address"/>
							}, 
						}}
						handleChangeField={handleChangeField}
						form={form}
						errors={errors}/> 
				</ContentGroup>
				<ContentGroup>
					<Fields
						textFields={{
							name: {
								type: "text",
								label: "Nombres",
								helperText: "Debe haber 1 y 50 caracteres",
								length: [1, 50],
								icon: <IconField icon="bi:person-square"/>
							},
							motherSurname: {
								type: "text",
								label: "Apellido Materno",
								helperText: "Debe haber 1 y 25 caracteres",
								length: [1, 25],
								icon: <IconField icon="bi:person-square"/>
							} 
						}}
						handleChangeField={handleChangeField}
						form={form}
						errors={errors}/>
                    <CustomInputDate 
                        type="date" 
                        value={form.dateBirth.strValue}
                        onChange={(e) => handleChangeField(e.target.value, "dateBirth")}
                        min="2005-01-01"
                        max="2010-12-31"/>
				</ContentGroup>
			</Content>
			<footer>
				<ResolveMessage 
					show={showErrorMessage}
					error={true}
					message={getResolveMessage(stateResponse)}/>
				<CustomButton
					className="secondary"
					type="submit"
					disabled={fieldsHaveErrors(errors) || loadingSubmitRequest}
					text="Siguiente"
					loading={loadingSubmitRequest}
				/>
			</footer>
		</Container>
    );
}    


const Fields = ({
	textFields,
	handleChangeField,
	form,
	errors,
}) => {
	return (
		<>
			{Object.entries(textFields).map(([key, textField], idx) => (
				<CustomTextField
					key={idx}
					className="registration"
					type={textField.type}
					label={textField.label}
					value={form[key]}
					onChange={(e) => handleChangeField(e.target.value, key)}
					onKeyPress={textField.onKeyPress && textField.onKeyPress}
					error={errors[key]}
					helperText={errors[key] && textField.helperText}
					inputProps={{
						minLength: textField.length[0] && textField.length[0],
						maxLength: textField.length[1] && textField.length[1],
					}}
					InputProps={
						textField.icon && {
							startAdornment: textField.icon,
						}
					}/>
			))}
		</>
	);
};

export default FormInfoStudent;