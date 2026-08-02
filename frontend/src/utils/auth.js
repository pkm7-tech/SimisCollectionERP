export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

};
export const isAuthenticated = () => {

    return localStorage.getItem("token") !== null;

};