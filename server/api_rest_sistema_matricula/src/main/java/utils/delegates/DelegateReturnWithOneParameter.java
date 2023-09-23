package utils.delegates;

@FunctionalInterface
public interface DelegateReturnWithOneParameter<R, P> {
    public R execute(P parameter);
}