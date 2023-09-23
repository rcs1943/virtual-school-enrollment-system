package utils.validation;

import com.google.gson.JsonObject;
import java.util.regex.Pattern;

public class Validation {
    public static Integer isValidCode(String code, Integer limit) { 
        try {
            Integer codeParsed = Integer.parseInt(code);
            limit = (limit == null ? Integer.MAX_VALUE : limit);
            return codeParsed > 0 &&
                codeParsed <= limit ? codeParsed : null;
        }
        catch (Exception ex) {
            return null;
        }
    }
    
    public static boolean isValidPassword(final String password) {
        return regexIsMatched(RegexPatternsValidation.PASSWORD, password);
    }
    
    public static boolean isValidDNI(final String dni) {
        return regexIsMatched(RegexPatternsValidation.DNI, dni);
    }
    
    public static boolean isNullPropertyOfJson(final JsonObject jObj, final String property) {
        if (!jObj.has(property))
            return true;
        return jObj.get(property).isJsonNull();
    }
    
    public static boolean isValidAdminUser(final String user) {
        return regexIsMatched(RegexPatternsValidation.USER, user);
    }
    
    public static boolean regexIsMatched(String regex, final String str) {
        return Pattern.compile(regex).matcher(str).find();
    }
    
}
