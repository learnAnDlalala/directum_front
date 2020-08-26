export const utils =   {
    baseUrl:'http://localhost:62265/',
    get UserID () {
        //const cookieID = document.cookie;
        //const userID = cookieID.slice(7);
        const userID = localStorage.getItem('UserID');
        return userID*1;
    }}