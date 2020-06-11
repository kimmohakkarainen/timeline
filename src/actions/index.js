import * as api from "../api";

export function postLogout() {
	return dispatch => {
		api.postLogout().then(resp => {
			console.log('logout successfull');
			window.location.href='/logout';
		})
		.catch(error => {
			console.log('logout error');
			window.location.href='/logout';
		});
	};
}

export function fetchDay(date) {
	return dispatch => {
		api
		.getDay(date)
		.then(resp => {
			dispatch(fetchDaySucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function postDay(params) {
	return dispatch => {
		api
		.postDay(params)
		.then(resp => {
			dispatch(fetchDaySucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}
export function fetchDaySucceeded(data) {
	return {
		type: "FETCH_DAY_SUCCEEDED",
		payload: { dayview: data, error: null }
	};
}

export function fetchError(error) {
	return {
		type: "ERROR",
		payload: { error: "Connection error" }
	};
}

/*
 * Week view
 */

export function fetchWeek(date) {
	return dispatch => {
		api
		.getWeek(date)
		.then(resp => {
			dispatch(fetchWeekSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function postWeek(params) {
	return dispatch => {
		api
		.postWeek(params)
		.then(resp => {
			dispatch(fetchWeekSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}
export function fetchWeekSucceeded(data) {
	return {
		type: "FETCH_WEEK_SUCCEEDED",
		payload: { weekview: data, error: null }
	};
}

/*
 * Month view
 */

export function fetchMonth(date) {
	return dispatch => {
		api
		.getMonth(date)
		.then(resp => {
			dispatch(fetchMonthSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchMonthSucceeded(data) {
	return {
		type: "FETCH_MONTH_SUCCEEDED",
		payload: { monthview: data, error: null }
	};
}

/*
 * Customer view
 */

export function fetchCustomers() {
	return dispatch => {
		api
		.getCustomers()
		.then(resp => {
			dispatch(fetchCustomersSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function postCustomer(data) {
	return dispatch => {
		api
		.postCustomer(data)
		.then(resp => {
			dispatch(fetchCustomersSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchCustomersSucceeded(data) {
	return {
		type: "FETCH_CUSTOMERS_SUCCEEDED",
		payload: { customerview: data, error: null }
	};
}

export function fetchCustomerProjects(customerId) {
	return dispatch => {
		api
		.getCustomer(customerId)
		.then(resp => {
			dispatch(fetchCustomerProjectsSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function postCustomerProject(data) {
	return dispatch => {
		api
		.postProject(data)
		.then(resp => {
			dispatch(fetchCustomerProjectsSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchCustomerProjectsSucceeded(data) {
	return {
		type: "FETCH_CUSTOMER_PROJECTS_SUCCEEDED",
		payload: { projectview: data, error: null }
	};
}

/*
 * Person Management
 */

export function fetchPersons() {
	return dispatch => {
		api
		.getPersons()
		.then(resp => {
			dispatch(fetchPersonsSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function postPerson(data) {
	return dispatch => {
		api
		.postPerson(data)
		.then(resp => {
			dispatch(fetchPersonsSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchPersonsSucceeded(data) {
	return {
		type: "FETCH_PERSONS_SUCCEEDED",
		payload: { personadmin: data, error: null }
	};
}


/*
 * Reports
 */


export function getReportPreview() {
	return dispatch => {
		api
		.getReportPreview()
		.then(resp => {
			dispatch(fetchReportPreviewSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}


export function fetchReportPreview(params) {
	return dispatch => {
		dispatch(fetchReportPreviewSucceeded(params));
		api
		.postReportPreview(params)
		.then(resp => {
			dispatch(fetchReportPreviewSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchReportPreviewSucceeded(data) {
	return {
		type: "FETCH_REPORT_PREVIEW_SUCCEEDED",
		payload: { reportview: data, error: null }
	};
}

export function getExcel(params) {
	return dispatch => {
		api
		.getExcel(params)
		.then(response => {
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				// this is for IE 11
				window.navigator.msSaveOrOpenBlob(response.data, "report.xlsx");
			} else {
				// for other browsers
				const url = window.URL.createObjectURL(response.data);
				const link = document.createElement("a");
				document.body.appendChild(link);
				link.href = url;
				link.setAttribute("download", "report.xlsx");
				link.click();
				window.URL.revokeObjectURL(url);
			}
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

/*
 * Graphs
 */

export function getGraphPreview() {
	console.log('getGraphPreview()');
	return dispatch => {
		api
		.getGraphPreview()
		.then(resp => {
			dispatch(fetchGraphPreviewSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}


export function fetchGraphPreview(params) {
	console.log('fetchGraphPreview()');
	console.log(params);

	return dispatch => {
		dispatch(fetchGraphPreviewSucceeded(params));
		api
		.postGraphPreview(params)
		.then(resp => {
			dispatch(fetchGraphPreviewSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchGraphPreviewSucceeded(data) {
	return {
		type: "FETCH_GRAPH_PREVIEW_SUCCEEDED",
		payload: { graphview: data, error: null }
	};
}

/*
 * Change Password
 */

export function postChangePassword(params) {
	return dispatch => {
		api
		.postChangePassword(params)
		.then(resp => {
			dispatch(changePasswordSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function changePasswordSucceeded(data) {
	return {
		type: "CHANGE_PASSWORD_SUCCEEDED",
		payload: { passwordview: data, error: null }
	};
}

export function dismissPasswordDialog() {
	return {
		type: "DISMISS_PASSWORD_DIALOG",
		payload: { passwordview: {}, error: null }
	};
}

/*
 * Who Am I and Preferences
 */

export function fetchWhoAmI(params) {
	return dispatch => {
		api
		.getWhoAmI()
		.then(resp => {
			dispatch(fetchWhoAmISucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function postPreferences(params) {
	return dispatch => {
		api
		.postPreferences(params)
		.then(resp => {
			dispatch(fetchWhoAmISucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchWhoAmISucceeded(data) {
	return {
		type: "WHOAMI_SUCCEEDED",
		payload: { whoami: data, error: null }
	};
}

/*
 * Project Preferences
 */

export function postProjectPreferences(params) {
	return dispatch => {
		api
		.postProjectPreferences(params)
		.then(resp => {
			dispatch(fetchProjectPreferencesSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchProjectPreferencesSucceeded(data) {
	return {
		type: "FETCH_PROJECT_PREFERENCES_SUCCEEDED",
		payload: { projectprefview: data, error: null }
	};
}

/* 
 * Flex hour calculation calls
 */

export function fetchFlexProjects() {
	return dispatch => {
		api
		.fetchFlexProjects()
		.then(resp => {
			dispatch(fetchFlexProjectsSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function saveFlexProject(project) {
	return dispatch => {
		api
		.postFlexProject(project)
		.then(resp => {
			dispatch(fetchFlexProjectsSucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchFlexProjectsSucceeded(data) {
	return {
		type: "FETCH_FLEX_PROJECTS_SUCCEEDED",
		payload: {
			flexprojects: data
		}
	};
}


export function fetchFlexPersons() {
	return dispatch => {
		api
		.fetchFlexPersons()
		.then(resp => {
			dispatch(fetchFlexPersonsSucceeded(resp.data.persons));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function saveFlexPerson(person) {
	return dispatch => {
		api
		.postFlexPerson(person)
		.then(resp => {
			dispatch(fetchFlexPersonsSucceeded(resp.data.persons));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchFlexPersonsSucceeded(data) {
	return {
		type: "FETCH_FLEX_PERSONS_SUCCEEDED",
		payload: {
			flexpersons: data
		}
	};
}

export function fetchPersonFlexSummary(personId) {
	return dispatch => {
		api
		.fetchPersonFlexSummary(personId)
		.then(resp => {
			dispatch(fetchPersonFlexSummarySucceeded(resp.data));
		})
		.catch(error => {
			dispatch(fetchError(error));
		});
	};
}

export function fetchPersonFlexSummarySucceeded(data) {
	return {
		type: "FETCH_PERSON_FLEX_SUMMARY_SUCCEEDED",
		payload: {
			personFlexSummary: data
		}
	};
}


