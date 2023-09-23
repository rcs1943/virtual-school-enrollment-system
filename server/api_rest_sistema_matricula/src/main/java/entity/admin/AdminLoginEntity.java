package entity.admin;

import dto.admin.AdminAccountDTO;
import java.util.ArrayList;
import java.util.HashMap;
import model.AdminModel;
import utils.Encrypt;
import utils.authentication.JWTAuthentication;
import utils.authentication.RoleAuthJWT;
import utils.validation.Validation;

public class AdminLoginEntity {
    
    public String verifyAccountAdmin(final AdminAccountDTO adminAccount, final JWTAuthentication jwtAuth) {
        final String user = adminAccount.getUser();
        String password = adminAccount.getPassword();
        final ArrayList<HashMap<String,String>> table = new AdminModel().verifyAcountAdmin(adminAccount);
        final String hashedPassword = table.get(0).get("RES");
        final boolean notExistsAccount = "0".equals(hashedPassword);
        if (notExistsAccount) 
            return null;
        final boolean matched = Encrypt.matchWithHashedValue(password, hashedPassword);
        if (!matched)
            return null;
        return jwtAuth.getToken(user, RoleAuthJWT.ADMIN_ROLE);
    }
    public boolean isValidAccount(final AdminAccountDTO adminAccount) {
        return Validation.isValidAdminUser(adminAccount.getUser()) 
                && Validation.isValidPassword(adminAccount.getPassword());
    }
}
