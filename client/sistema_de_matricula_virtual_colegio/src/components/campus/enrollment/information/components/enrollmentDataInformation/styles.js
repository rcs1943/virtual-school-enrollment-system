import styled from 'styled-components';

export const ContainerEnrollmentDataInformation = styled.section`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;
export const HeaderEnrollmentDataInformation = styled.header`
    width: 100%;
    & h2 {
        text-align: center;
    }
    & hr {
        background-color: var(--fourth-color);
    }
`;
export const ContentEnrollmentDataInformation = styled.article`
    display: flex;
    justify-content: center;
    column-gap: 150px;
    row-gap: 25px;
    width: 100%;
    & .column {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
`;

export const ContainerDataDetail = styled.div`
    & .description {
        font-weight: bold;
    }
`;