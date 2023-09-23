//#region Libraries
import { 
    Checkbox,
    FormControlLabel 
} from '@mui/material';
//#endregion

const CustomCheckbox = ({ 
    label,
    checked,
    onChange,
}) => {
    return (
        <FormControlLabel
            control={
                <Checkbox 
                    checked={checked && checked} 
                    onChange={onChange && onChange} />
            }
            label={label && label}/>
    );
}

export default CustomCheckbox;