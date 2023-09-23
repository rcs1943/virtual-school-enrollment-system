//#region Libraries
import styled from "styled-components";
//#endregion

export const ContainerLogoutBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: none;
    user-select: none;
    cursor: pointer;
    gap: 14px;
    border-radius: 14px;
    transition: 0.4s;
    padding: 10px 20px;
    margin-right: 30px;
    align-self: flex-end;
    z-index: 0;
    background-color: transparent;
    color: var(--third-color);
    &:hover {
        background-color: var(--secondary-2-color);
    }
    & .iconify, & span {
        transition: 0.35s;
    }
    & .iconify { font-size: 32px; }
    & span { font-size: 20px; }
    &.secondary {
        align-self: unset;
        background-color: var(--nine-color);
        & .iconify, & span {
            color: var(--fifth-color);
        }
        &:hover {
            background-color: var(--fifth-color);
            & .iconify, & span {
                color: var(--third-color);
            }
        }
    }
`;