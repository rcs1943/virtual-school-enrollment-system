//#region Libraries
import styled from "styled-components";
//#endregion
//#region Components
import CustomButton from "../../../../general/customButton/CustomButton";
//#endregion

export const Container = styled.section`
    margin: 0 30px;
    margin-bottom: 40px;
    width: 80%;
`;
export const Title = styled.h1`
    font-size: 18px;
`;
export const DetailRow = styled.span`
    color: var(--secondary-blue);
    text-decoration: underline;
    font-weight: bold;
    font-size: 16px;
    transition: 0.35s;
    cursor: pointer;
    &:hover {
        filter: brightness(130%);        
    }
`;
export const Content = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const widthButtonChangePage = "100px";
export const FooterDataTable = styled.footer`
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    .offset {
        width: ${widthButtonChangePage};
    }
`;
export const ButtonChangePage = styled(CustomButton)`
    font-size: 10px;
    width: ${widthButtonChangePage};
`;
export const IndexerPages = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: var(--eight-color);
`;