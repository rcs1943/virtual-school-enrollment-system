// Styles
import { 
    ContainerSectionHome, 
    HeaderSectionHome, 
    ContentSectionHome, 
    HeaderProfileHome
} from './styles';
//#region Libraries
import { 
    // useState, 
    useEffect 
} from 'react';
// import {
//     Button
// } from '@mui/material';
//#endregion
//#region Icons
import { Icon } from '@iconify/react';
//#endregion
//#region Images
import symbolSchoolImg from '../../../img/general/school-symbol.png';
//#endregion
//#region Components
// import DialogAlert from '../../../components/general/dialogAlert/DialogAlert';
import CardLinkServiceCampus from '../../../components/campus/home/components/cardLinkServiceCampus/CardLinkServiceCampus';
//#endregion

const Home = () => {
    //#region States
    // const [open, setOpen] = useState(false);
    // const handleOpen = (toOpen = true) => setOpen(toOpen);
    //#endregion
    //#region Functions
    const addClassMainHome = () => {
        const mainElement = document.querySelector('main');
        mainElement.classList.add('home');
        return () => mainElement.classList.remove('home');
    }
    //#endregion
    //#region Effects
    useEffect(() => {
        const removeClassMainHome = addClassMainHome();
        return () => removeClassMainHome();
    });
    //#endregion

    return (
        <ContainerSectionHome>
            <HeaderSectionHome>
                <HeaderProfileHome only={true}/>
                <h3 className="custom-title-4">
                    I.E.P VICTOR MANUEL MAURTUA - ICA - PERÚ
                </h3>
                <img src={symbolSchoolImg} alt="Insignia Maurtua Parcona - Ica"/>
            </HeaderSectionHome>
            <ContentSectionHome>
                <CardLinkServiceCampus to="../aula-virtual"
                    title="AULA VIRTUAL"
                    description="Acceso a las clases virtuales y recursos necesarios para el estudiante"
                    icon={<Icon icon="mdi:google-classroom"/>}/>
                <CardLinkServiceCampus to="../intranet"
                    title="INTRANET"
                    description="Acceso a información de los estudiantes como historial de calificaciones, inasistencias, justificaciones."
                    icon={<Icon icon="ant-design:laptop-outlined"/>}/>
                <CardLinkServiceCampus to="../matricula"
                    title="MATRÍCULA"
                    description="Matrícula en línea para estudiantes de la I.E “Victor Manuel Maurtua”."
                    icon={<Icon icon="vaadin:user-card" />}/>
            </ContentSectionHome>
        </ContainerSectionHome>
    );
}

export default Home;