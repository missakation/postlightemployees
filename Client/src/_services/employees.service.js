import axios from "axios";
import { authHeader, apiUrl } from ".././_helpers"

export const employeeService =
{
    get, getById, deleteById
}

const employeeUrl = apiUrl + "/api/employees";

function get(page, rowsPerPage, criteria) {

    var header = authHeader();
    return axios.get(employeeUrl + buildParams(page, rowsPerPage, criteria), authHeader())
}

function getById(id) {

    return axios.post(employeeUrl + '/' + id, authHeader())
}

function deleteById(id) {
    return axios.delete(employeeUrl + '/' + id, authHeader())
}


function buildParams(page, rowsPerPage, criteria) {
    return "?page=" + page +
        "&rowsPerPage=" + rowsPerPage +
        "&name=" + criteria

}
