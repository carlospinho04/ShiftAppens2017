const upcoming_matches = [
    {
      "team_name1":"Unicorns Of Love",
      "team_region1": "euw",
      "team_name2": "Misfits",
      "team_region2": "euw",
      "date": "02-03-2017 15:00",
    },
    {
      "team_name1":"Fnatic",
      "team_region1": "euw",
      "team_name2": "H2K",
      "team_region2": "euw",
      "date": "02-03-2017 19:00",
    },
    {
      "team_name1":"G2 Esports",
      "team_region1": "euw",
      "team_name2": "Team Vitality",
      "team_region2": "euw",
      "date": "03-03-2017 16:00",
    },
    {
      "team_name1":"Splyce",
      "team_region1": "euw",
      "team_name2": "Giants",
      "team_region2": "euw",
      "date": "03-03-2017 19:00",
    },
    {
      "team_name1":"FlyQuest",
      "team_region1": "euw",
      "team_name2": "TSM",
      "team_region2": "euw",
      "date": "19-02-2017 20:00",
    },
    {
      "team_name1":"Immortals",
      "team_region1": "euw",
      "team_name2": "Echo Fox",
      "team_region2": "euw",
      "date": "19-02-2017 20:00",
    },
    {
      "team_name1":"Phoenix1",
      "team_region1": "euw",
      "team_name2": "Cloud9",
      "team_region2": "euw",
      "date": "19-02-2017 23:00",
    },
    {
      "team_name1":"Team Liquid",
      "team_region1": "euw",
      "team_name2": "CLG",
      "team_region2": "euw",
      "date": "19-02-2017 23:00",
		}
];
const URL_GetOdds = "http://127.0.0.1:5000/get_match_odds";
const ev_matchodds = "GET_MATCH_ODDS";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

function main(){
	Object.entries(upcoming_matches).forEach(
		([key, value]) => getMatchInfo(key, value)
	);
/**
	var menu = document.getElementById("current");
	console.log("Teams - " + region.toUpperCase());
	menu.childNodes[0].innerText = "Teams - " + region.toUpperCase();
	var displayTeamInfo = function(ev) {
		document.removeEventListener(ev_teaminfo, displayTeamInfo);
		var teams = ev.response;
		console.log(teams);
		Object.entries(teams).forEach(
    	([key, value]) => addListToHTML(key, value)
		);
	}
	document.addEventListener(ev_teaminfo, displayTeamInfo);
	getTeamInfo(team, region);
**/
}

function getMatchInfo(key, value){
	var team_name1 = value["team_name1"];
	var team_region1 = value["team_region1"];
	var team_name2 = value["team_name2"];
	var team_region2 = value["team_region2"];
	var date = value["date"];
	var displayTeamInfo = function(ev) {
		document.removeEventListener(ev_matchodds, displayMatchInfo);
		console.log(ev.response);
	}
	document.addEventListener(ev_matchodds, displayMatchInfo);
	var params = '{"team_name1":"' + team_name1 + '", "region1": "' + team_region1 + ',"team_name2":"' + team_name2 + '", "region2": "' + team_region2 + '"}';
	httpGet(URL_GetOdds,params, ev_matchodds);
}

function addListToHTML(key, value){
	var teams_list = document.getElementById("teams");
	var team_li = document.createElement("li");
	var team_div = document.createElement("div");
	var team_image = document.createElement("img");
	team_image.src = value;
	var team_p = document.createElement("p");
	team_p.innerHTML = key;
	team_div.appendChild(team_image);
	team_div.appendChild(team_p);
	team_li.appendChild(team_div);
	team_li.id = key;
	teams_list.appendChild(team_li);
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


function generateTable(){
	console.log("Start")
	var games_list = document.getElementById("UPGames")
	var i = 0;
	$.getJSON("teams.json", function(json) {
    	console.log(json['games']['euw']); // this will show the info it in firebug console
		for(i=0;i<5;i++){
		console.log("for")
		var game_tab = document.createElement("tr")
		/***********************/
			var teamlogo1 = document.createElement("td")

			var img1 = document.createElement("img")
			img1.src = json['games']['euw']['teams'][2*i]['logo']
			img1.width = 50
			img1.height = 50
			teamlogo1.className+="logo";

			var teamcells = document.createElement("td")
			teamcells.className+= "teamNames";
			teamcells.id = "game" + i
			teamcells.innerHTML = json['games']['euw']['teams'][2*i]['name'] + " vs " + json['games']['euw']['teams'][2*i+1]['name']
			var teamlogo2 = document.createElement("td")
			var img2 = document.createElement("img")
			img2.src = json['games']['euw']['teams'][2*i+1]['logo']
			img2.width = 50
			img2.height = 50
			teamlogo2.className+="logo";

			teamlogo1.appendChild(img1)
			teamlogo2.appendChild(img2)

			/*= document.createElement("td")
			var team2 = document.createElement("td")
			var vs = document.createElement("td")
			vs.innerHTML = "vs"
			*/
			var rounds = document.createElement("td")
			rounds.className+= "tableCell";
			rounds.innerHTML = "best of 3"
			var date = document.createElement("td")
			date.className+= "tableCell";
			date.innerHTML = static_dates[i]
			var time = document.createElement("td")
			time.className+= "tableCell";
			time.innerHTML = static_hour[i]
		/***********************/
		game_tab.appendChild(teamlogo1)
		game_tab.appendChild(teamcells)
		game_tab.appendChild(teamlogo2)
		game_tab.appendChild(rounds)
		game_tab.appendChild(date)
		game_tab.appendChild(time)
		games_list.appendChild(game_tab)
	}

	document.body.appendChild(games_list)
});
}
