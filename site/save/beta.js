

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());



function main(){
	var region = 'euw';
	var team = 'fnatic';
	var games_list = document.getElementById("team_players")
	$.getJSON("teams.json", function(json) {
		var team_info = json['games'][region]['teams'][0] //nao pode ser 0, mas convem ter a posicao
		console.log(team_info)
		var team_logo = document.getElementById("team_logo")
		var img_logo =document.createElement("img") 
		img_logo.src = team_info['logo']
		img_logo.width = 125
		img_logo.height = 125
		team_logo.append(img_logo)
		document.getElementById("team_name").innerHTML = team_info['name']

		
	}
	)
}
