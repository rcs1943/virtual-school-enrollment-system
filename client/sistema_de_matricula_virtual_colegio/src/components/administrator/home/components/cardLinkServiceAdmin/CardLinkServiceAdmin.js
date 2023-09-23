//#region Styles
import { 
    ContainerCardLinkServiceCampus, 
    TitleCardLinkServiceCampus
} from './styles';
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion

const CardLinkServiceAdmin = ({ 
    to, 
    text = "",
    icon
}) => {
    return (
        <ContainerCardLinkServiceCampus to={`/admin/registro/${to}`}>
            <TitleCardLinkServiceCampus>
                <Icon icon={icon}/>
                <h4 className="custom-title-4">{text}</h4>
            </TitleCardLinkServiceCampus>
        </ContainerCardLinkServiceCampus>
    );
}

export default CardLinkServiceAdmin;