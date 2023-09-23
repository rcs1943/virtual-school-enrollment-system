//#region Libraries
import styled from "styled-components";
//#endregion

export const ContainerMessage = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    & .iconify{
        font-size: 45px;
        &.update-result-message {
            font-size: 25px;
        }
        &.form-new-student-message {
            font-size: 20px;
        }
    }
`;
export const Message = styled.h3`
    color: ${({ color }) => color};
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 20px;
    &.update-result-message {
        font-size: 16px;
    }
    &.form-new-student-message {
        font-size: 14px;
    }
`;
