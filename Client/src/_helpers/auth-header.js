import { authenticationService } from '../_services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && localStorage.getItem("postlight-token")) {
        var header = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("postlight-token")
            }
        };
        return header;
    } else {
        return {};
    }
}

export const apiUrl = "http://localhost:3000"