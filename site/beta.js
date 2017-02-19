

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());



function main(){
	var region = 'euw';
	var team = 'unicorns of love';
	var team_members = document.getElementById("team_players")


	$.getJSON("teams.json", function(json) {
		var team_info = json['games'][region]['teams'][6] //nao pode ser 0, mas convem ter a posicao
		console.log(team_info)
		var team_logo = document.getElementById("team_logo")
		var img_logo =document.createElement("img")
		img_logo.className+='fig'
		img_logo.src = team_info['logo']
		img_logo.width = 125
		img_logo.height = 125
		team_logo.append(img_logo)
	
		document.getElementById("team_name").innerHTML=team_info['name']
		//document.getElementById("team_name").innerHTML = team_info['name']
		console.log(team_info['members'])
		jQuery.each(team_info['members'], function() {
			console.log(this)
			var player_tr = document.createElement("tr")
			var player_pic = document.createElement("td")
			player_pic.className+="logo";
			var photo = document.createElement("img")
			photo.src = this['avatar']
			photo.height = 62
			photo.width = 78
			photo.style.borderRadius = "50%";
			player_pic.append(photo)

			var player_name = document.createElement("td")
			player_name.innerHTML = this['nick']
			player_name.className+= "cell"
			var player_kda = document.createElement("td")
			player_kda.innerHTML = 1.1
			player_kda.className+= "cell"
			var player_wr = document.createElement("td")
			player_wr.innerHTML = 0.5 *100 + ' %'
			player_wr.className+= "cell"




			player_tr.append(player_pic)
			player_tr.append(player_name)
			player_tr.append(player_kda)
			player_tr.append(player_wr)
			team_members.append(player_tr)
		});
	})
}
