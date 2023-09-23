//#region Libraries
import styled from "styled-components";
//#endregion

export const ContainerSectionEnrollment = styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 58.95px;
    align-items: center;

    & .ok-btn {
        background-color: var(--seventh-color);
        width: 200px;
        font-size: 24px;
        border-radius: 8px;
    }
    & .ok-btn:hover {
        background-color: var(--seventh-color-dark);
    }
    & .ok-btn:active {
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    
`;
export const TaskInfo = styled.article`
    padding: 40px 280px 0 320px;
    & h3 {
        color: var(--secondary-blue);
        font-weight: 600;
        font-size: 24px;
    }
    & p {
        font-size: 22px;
    }
    @media (max-width: 1300px) {
        padding: 40px 200px 0 200px;
    }
    @media (max-width: 900px) {
        padding: 40px 100px 0 100px;
    }
    @media (max-width: 650px) {
        padding: 40px 20px 0 20px;
    }
`