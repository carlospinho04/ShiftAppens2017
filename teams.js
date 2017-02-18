const URL_TeamList = "http://127.0.0.1:5000/get_teams";
const ev_teamlist = "GET_TEAMS";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

function main(){
    var region = localStorage.getItem("region");
		var displayTeams = function(ev) {
        document.removeEventListener(ev_teamlist, displayTeams);
        var teams = ev.response;
    }
    document.addEventListener(ev_teamlist, displayTeams);
		getTeamList(region);

}

function getTeamList(region){
	var params = '{"region": "'+region+'"}';
	var teams = httpGet(URL_TeamList, params, ev_teamlist);
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

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
