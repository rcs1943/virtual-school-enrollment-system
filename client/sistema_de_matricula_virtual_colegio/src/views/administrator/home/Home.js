//#region Styles
import {
    ContainerBackgroundBlue,
} from '../../../components/administrator/components/styles';
import {
    ContainerLinks,
    Title,
    Content,
    Divider
} from './styles';
//#endregion
//#region Components
import LogoutBtn from "../../../components/administrator/components/logoutBtn/LogoutBtn";
import CardLinkServiceAdmin from "../../../components/administrator/home/components/cardLinkServiceAdmin/CardLinkServiceAdmin";
//#endregion
const iconList = ["ph:student-light", "la:chalkboard-teacher", "carbon:course"]
const Home = ({
    infoRoutes = []
}) => {
    return (
        <ContainerBackgroundBlue>
            <LogoutBtn/>
            <Divider/>
            <Content>
                <Title className="custom-title-6">BIENVENIDO AL ADMINISTRADOR</Title>
                <ContainerLinks>
                    {infoRoutes.map((route, idx) => (
                        <CardLinkServiceAdmin 
                            key={idx}
                            to={route.path}
                            text={route.nameRoute}
                            icon={iconList[idx]}/>
                    ))}
                </ContainerLinks>
            </Content>
        </ContainerBackgroundBlue>
    );
}

export default Home;