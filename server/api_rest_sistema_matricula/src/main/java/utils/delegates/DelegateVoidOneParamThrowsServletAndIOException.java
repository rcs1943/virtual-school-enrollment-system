
package utils.delegates;

import java.io.IOException;
import javax.servlet.ServletException;

@FunctionalInterface
public interface DelegateVoidOneParamThrowsServletAndIOException<P> {
    public void execute(P p) throws ServletException, IOException;
}
