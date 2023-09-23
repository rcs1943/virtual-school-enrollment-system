import {  
    StyledContainerTable, 
    StyledCaptionTable, 
    StyledTableRow,
    StyledTableCell,
    StyledInputTable,
    ContainerInputTable 
} from './styles';
import { 
    Table, 
    TableRow, 
    TableBody, 
    TableHead 
} from '@mui/material';

const CustomDataTable = ({ 
    className, 
    caption, 
    fields = ["Campo 1"], 
    rows = [{ "field1": "Valor 1" }], 
    width  = "98%"
}) => {
  return (
    <StyledContainerTable className={className} width={width}>
      <Table sx={{ minWidth: 500 }}>
        {caption && <StyledCaptionTable>{caption}</StyledCaptionTable>}
        <TableHead>
            <TableRow>
                {fields && fields.map((field, idx) => (
                    <StyledTableCell 
                        className={className} 
                        key={idx}>{field}</StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows && rows.map((row, idx) => (
                <StyledTableRow 
                    key={idx}>
                    {Object.entries(row).map(([key, value]) => (
                        <StyledTableCell 
                            key={key}
                            className={className}>
                            {value}
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </StyledContainerTable>
  );
}

export const InputTable = ({ 
    type = "text", 
    value, 
    disabled, 
    onChange, 
    onBlur, 
    onDoubleClick,
    min, 
    max,
    maxLength, 
    onKeyPress 
}) => {
    return (
        <ContainerInputTable onDoubleClick={onDoubleClick}>
            <StyledInputTable 
                type={type}
                min={min}
                max={max}
                maxLength={maxLength}
                disabled={disabled}
                value={value}
                title={value}
                onChange={onChange}
                onBlur={onBlur} 
                onKeyPress={onKeyPress}/>
        </ContainerInputTable>
    );
}

export default CustomDataTable;