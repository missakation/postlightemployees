import { authHeader, apiUrl, authHeaderFormData } from ".././_helpers";
import axios from "axios";

export const employeeService = {
  get,
  create,
  update,
  getById,
  deleteById
};

const employeeUrl = apiUrl + "/api/employees";

function get(page, rowsPerPage, criteria) {
  return axios.get(
    employeeUrl + buildParams(page, rowsPerPage, criteria),
    authHeader()
  );
}

function getById(id) {
  return axios.get(employeeUrl + "/" + id, authHeader());
}

function deleteById(id) {
  return axios.delete(employeeUrl + "/" + id, authHeader());
}

function create(employee, imageFile) {
  var bodyFormData = buildFormData(employee, imageFile);

  return axios({
    method: "post",
    url: employeeUrl,
    data: bodyFormData,
    headers: authHeaderFormData()
  });
}

function update(id, employee, imageFile) {
  var bodyFormData = buildFormData(employee, imageFile);

  return axios({
    method: "put",
    url: employeeUrl + "/" + id,
    data: bodyFormData,
    headers: authHeaderFormData()
  });
}

function buildParams(page, rowsPerPage, criteria) {
  return "?page=" + page + "&rowsPerPage=" + rowsPerPage + "&name=" + criteria;
}

function buildFormData(employee, imageFile) {
  
  var bodyFormData = new FormData();
  bodyFormData.set("name", employee.name);
  bodyFormData.set("jobtitle", employee.jobtitle);
  bodyFormData.set("city", employee.city);
  bodyFormData.set("address", employee.address);
  bodyFormData.set("department", employee.department);

  if (imageFile != null && imageFile != undefined) {
    bodyFormData.append("media", imageFile);
  }

  return bodyFormData;
}
