package utils.delegates;
import java.sql.SQLException;

@FunctionalInterface
public interface DelegateWithTwoParametersReturn2ndParameterThrowsSQLException <P1, P2> {
    public P2 execute(P1 parameter2, P2 parameter1) throws SQLException;
}