import axios from "axios";

var currentUser = null;
if (localStorage.getItem('postlight-currentUser') != undefined) {
    currentUser = JSON.parse(localStorage.getItem('postlight-currentUser'));
}


export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUser,
    setUser
};

function login(email, password) {

    var body = {
        email: email,
        password: password
    }

    return axios.post("http://localhost:3000/signin", body)
}

function register(email, password) {

    var body = {
        email: email,
        password: password
    }

    return axios.post("http://localhost:3000/signup", body)
}

function setUser(user) {
    localStorage.setItem('postlight-token', user.data.token);
    //For Future, Just Store Current User's Name, Email, and Etc
    currentUser = { loggedIn: true };
    localStorage.setItem('postlight-currentUser', JSON.stringify(currentUser));

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('postlight-token');
    localStorage.removeItem('postlight-currentUser');
    currentUser = null;
}
