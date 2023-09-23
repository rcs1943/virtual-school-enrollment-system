//#regions Structures
export const regex = {
    user: /^.{8,16}$/, 
    dni: /^[0-9]{8}$/, 
    password: /^.{8,16}$/, 
    name: /^.{1,50}$/, 
    surname: /^.{1,25}$/, 
    address: /^.{8,50}$/, 
    phone: /^[0-9]{9}$/, 
    email: /^[0-9a-zA-Z_.]{1,30}@.{1,10}\..{1,8}$/, 
    date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 
};
export const typeStateRequestLogin = {
    NO_MATCH: "NO_MATCH",
    INVALID_DATA: "INVALID_DATA", 
    ERROR: "ERROR"
};
export const messageFailedLogin = {
    NO_MATCH: "Las credenciales ingresadas no coinciden.",
    INVALID_DATA: "Credenciales inválidas.", 
    ERROR: "¡Ocurrió un error inesperado! Inténtelo más tarde."
};
//#endregion
//#regions Functions
export const fieldsHaveErrors = (errors) => {
    return Object.values(errors).some(error => error);
}
export const handleKeyPressOnlyNumbers = (e) => {
    if (!/^[0-9]$/.test(e.key))
        e.preventDefault();
}
//#endregion