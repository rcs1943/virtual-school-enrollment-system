//#region Services
import { doRequestCampus } from "./general";
import { getDetailCampus } from "./student";
//#endregion

//#region Main
export const getGradeToEnroll = async () => {
    const { codeStudent } = getDetailCampus();
    return await doRequestCampus(
        "/student/grade-to-enrollment", "POST", {
            codeStudent
        });
}
export const canEnroll = async () => {
    const { codeStudent } = getDetailCampus();
    return await doRequestCampus(
        "/student/can-enroll", "POST", {
        codeStudent
    });
}
export const getDetailClassroom = async (codeGrade) => {
    return await doRequestCampus(
        `/student/detail-classroom?codeGrade=${codeGrade}`, "GET"
    );
}
export const doEnrollment = async (data) => {
    return await doRequestCampus(
        "/student/enrollment", "POST", data);
}
export const getDetailEnrollment = async (codeStudent) => {
    return await doRequestCampus(
        "/student/detail-enrollment", "POST", {
            codeStudent
        }
    );
}
//#endregion