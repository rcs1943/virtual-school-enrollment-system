//#region Libraries
// import { 
//     useEffect  
// } from 'react';
//#endregion
//#region Styles
import { 
    ContainerEnrollmentDataInformation, 
    HeaderEnrollmentDataInformation, 
    ContentEnrollmentDataInformation, 
    ContainerDataDetail  } from './styles';
//#endregion

const getDataDetails = (data) => [
    [
        { description: "APELLIDOS Y NOMBRES", value: data.fullName },
        { description: "GRADO ACADÉMICO", value: data.grade },
        { description: "SECCIÓN", value: data.section },
        { description: "TURNO", value: data.shift },
    ], 
    [
        { description: "DOCUMENTO DE IDENTIDAD", value: data.dni },
        { description: "FECHA DE MATRÍCULA", value: data.date  },
    ]
];

const EnrollmentDataInformation = ({ dataInformation }) => {
    //#region States
    //#endregion
    return (
        <ContainerEnrollmentDataInformation>
            <HeaderEnrollmentDataInformation>
                <h2 className="custom-title-2">INFORMACIÓN DE MATRÍCULA</h2>
                <hr/>
            </HeaderEnrollmentDataInformation>
            <ContentEnrollmentDataInformation>
                {getDataDetails(dataInformation).map((column, idx1) => (
                    <div key={idx1} className="column">
                        {column.map((dataDetail, idx2) => (
                            <DataDetail
                                key={idx2} 
                                description={dataDetail.description}
                                value={dataDetail.value}/>
                        ))}
                    </div>
                ))}
            </ContentEnrollmentDataInformation>
        </ContainerEnrollmentDataInformation>
    );
}

const DataDetail = ({ description, value }) => {
    return (
        <ContainerDataDetail>
            <span className="description">{description}: </span>
            <span>{value}</span>
        </ContainerDataDetail>
    );
}

export default EnrollmentDataInformation;