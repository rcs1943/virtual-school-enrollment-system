//#region Libraries
import styled from "styled-components";
//#endregion

export const ContainerProfile = styled.article`
    position: relative;
    align-self: flex-end;
    margin-right: 20px;
    z-index: 0;
    & .icons {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
    }
    & h3 { font-weight: normal; }
    & .iconify {
        color: var(--fourth-color);
        font-size: 45px;
        cursor: pointer;
    }
    & .content:hover {
        background-color: var(--secondary-blue);
    }
`;
export const ContentProfile = styled.article`
    display: flex;
    align-items: center;
    padding: 5px 20px;
    gap: 15px;
    cursor: pointer;
    user-select: none;
    transition: 0.35s;
    z-index: 0;
    & span { font-weight: 500; }
    & .iconify.arrow {
        font-size: 11px;
        transition: 0.35s;
    }
    & .iconify.arrow.up {
        transform: rotate(180deg);
    }
    &:hover {
        background-color: var(--secondary-blue);
    }
    &.only {
        border-radius: 10px;
        align-self: flex-end;
        & span {
            color: var(--eight-color);
        }
        & .icons .iconify {
            color: var(--eight-color);
        }
    }
    &.only:hover {
        background-color: var(--fourth-color);
    }
`
export const ContainerLogoutBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #f8f8f8;
    cursor: pointer;
    gap: 14px;
    user-select: none;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    transition: 0.25s;
    position: absolute;
    width: 100%;
    padding: 10px;
    top: 110%;
    right: 0;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    z-index: -1;
    &:hover {
        background-color: #e3e3e3;
    }
    & .iconify {
        color: #000000;
        font-size: 32px;
    }
    & span {
        font-size: 20px;
    }
    &.active {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }
`;