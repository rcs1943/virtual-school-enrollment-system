//#region Libraries
import styled from "styled-components";
//#endregion

export const MessageResolveRequest = styled.span`
    font-weight: bold;
    font-size: 16px;
    color: ${({ color }) => color};
    width: 300px;
`;
export const Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
    & footer {
        display: flex;
        align-items: center;
        gap: 10px;
        align-self: flex-end;
        width: max-content;
    }
    padding-bottom: 20px;
`;
export const Content = styled.section`
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 10px;
    width: 400px;
    padding: 20px 50px;
    border: 1px solid var(--fifth-color);
    border-radius: 30px;
    & .row {
        display: flex;
        row-gap: 50px;
        gap: 10px;
    }
    & .subtitle {
        font-weight: bold;
        font-size: 20px;
        color: var(--eight-color);
        margin: 10px 0;
    }
`;
export const ContainerDataField = styled.div`
    display: flex;
    flex-direction: column;
    width: 320px;
    gap: 10px;
    & .description {
        font-weight: bold;
    }
    & .value {
        margin-left: 20px;
    }
`;