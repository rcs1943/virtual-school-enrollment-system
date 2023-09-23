//#region Libraries
import styled from "styled-components";
//#endregion

export const Container = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
`;
export const Offset = styled.div`
    height: ${({ height }) => height};
`;
export const ContainerButtonAddRegister = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    box-shadow: 0 3px 5px 0 #00000066;
    background-color: var(--third-color);
    & button {
        display: flex;
        justify-content: space-between;
        width: 170px;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 0;
        cursor: pointer;
        transition: 0.5s;
        & .iconify, & span {
            color: var(--fifth-color);
            font-weight: bold;
            transition: 0.5s;
        }
        & .iconify {
            font-size: 35px;
        }
        &:hover {
            background-color: var(--nine-color);
        }
    }
`;