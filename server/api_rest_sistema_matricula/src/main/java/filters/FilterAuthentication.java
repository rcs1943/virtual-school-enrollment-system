package filters;

import filters.utils.ControllerAuthenticationPatterns;
import java.io.IOException;
import java.util.Arrays;
import javax.servlet.annotation.WebFilter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.FormatResponse;
import utils.HelperController;
import utils.authentication.JWTAuthentication;
import utils.authentication.RoleAuthJWT;

@WebFilter (filterName="FilterAuthentication", urlPatterns = {"/api/*"})
public class FilterAuthentication implements Filter {
    
    private JWTAuthentication jwtAuth;
    @Override
    public void init(FilterConfig filterConfig) 
            throws ServletException { jwtAuth = new JWTAuthentication(); }

    @Override
    public void doFilter(ServletRequest request, 
            ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        final HttpServletResponse httpResponse = (HttpServletResponse) response;
        if (enablePreflightRequest(httpRequest, httpResponse))
            return;

        // Obteniendo ruta actual
        final String currentPath = httpRequest.getRequestURI();
        
        // Continuar si no son las rutas controladores o en la ruta de login
        final boolean wasPathStudentController = isPathController(currentPath, ControllerAuthenticationPatterns.STUDENT_PATHS);
        final boolean wasPathAdminController = isPathController(currentPath, ControllerAuthenticationPatterns.ADMIN_PATHS);
        if (!wasPathStudentController && !wasPathAdminController) {
            chain.doFilter(request, response);
            return;
        }
        
        if (authenticateToken(chain, request, response, wasPathStudentController))
            return;
        
        // Restringiendo y respondiendo en caso no haya token
        HelperController.templatePrintable(
                FormatResponse.getErrorResponse("Unauthorized", 403), 
                httpResponse);
    }
    private boolean enablePreflightRequest(
        final HttpServletRequest req, final HttpServletResponse res) {
        if (req.getMethod().equals("OPTIONS")) {
            res.setStatus(HttpServletResponse.SC_OK);
            return true;
        }
        return false;
    }
    private boolean authenticateToken(
            FilterChain chain, 
            ServletRequest req, 
            ServletResponse res, 
            boolean wasPathStudentController) 
            throws IOException, ServletException {
        final RoleAuthJWT roleAuthJWT = wasPathStudentController
                ? RoleAuthJWT.STUDENT_ROLE
                : RoleAuthJWT.ADMIN_ROLE;
        final String token = ((HttpServletRequest) req).getHeader("Authorization");
        if (isValidToken(token, roleAuthJWT)) {
            chain.doFilter(req, res);
            return true;
        }
        return false;
    }
    private boolean isValidToken(
            final String token, 
            final RoleAuthJWT roleAuthJWT) {
        if (token == null || !token.startsWith("Bearer ")) 
            return false;
        String tokenWithoutBearer = token.split("Bearer ")[1].trim();
        return jwtAuth.verifyToken(tokenWithoutBearer, roleAuthJWT);
    }
    private boolean isPathController(final String currentPath, String[] PATHS) {
        return Arrays.stream(PATHS).anyMatch(
                (String PATH) -> currentPath.equals(ControllerAuthenticationPatterns.ROOT + PATH));
    }
    @Override
    public void destroy() { jwtAuth = null; }
}
