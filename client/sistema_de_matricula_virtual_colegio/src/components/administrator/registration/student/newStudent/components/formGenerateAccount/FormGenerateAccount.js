//#region Libraries
import { 
    useState,
    useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
//#endregion
//#region Styles
import { 
	Container, 
    Content,
    ContainerDataField,
    MessageResolveRequest } from "./styles";
//#endregion
//#region Components
import CustomButton from '../../../../../../general/customButton/CustomButton';
//#endregion
//#region Services
import {
	generateStudentAccount 
} from "../../../../../../../services/admin/studentsRegister";
//#endregion

const FormGenerateAccount = ({ dataStudent }) => {
    //#region Extra hooks
    const navigate = useNavigate();
    //#endregion
    //#region States
	const [loadingSubmitRequest, setLoadingSubmitRequest] = useState(false);
	const [successfullyResponse, setSuccessfullyResponse] = useState(null);
    //#endregion
    //#region Functions
    const handleDoRequestSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmitRequest(true);
        const [payload, err] = await generateStudentAccount({ dni: dataStudent.dni })
        setLoadingSubmitRequest(false);
        if (err || !payload.data)
        {
            setSuccessfullyResponse(false);
            return;
        }        
        setSuccessfullyResponse(true);
        setTimeout(() => {
            navigate("/admin/registro/alumno");
        }, 5000);
    }
    //#endregion
    return (
        <Container onSubmit={handleDoRequestSubmit}>
            <h2 className="custom-title-2">GENERAR CUENTA</h2>
            <Content>
                <h3 className="subtitle">INFORMACIÓN</h3>
                <div className="row">
                    <DataField description="DNI" value={dataStudent.dni}/>
                    <DataField description="Alumno" value={dataStudent.fullName}/>
                </div>
                <div className="row">
                    <DataField description="Dirección" value={dataStudent.address}/>
                    <DataField description="Fecha de nacimiento" value={dataStudent.dateBirth}/>
                </div>
            </Content>
            <footer>
                {successfullyResponse === true 
                    ? <MessageResolveRequest color="var(--verification)">Cuenta creada con éxito, el link de activación de cuenta fue enviado al correo del apoderado.</MessageResolveRequest>
                    : successfullyResponse === false 
                        && <MessageResolveRequest color="var(--seventh-color)">Error inesperado al crear cuenta</MessageResolveRequest>
                }
				<CustomButton
					className="secondary"
					type="submit"
					text="Finalizar" 
					disabled={loadingSubmitRequest}
					loading={loadingSubmitRequest}
				/>
			</footer>
        </Container>
    );
}

const DataField = ({ description, value }) => {
    return (
        <ContainerDataField>
            <span className="description">{description}</span>
            <span className="value">{value}</span>
        </ContainerDataField>
    );
}

export default FormGenerateAccount;