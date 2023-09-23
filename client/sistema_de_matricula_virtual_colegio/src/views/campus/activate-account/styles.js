//#region Libraries
import styled from "styled-components";
import { Link } from 'react-router-dom';
//#endregion

export const ContainerSectionActivation = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-top: 70px;
`;
export const CardContainer = styled.article`
    display: flex;
    width: 70%;
    & div {
        display: flex;
        text-align: center;
        align-items: center;
        background-color: var(--secondary-2-color);
        padding: 0 60px;
        border-radius: 25px 0 0 25px;
        @media (max-width: 500px){
            padding: 0 30px;
        }
        & h5 {
            font-size: 15px;
            font-weight: 600;
        }
    }
    @media (max-width: 740px){
        width: 95%;
    }
`;
export const CustomButtonLink = styled(Link)`
    text-decoration: none !important;
`;
export const SuccessInfo = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #00000010;
    border-radius: 0 25px 25px 0;
    padding: 8px 15px;
    box-shadow: 5px 4px 4px 5px rgba(142, 142, 142, 0.1);
    gap: 3px;
    & footer {
        align-self: flex-end;
        padding: 0 15px 5px 0;
    }
    & footer button {
        width: 130px;
    }
    & .iconify {
        font-size: 45px;
        color: var(--verification);
    }
    & h4 {
        margin: 0;
    }
`;
export const Title = styled.h1`
    font-size: 26px;
    text-align: center;
    color: var(--seventh-color);
`;