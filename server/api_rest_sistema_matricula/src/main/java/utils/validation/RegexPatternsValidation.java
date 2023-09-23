package utils.validation;

public class RegexPatternsValidation {
    public final static String 
        DNI = "^[0-9]{8}$", 
        USER = "^.{8,16}$",
        PASSWORD = "^(?=.*[0-9])(?=.*[A-ZÁÉÍÓÚÑ])(?=.*[a-záéíóúñ]).{8,16}$";
}