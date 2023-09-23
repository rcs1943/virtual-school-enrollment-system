//#regions Styles
import {
    ContainerFieldRepresentativeDetail, 
    ContainerRepresentativeDetail
} from "./styles";
//#endregion

const RepresentativeDetail = ({ data }) => {
    const dataRender = [
        {
            description: "NOMBRES Y APELLIDOS", 
            value: data.fullName 
        }, 
        {
            description: "CORREO ELECTRÓNICO", 
            value: data.email 
        }, 
        {
            description: "NÚMERO DE DNI",
            value: data.dni 
        }, 
        {
            description: "NÚMERO TELEFÓNICO",
            value: data.phone
        }, 
    ];
    return (
        <ContainerRepresentativeDetail>
            {dataRender.map((field, idx) => {
                return (
                    <FieldRepresentativeDetail
                        key={idx}
                        description={field.description}
                        value={field.value}/>
                );
            })}
        </ContainerRepresentativeDetail>
    );
}
export const FieldRepresentativeDetail = ({
    description, 
    value 
}) => {
    return (
        <ContainerFieldRepresentativeDetail>
            <span className="description">{description}:</span>
            <span>{value}</span>
        </ContainerFieldRepresentativeDetail>
    );
}

export default RepresentativeDetail;