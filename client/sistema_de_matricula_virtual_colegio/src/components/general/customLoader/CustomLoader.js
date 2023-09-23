import { Container, Ball } from './styles';

const CustomLoader = ({ size, spacing, ...props }) => {
    return (
        <div {...props}>
            <Container size={size ||  5} spacing={spacing || 15}>
                <Ball/>
                <Ball/>
                <Ball/>
            </Container>
        </div>
    );
}

export default CustomLoader;