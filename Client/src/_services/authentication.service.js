import { authHeader, apiUrl } from "../_helpers";
import axios from "axios";
import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("postlight-currentUser"))
);

export const authenticationService = {
  login,
  logout,
  register,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  setUser
};

function login(email, password) {
  var body = {
    email: email,
    password: password
  };

  return axios.post(apiUrl + "/signin", body).then(user => {
    currentUserSubject.next(user.data);
    return user;
  });
}

function register(email, password) {
  var body = {
    email: email,
    password: password
  };

  return axios.post(apiUrl + "/signup", body).then(user => {
    currentUserSubject.next(user.data);
    return user;
  });;
}

function setUser(user) {
  localStorage.setItem("postlight-token", user.data.token);
  //For Future, Just Store Current User's Name, Email, and Etc
  localStorage.setItem(
    "postlight-currentUser",
    JSON.stringify({ loggedin: true })
  );
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("postlight-token");
  localStorage.removeItem("postlight-currentUser");
  currentUserSubject.next(null);
}
