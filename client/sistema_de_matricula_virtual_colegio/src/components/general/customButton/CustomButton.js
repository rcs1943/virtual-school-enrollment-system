//#region Styles
import { StyledCustomLoader, StyledButton } from "./styles";
//#endregion

const CustomButton = ({ text, variant, loading, ...props }) => {
    return (
        <StyledButton 
            {...props}
            variant={variant || "contained"}>
            {loading && <StyledCustomLoader size={4} spacing={4}/>}
            <span style={{ 
                visibility: loading ? 'hidden' : 'visible',
                opacity: loading ? 0 : 1 }}>{text}</span>
        </StyledButton>
    );
}
export default CustomButton;