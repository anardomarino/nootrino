/*
 ******************************************************************************
 *	utilities.js	- utility functions for server interaction
 *	Anthony Nardomarino
 *	12-Aug-2020
 ******************************************************************************
 */

// formatParams({ a: "1", b: "2" }) => "a=1&b=2"
function formatParams(params) {
	return Object.keys(params)
		.map((key) => key + "=" + encodeURIComponent(params[key]))
		.join("&");
}

// convert fetch result to JSON object
function convertToJSON(res) {
	if (!res.ok) {
		throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
	}
	
	return res
		.clone()
		.json()
		.catch((err) => {
			return res.text().then((text) => {
				throw `API request's result could not be converted to JSON object: \n${text}`;
			});
		});
}

// helper code to make a request
// returns JSON object promise
export function get(endpoint, params = {}){
	const fullPath = endpoint + "?" + formatParams(params);
	return fetch(fullPath)
		.then(convertToJSON)
		.catch((err) => {
			throw `GET request to ${fullPath} failed with error:\n${err}`;
		});
}

export function post(endpoint, params = {}){
	return fetch(endpoint, {
		method: "post",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(params),
	})
		.then(convertToJSON)
		.catch((err) => {
			throw `POST request to ${endpoint} failed with error:\n${err}`;
		});
}
