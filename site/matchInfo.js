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
  var team_logo1 = localStorage.getItem("team_logo1");
  var team_name2 = localStorage.getItem("team_name2");
  var region2 = localStorage.getItem("region2");
  var team_logo2 = localStorage.getItem("team_logo2");

	var displayMatchInfo = function(ev) {
		document.removeEventListener(ev_matchodds, displayMatchInfo);
		var match_info = ev.response;
    var games_list = document.getElementById("UPGames")
    var game_tab = document.createElement("tr")

    var teamlogo1 = document.createElement("td")
    var img1 = document.createElement("img")
    img1.src = team_logo1;
    img1.width = 50
    img1.height = 50
    teamlogo1.className+="logo2";
    teamlogo1.appendChild(img1)

    var teamcells = document.createElement("td")
    teamcells.className+= "teamNames2";
    teamcells.innerHTML = team_name1 + " vs " + team_name2

    var odd_tab = document.createElement("tr")
    var odd1 = document.createElement("td")
    odd1.className+= "tableCell2";
    odd1.innerHTML = (Math.round(parseFloat(match_info[team_name1])*100* 100) / 100).toString();
    var odd_vs = document.createElement("td")
    odd_vs.className+= "tableCell2";
    odd_vs.innerHTML = "vs"
    var odd2 = document.createElement("td")
    odd2.className+= "tableCell2";
    odd2.innerHTML = (Math.round(parseFloat(match_info[team_name2])*100* 100) / 100).toString();

    var teamlogo2 = document.createElement("td")
    var img2 = document.createElement("img")
    img2.src = team_logo2
    img2.width = 50
    img2.height = 50
    teamlogo2.className+="logo2";
    teamlogo2.appendChild(img2)

    /***********************/
    game_tab.appendChild(teamlogo1);
    game_tab.appendChild(teamcells);
    game_tab.appendChild(teamlogo2);
    odd_tab.appendChild(odd1);
    odd_tab.appendChild(odd_vs);
    odd_tab.appendChild(odd2);
    games_list.appendChild(game_tab);
    games_list.appendChild(odd_tab);

    document.body.appendChild(games_list);

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
