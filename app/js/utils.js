export const utils =   {
    baseUrl:'http://localhost:62265/',
    get UserID () {
        const cookieID = document.cookie;
        const userID = cookieID.slice(7);
        return userID*1;
    }}