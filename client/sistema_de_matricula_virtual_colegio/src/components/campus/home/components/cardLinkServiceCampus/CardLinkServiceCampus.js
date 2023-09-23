//#region Styles
import { 
    ContainerCardLinkServiceCampus, 
    HeaderCardLinkServiceCampus, 
    DescriptionCardLinkServiceCampus
} from './styles';
//#endregion

const CardLinkServiceCampus = ({ 
    to, 
    title, 
    description, 
    icon 
}) => {
    return (
        <ContainerCardLinkServiceCampus to={to || "./"}>
            <HeaderCardLinkServiceCampus>
                <h4 className="custom-title-4">{title || "Título"}</h4>
                {icon && icon}
            </HeaderCardLinkServiceCampus>
            <DescriptionCardLinkServiceCampus>
                {description || "Descripción"}
            </DescriptionCardLinkServiceCampus>
        </ContainerCardLinkServiceCampus>
    );
}

export default CardLinkServiceCampus;