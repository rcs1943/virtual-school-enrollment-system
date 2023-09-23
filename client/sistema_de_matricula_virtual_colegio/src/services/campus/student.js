import { doRequestCampus  } from "./general";

// #region Main
export const getDetailCampusRequest = async (dni) => 
    await doRequestCampus(
        `/student/detail-campus?dni=${dni}`, "GET");
export const getDetailCampus = () => 
    JSON.parse(sessionStorage.getItem("detailStudent"));
export const setDetailCampus = (detailStudent) => 
    sessionStorage.setItem("detailStudent", JSON.stringify(detailStudent));
// #endregion