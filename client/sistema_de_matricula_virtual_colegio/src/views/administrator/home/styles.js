//#region Libraries
import styled from "styled-components";
//#endregion

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-between;
    justify-content: center;
    gap: 10px;
`;
export const Divider = styled.section`
    width: 92%;
    border-top: 4px solid var(--secondary-2-color);
`;
export const ContainerLinks = styled.article`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 550px;
    flex-wrap: wrap;
    @media (max-width: 600px) {
        width: max-content;
        flex-direction: column;
    }
`;
export const Title = styled.h1`
    font-size: 30px;
    text-align: center;
`;