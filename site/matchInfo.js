const URL_GetOdds = "http://127.0.0.1:5000/get_match_odds";
const ev_matchodds = "GET_MATCH_ODDS";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

function main(){
	var team_name1 = localStorage.getItem("team_name1");
  var region1 = localStorage.getItem("region1");
  var team_name2 = localStorage.getItem("team_name2");
  var region2 = localStorage.getItem("region2");

	var displayMatchInfo = function(ev) {
		document.removeEventListener(ev_matchodds, displayMatchInfo);
		var match_info = ev.response;
		console.log(match_info[team_name1]);
		console.log(match_info[team_name2]);

	}
	document.addEventListener(ev_matchodds, displayMatchInfo);
  var params = '{"team_name1":"' + team_name1 + '", "region1": "' + region1 + '","team_name2":"' + team_name2 + '", "region2": "' + region2 + '"}';
  httpGet(URL_GetOdds, params, ev_matchodds);
}

function displayMatchInfo(key, value){

}


function httpGet(url, data, type){
	var XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function() {
		if (XHR.readyState === 4 && XHR.status === 200) {
			var response = XHR.response;
			var ev = new Event(type);
			ev.response = response;
			document.dispatchEvent(ev);
		}
	}
	XHR.open('POST', url, true);
	XHR.setRequestHeader("Content-type", "application/json; charset=utf-8");
	XHR.setRequestHeader("Access-Control-Allow-Origin", "*");
	XHR.setRequestHeader("Access-Control-Allow-Credentials", "true");
	XHR.responseType = "json";
	XHR.send(data);
}
