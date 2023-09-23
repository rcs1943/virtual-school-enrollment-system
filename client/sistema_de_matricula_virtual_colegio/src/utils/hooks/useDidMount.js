//#region Libraries
import {
    useState, 
    useEffect 
} from "react";
//#endregion

const useDidMount = () => {
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, []);
    return didMount;
}

export default useDidMount;