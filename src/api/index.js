import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const client = axios.create({
  baseURL: API_BASE_URL,
  maxRedirects: 0,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

/*
 * Check each response whether content-type is not JSON. This indicates that
 * session has timed out
 */
client.interceptors.response.use(function(response) {
  const type = response.headers["content-type"];
  const valid = /application\/json/.test(type);

  if (valid) {
    return response;
  } else {
    window.location.href = "/logout";
  }
});

export function postLogout() {
  return client.post("/logout");
}

export function getDay(datestr) {
  if (datestr == null) {
    return client.get("/rest/day");
  } else {
    return client.get("/rest/day/" + datestr);
  }
}

export function postDay(params) {
  return client.post("/rest/day", params);
}

export function getWeek(datestr) {
  if (datestr == null) {
    return client.get("/rest/week");
  } else {
    return client.get("/rest/week/" + datestr);
  }
}

export function postWeek(params) {
  return client.post("/rest/week", params);
}

export function getMonth(datestr) {
  if (datestr == null) {
    return client.get("/rest/month");
  } else {
    return client.get("/rest/month/" + datestr);
  }
}

/*
 * Customer handling
 */

export function getCustomers() {
  return client.get("/rest/customers");
}

export function getCustomer(customerId) {
  return client.get("/rest/customer/" + customerId);
}

export function postCustomer(params) {
  return client.post("/rest/customer", params);
}

export function postProject(params) {
  return client.post("/rest/project", params);
}

/*
 * Person management
 */

export function getPersons() {
  return client.get("/rest/admin/persons");
}

export function getPerson(personId) {
  return client.get("/rest/admin/person/" + personId);
}

export function postPerson(params) {
  return client.post("/rest/admin/person", params);
}

/*
 * Report preview
 */

export function getReportPreview(params) {
  return client.get("/rest/admin/report/preview");
}

export function postReportPreview(params) {
  return client.post("/rest/admin/report/preview", params);
}

/*
 * Graph preview
 */

export function getGraphPreview(params) {
  return client.get("/rest/admin/graph");
}

export function postGraphPreview(params) {
  return client.post("/rest/admin/graph", params);
}

const excelClient = axios.create({
  baseURL: API_BASE_URL,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.ms-excel"
  }
});

export function getExcel(params) {
  return excelClient.post("/rest/admin/report/xlsx", params);
}

/*
 * Change password
 */

export function postChangePassword(params) {
  return client.post("/rest/password", params);
}

/*
 *
 */

export function getWhoAmI() {
  return client.get("/rest/whoami");
}

export function postPreferences(params) {
  return client.post("/rest/pref", params);
}

/*
 * Project Preferences
 */

export function postProjectPreferences(params) {
  return client.post("/rest/pref/projects", params);
}

/*
 * Flex hour calls
 */

export function fetchFlexProjects() {
  return client.get("/rest/admin/flex/projects");
}

export function postFlexProject(params) {
  return client.post("/rest/admin/flex/project", params);
}

export function fetchFlexPersons() {
  return client.get("/rest/admin/flex/persons");
}

export function postFlexPerson(params) {
  return client.post("/rest/admin/flex/person", params);
}

export function fetchPersonFlexSummary(personId) {
  return client.get("/rest/admin/flex/person/" + personId);
}
