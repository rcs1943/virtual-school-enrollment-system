//#region Libraries
import styled from "styled-components";
//#endregion

export const ContentSectionLogin = styled.article`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    background-color: var(--third-color);
    padding: 40px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    width: 440px;
    margin-top: 25vh;
    @media (min-width: 450px) {
        margin-bottom: 100px;
    }
    @media (max-width: 800px) { width: 70%; }
    @media (max-width: 600px) { width: 90%; }
    & h2 {
        margin-top: 55px;
        margin-bottom: 30px;
    }
`;
export const AdminImgContainer = styled.div`
    position: absolute;
    top: -18%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--fourth-color);
    border-radius: 50%;
    padding: 25px;
    box-shadow: 5px 5px 10px 0px #00000040;
    & img {
        width: 100px;
    }
`;
