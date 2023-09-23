//#region Libraries
import styled from "styled-components";
//#endregion

export const ContainerSectionLogin = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 100vh;
    row-gap: 20px;
    column-gap: 100px;
    margin: 15px;
    margin-top: 15px;
    margin-bottom: 10px;
    @media (max-width: 820px) {
        margin: 120px 15px;
    }
    & img {
        @media (max-width: 820px) {
            width: 400px;
        }
    }
`;
export const ContentSectionLogin = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
    width: 300px;
`;
export const ContentHeaderSectionLogin = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    & .custom-title-2 {
        margin: 10px 0;
    }
`;