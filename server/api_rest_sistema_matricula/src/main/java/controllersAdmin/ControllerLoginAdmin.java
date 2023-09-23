package controllersAdmin;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import dto.admin.AdminAccountDTO;
import entity.admin.AdminLoginEntity;
import utils.FormatResponse;
import utils.HelperController;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.authentication.JWTAuthentication;

@WebServlet(name = "ControllerLoginAdmin", urlPatterns = {"/api/admin/login"})
public class ControllerLoginAdmin extends HttpServlet {

    private JWTAuthentication jwtAuth;
    @Override
    public void init() { jwtAuth = new JWTAuthentication(); }
    @Override
    public void destroy() {  jwtAuth = null; }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final JsonObject body = HelperController.getRequestBody(request);
        final FormatResponse formatResponse = verifyAccountAdmin(body);
        HelperController.templatePrintable(formatResponse, response);
    }
    private FormatResponse verifyAccountAdmin(final JsonObject body) {
        if (body == null)
            return FormatResponse.getErrorResponse("The request body doesn't have json format", 400);
        final JsonElement 
                user = body.get("user"),
                password = body.get("password");
        
        if (user == null || password == null) 
            return FormatResponse.getErrorResponse("Mising parameters", 400);
        
        final AdminAccountDTO accountToLogin = new AdminAccountDTO(
                user.getAsString(), 
                password.getAsString()
        );
        final AdminLoginEntity adminLoginEntity = new AdminLoginEntity();
        final boolean isValid = adminLoginEntity.isValidAccount(accountToLogin);
        if (!isValid)
            return FormatResponse.getErrorResponse("The parameters body aren't valid.", 400);
        final String token = adminLoginEntity.verifyAccountAdmin(accountToLogin, jwtAuth);
        if (token == null)
            return FormatResponse.getErrorResponse("The account credentials don't match.", 401);
        
        final JsonObject objToken = new JsonObject();
        objToken.addProperty("token", token);
        
        return FormatResponse.getSuccessResponse(objToken);
    }
}