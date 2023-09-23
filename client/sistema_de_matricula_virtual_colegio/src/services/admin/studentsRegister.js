import { doRequestAdmin } from "./general";
import { doRequest } from "../helpers";

// #region Main
export const getStudents = async (limitTop, seeSize = false) => {
    return await doRequestAdmin(
        `/student/register?limitTop=${limitTop + 1}&&seeSize=${seeSize}`, "GET");
}
export const getRepresentative = async (codeStudent) => {
    return await doRequestAdmin(
        `/student/representative?codeStudent=${codeStudent}`, 
        "GET");
}
export const updateStudent = async (data) => {
    return await doRequestAdmin(
        "/student/register", "PUT", 
        data);
}
export const addRepresentative = async (data) => {
    return await doRequestAdmin(
        "/student/insert-representative", "POST", 
        data 
    );
}
export const addStudent = async (data) => {
    return await doRequestAdmin(
        "/student/register", "POST", 
        data);
}
export const generateStudentAccount = async (data) => {
    return await doRequestAdmin(
        "/student/generate-account", "POST", 
        data);
}
export const activateStudentAccount = async (token) => {
    return await doRequest(
        `/student/activate-account?token=${token}`, "GET");
}
// #endregion