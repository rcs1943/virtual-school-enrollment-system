//#region Libraries
import styled, { keyframes } from "styled-components";
//#endregion

const brightnessAnimation = keyframes`
    to {
        filter: brightness(200%);
    }
`;

export const Container = styled.span`
    color: var(--seventh-color);
    font-weight: bold;
    margin: 5px 0 0;
    font-size: 15px;
    filter: brightness(90%);
    animation: linear ${brightnessAnimation} 0.5s alternate-reverse infinite;
`;