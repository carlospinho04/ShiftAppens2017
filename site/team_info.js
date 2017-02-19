const URL_TeamInfo = "http://127.0.0.1:5000/get_players_from_team";
const ev_teaminfo = "GET_TEAM_INFO";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

function main(){
	var team = localStorage.getItem("team");
	var region = localStorage.getItem("region");
	var logo = localStorage.getItem("logo");


	var team_logo = document.getElementById("team_logo");
	var img_logo =document.createElement("img");
	img_logo.className+='fig';
	img_logo.src = logo;
	img_logo.width = 125;
	img_logo.height = 125;
	team_logo.append(img_logo);

	document.getElementById("team_name").innerHTML=team;

	var menu = document.getElementById("current");
	console.log("Teams - " + region.toUpperCase());
	menu.childNodes[0].innerText = "Teams - " + region.toUpperCase();
	var displayTeamInfo = function(ev) {
		document.removeEventListener(ev_teaminfo, displayTeamInfo);
		var team_info = ev.response;
		Object.entries(team_info).forEach(
    	([key, value]) => displayPlayers(key, value)
		);
	}
	document.addEventListener(ev_teaminfo, displayTeamInfo);
	getTeamInfo(team, region);

}

function displayPlayers(key, value){
	console.log(value);
	var team_members = document.getElementById("team_players");
		var player_tr = document.createElement("tr");
		var player_pic = document.createElement("td");
		player_pic.className+="logo";
		var photo = document.createElement("img");
		photo.src = value["logo"];
		photo.height = 62;
		photo.width = 78;
		photo.style.borderRadius = "50%";
		player_pic.append(photo);

		var player_name = document.createElement("td");
		player_name.innerHTML = key;
		player_name.className+= "cell";
		var player_kda = document.createElement("td");
		player_kda.innerHTML = value["KDA"];
		player_kda.className+= "cell";
		var player_wr = document.createElement("td");
		player_wr.innerHTML = value["WinRate"];
		player_wr.className+= "cell";

		player_tr.append(player_pic)
		player_tr.append(player_name)
		player_tr.append(player_kda)
		player_tr.append(player_wr)
		team_members.append(player_tr)

}

function getTeamInfo(team, region){
	var params = '{"team_name":"' + team + '", "region": "' + region + '"}';
	httpGet(URL_TeamInfo, params, ev_teaminfo);
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
