import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    width: 70%;
    height: 60vh;
    overflow-y: scroll;
    @media (max-width: 900px) {
        width: 60%;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent
    }
`;
export const Content = styled.section`
    align-self: center;
    width: 100%;
`;