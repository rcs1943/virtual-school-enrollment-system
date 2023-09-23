import { StyledTextField } from './styles';

const CustomTextField = (props) => {
    return (
        <StyledTextField 
            {...props}
            autoComplete="false"
            variant="filled"/>
    );
}

export default CustomTextField;