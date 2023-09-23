//#region Libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment, IconButton } from "@mui/material";
//#endregion
//#region Styles
import { 
	Container,
	Content, 
	ContentGroup, 
	StyledIcon } from "../components/styles";
//#endregion
//#region Components
import CustomTextField from "../../../../../../general/customTextField/CustomTextField";
import CustomButton from "../../../../../../general/customButton/CustomButton";
import PopupMessage from "../../../../../../general/popupMessage/PopupMessage";
//#endregion
//#region Utils
import { 
	fieldsHaveErrors, 
	handleKeyPressOnlyNumbers, 
	regex } from "../../../../../../../utils/validation";
//#endregion
//#region Services
import {
	addRepresentative
} from "../../../../../../../services/admin/studentsRegister";
//#endregion

const regexForm = {
	dni: regex.dni, 
	name: regex.name,
	fatherSurname: regex.surname,
	motherSurname: regex.surname,
	phone: regex.phone,
	email: regex.email 
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

const FormInfoRepresentative = ({
	nextForm 
}) => {
	//#region States
	const [form, setForm] = useState({
		dni: "",
		name: "",
		fatherSurname: "",
		motherSurname: "",
		phone: "",
		email: "" 
	});
	const [errors, setErrors] = useState({
		dni: false,
		fatherSurname: false,
		name: false,
		motherSurname: false,
		phone: false,
		email: false,
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
            [field]: !regexForm[field].test(form[field])
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
		setForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};
	const getResolveMessage = () => {
		return ({
			[typeStateResponse.EXISTS]: `El apoderado con dni ${form.dni}, ya está registrado ¿Desea continuar con sus datos?`, 
			[typeStateResponse.ERROR]: "Ocurrió un error inesperados al enviar los datos" 
		})[stateResponse];
	}
	const handleDoRequestSubmit = async (e) => {
        e.preventDefault();
		if (stateResponse === typeStateResponse.EXISTS)
			nextForm(form.dni);
		setLoadingSubmitRequest(true);
		const [payload, err] = await addRepresentative(form);
		setLoadingSubmitRequest(false);
		setShowErrorMessage(true);
		if (err || !payload.data) {
			setStateResponse(typeStateResponse.ERROR);
			return;
		}
		const { data } = payload;
		if (data.representativeExists) {
			setStateResponse(typeStateResponse.EXISTS);
			return;
		}
		if (!data) {
			setStateResponse(typeStateResponse.ERROR);
			return;
		}
		setShowErrorMessage(false);
		setStateResponse(typeStateResponse.ADDED);
		nextForm(form.dni);
	}
	//#endregion
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
							email: {
								type: "email", 
								label: "Correo electrónico", 
								helperText: "El correo no tiene el formato correcto o no tiene entre 5 y 50 caracteres",
								length: [5, 50], 
								icon: <IconField icon="ic:baseline-email"/>
							}
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
							}, 
							phone: {
								type: "tel",
								label: "Teléfono / Celular",
								helperText: "Debe tener 9 dígitos",
								length: [9, 9],
								onKeyPress: handleKeyPressOnlyNumbers,
								icon: <IconField icon="bxs:phone"/>
							},
						}}
						handleChangeField={handleChangeField}
						form={form}
						errors={errors}/>
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
};

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

export default FormInfoRepresentative;
