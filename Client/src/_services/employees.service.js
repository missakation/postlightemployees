import axios from "axios";
import { authHeader, apiUrl } from ".././_helpers"

export const employeeService =
{
    get, create, update, getById, deleteById
}

const employeeUrl = apiUrl + "/api/employees";

function get(page, rowsPerPage, criteria) {
    return axios.get(employeeUrl + buildParams(page, rowsPerPage, criteria), authHeader())
}

function getById(id) {
    return axios.get(employeeUrl + '/' + id, authHeader())
}

function deleteById(id) {
    return axios.delete(employeeUrl + '/' + id, authHeader())
}

function create(employee) {
    return axios.post(employeeUrl, employee, authHeader())
}

function update(id, employee) {
    return axios.put(employeeUrl + '/' + id, employee, authHeader())
}

function buildParams(page, rowsPerPage, criteria) {
    return "?page=" + page +
        "&rowsPerPage=" + rowsPerPage +
        "&name=" + criteria

}
