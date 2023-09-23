import styled, { keyframes } from "styled-components";

const animContainer = keyframes`
    to {
      transform: rotate(360deg);
    }
`;
const animBall = keyframes`
    from {
        transform: scale(1.1);
    }
    to {
        transform: scale(1.3);
        background-color: #858585;
        transform: rotate(360deg);
    }
`;
export const Container = styled.div`
    display: flex;
    --size: calc(1px * ${props => props.size});
    gap: calc(1px * ${props => props.spacing});
    animation: linear ${animContainer} 0.5s infinite;
    margin: calc((1px * ${props => props.spacing}) + 2px);
`;
export const Ball = styled.span`
    background-color: #e0e0e0;
    width: var(--size);
    height: var(--size);
    border-radius: 100%;
    animation: linear ${animBall} 0.5s alternate-reverse infinite;
    &:nth-child(1) {
        animation-delay: 0.1s;
    }
    &:nth-child(2) {
        animation-delay: 0.2s;
    }
    &:nth-child(3) {
        animation-delay: 0.3s;
    }
`;