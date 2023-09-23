package filters;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

@ WebFilter(urlPatterns = { "/*" })
public class CORSFilter implements Filter {
    @Override
    public void init(FilterConfig config) throws ServletException { }

    @Override
    public void destroy() {}

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {
        final HttpServletResponse res = (HttpServletResponse) servletResponse;
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.addHeader("Access-Control-Allow-Headers","*");
        res.addHeader("Access-Control-Allow-Methods","*");
        res.addHeader("Content-Type", "json/application; charset=UTF-8");
        chain.doFilter(servletRequest, servletResponse);
    }


}