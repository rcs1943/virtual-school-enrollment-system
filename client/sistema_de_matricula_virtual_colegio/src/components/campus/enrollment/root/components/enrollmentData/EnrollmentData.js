//#region Libraries
import { 
    useState 
} from 'react';
//#endregion
//#region Styles
import { 
    ContainerDataField, 
    ContainerEnrollmentData,
    FrameEnrollmentData, 
    ContentEnrollmentData,  
    SelectSection,
    MenuItemSection
} from './styles';
//#endregion

const DataField = ({ className, input, description, value }) => {
    return (
        <ContainerDataField className={className}>
            <span className="description">{description}</span>
            {input ? input : <span className="value">{value}</span>}
        </ContainerDataField>
    );
}

const EnrollmentData = ({ 
        information, 
        sections,
        changeSection 
}) => {
    //#region States
    //#endregion
    //#region Functions
    const getStudentDataDetail = (data) => [
        [
            { description: "Apellidos y Nombres", value: data.fullName },
            { description: "DNI", value: data.dni },
        ]
    ];
    const getEnrollmentDataDetail = (data) => [
        [
            { description: "Grado", value: data.grade.name },
            { 
                description: "Sección", 
                input: (
                    <SelectSection 
                        value={data.codeSection} 
                        onChange={(e) => {
                            const codeSection = Number(e.target.value);
                            changeSection(
                                sections.find(
                                    section => section.code === codeSection
                                )
                            );
                        }}>
                        <MenuItemSection 
                            value={0} 
                            disabled>- SECCIÓN -</MenuItemSection>
                        {sections.map((section, idx) => (
                            <MenuItemSection 
                                key={idx} 
                                value={section.code}>
                                {section.letter}
                            </MenuItemSection>
                        ))}
                    </SelectSection>
                )
            },
            { description: "Turno", value: data.shiftCategory }
        ]
    ];
    //#endregion
    return (
        <ContainerEnrollmentData>
            <FrameEnrollmentData>
                <section className="content">                    
                    <h3>DATOS DEL ALUMNO</h3>
                    <ContentEnrollmentData>
                        {getStudentDataDetail(information).map((column, idx1) => (
                            <div key={idx1} className="row">
                                {column.map((dataDetail, idx2) => (
                                    <DataField
                                        key={idx2}
                                        description={dataDetail.description}
                                        value={dataDetail.value}/>
                                ))}
                            </div>
                        ))}
                    </ContentEnrollmentData>
                </section>
                <section className="content">                    
                    <h3>MATRÍCULA</h3>
                    <ContentEnrollmentData>
                        {getEnrollmentDataDetail(information)
                            .map((column, idx1) => (
                            <div key={idx1} className="row">
                                {column.map((dataDetail, idx2) => (
                                    <DataField
                                        key={idx2}
                                        description={dataDetail.description}
                                        value={dataDetail.value && dataDetail.value}
                                        input={dataDetail.input && dataDetail.input}/>
                                ))}
                            </div>
                        ))}
                    </ContentEnrollmentData>
                </section>
            </FrameEnrollmentData>
        </ContainerEnrollmentData>
    )
}

export default EnrollmentData;