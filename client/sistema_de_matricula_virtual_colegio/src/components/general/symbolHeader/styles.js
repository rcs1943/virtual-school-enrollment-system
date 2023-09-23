//#region Libraries
import styled from "styled-components";
//#endregion

export const ContainerHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
    position: fixed;
    &.campus {
        padding: 10px 60px;
        background-color: var(--fourth-color);
        top: 0;
        left: 0;
    }
    &.admin {
        padding: 20px 60px;
        background-color: var(--third-color);
        z-index: 1000;
    }
    &.no-fixed { position: relative; }
    & > h1 {
        margin: 0;
        width: 25%;
    }
    @media (max-width: 700px) { flex-direction: column; }
`;
export const Title = styled.a`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 30px;
    & img {
        width: 40px;
    }
    & h3 {
        font-weight: normal;
        margin: 0;
    }
`;
