import styled from "styled-components";

export const Container = styled.aside`
    position: fixed;
    height: 100vh;
    min-width: 280px;
    width: 25%;
    top: 0;
    left: 0;
    display: flex;
    background-color: var(--secondary-blue);
    z-index: 0;
    & ul {
        padding: 0;
        margin: 0;
        margin-top: 145px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`;

export const ContainerItemViewLink = styled.li`
    list-style: none;
    text-align: center;
    font-size: 18px;
    font-weight: 450;
    color: var(--third-color);
    border-right: 1px solid transparent;
    width: 100%;
    transition: 0.3s;
    cursor: default;
    padding: 28px;
    &.active {
        background-color: var(--third-color);
        color: var(--fifth-color);
        border-right-color: #00000033;
    }
    @media (max-width: 950px) {
        font-size: 16px;
    }
`;