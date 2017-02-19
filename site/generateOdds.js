const upcoming_matches = [
    {
      "team_name1":"Unicorns Of Love",
			"team_logo1": "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/unicorns-of-love-ih8ytfi8.png",
      "team_region1": "euw",
      "team_name2": "Misfits",
      "team_region2": "euw",
			"team_logo2": "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/misfits-8fnvxt30.png",
      "date": "02-03-2017 15:00",
    },
    {
      "team_name1":"Fnatic",
      "team_region1": "euw",
			"team_logo1": "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/fnatic-i09wrkpf.png",
      "team_name2": "H2K",
      "team_region2": "euw",
			"team_logo2": "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/h2k-6mbalx6s.png",
      "date": "02-03-2017 19:00",
    },
    {
      "team_name1":"G2 Esports",
      "team_region1": "euw",
			"team_logo1": "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/g2-esports-cbnyfbkl.png",
      "team_name2": "Team Vitality",
      "team_region2": "euw",
			"team_logo2": "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/vitality-2eb9w6iv.png",
      "date": "03-03-2017 16:00",
    },
    {
      "team_name1":"Splyce",
      "team_region1": "euw",
			"team_logo1" : "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/splyce-gyo3tr9y.png",
      "team_name2": "Giants",
      "team_region2": "euw",
			"team_logo2" : "https://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/giants-gaming-96kph40s.png",
      "date": "03-03-2017 19:00",
    },
    {
      "team_name1":"FlyQuest",
      "team_region1": "euw",
			"team_logo1": "http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/flyquest-89bnqpyh.png",
      "team_name2": "TSM",
      "team_region2": "euw",
			"team_logo2": "http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/team-solomid-cg2byxoe.png",
      "date": "19-02-2017 20:00",
    },
    {
      "team_name1":"Immortals",
      "team_region1": "euw",
			"team_logo1": "http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/immortals-7frapkxr.png",
      "team_name2": "Echo Fox",
      "team_region2": "euw",
			"team_logo2": "http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/echo-fox-ejngzoa3.png",
      "date": "19-02-2017 20:00",
    },
    {
      "team_name1":"Phoenix1",
			"team_logo1":"http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/phoenix1-fw17w8yu.png",
      "team_region1": "euw",
      "team_name2": "Cloud9",
      "team_region2": "euw",
			"team_logo2": "http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/cloud9-gnd9b0gn.png",
      "date": "19-02-2017 23:00",
    },
    {
      "team_name1":"Team Liquid",
      "team_region1": "euw",
			"team_logo1": "http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/team-liquid-3g983dra.png",
      "team_name2": "CLG",
      "team_region2": "euw",
			"team_logo2": "http://am-a.akamaihd.net/image/?f=https://lolstatic-a.akamaihd.net/esports-assets/production/team/counter-logic-gaming-7wsrm3cc.png",
      "date": "19-02-2017 23:00",
		}
];

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

function main(){
	Object.entries(upcoming_matches).forEach(
		([key, value]) => displayMatchInfo(key, value)
	);
}

function displayMatchInfo(key, value){
	var team_name1 = value["team_name1"];
	var team_region1 = value["team_region1"];
	var team_logo1 = value["team_logo1"];
	var team_name2 = value["team_name2"];
	var team_region2 = value["team_region2"];
	var team_logo2 = value["team_logo2"];
	var game_date = value["date"];

	var games_list = document.getElementById("UPGames")
	var game_tab = document.createElement("tr")
	game_tab.id = team_name1 + "_" + team_region1 + "_" + team_name2 + "_" + team_region2;

	/***********************/

	var teamlogo1 = document.createElement("td")
	var img1 = document.createElement("img")
	img1.src = team_logo1;
	img1.width = 50
	img1.height = 50
	teamlogo1.className+="logo";

	var teamcells = document.createElement("td")
	teamcells.className+= "teamNames";
	teamcells.innerHTML = team_name1 + " vs " + team_name2

	var teamlogo2 = document.createElement("td")
	var img2 = document.createElement("img")
	img2.src = team_logo2
	img2.width = 50
	img2.height = 50
	teamlogo2.className+="logo";

	teamlogo1.appendChild(img1)
	teamlogo2.appendChild(img2)

	var rounds = document.createElement("td")
	rounds.className+= "tableCell";
	rounds.innerHTML = "BO3"
	var date = document.createElement("td")
	date.className+= "tableCell";
	date.innerHTML = game_date;

	/***********************/

	game_tab.appendChild(teamlogo1);
	game_tab.appendChild(teamcells);
	game_tab.appendChild(teamlogo2);
	game_tab.appendChild(rounds);
	game_tab.appendChild(date);
	game_tab.addEventListener("click", chooseMatch);
	games_list.appendChild(game_tab);

	document.body.appendChild(games_list);
}

function chooseMatch(ev){
	var info = this.id.split("_");
	localStorage.setItem("team_name1", info[0]);
	localStorage.setItem("region1", info[1]);
	localStorage.setItem("team_logo1", this.childNodes[0].childNodes[0].src);
	localStorage.setItem("team_name2", info[2]);
	localStorage.setItem("region2", info[3]);
	localStorage.setItem("team_logo2", this.childNodes[2].childNodes[0].src);
	window.open("http://127.0.0.1:9000/match.html","_self")
}
