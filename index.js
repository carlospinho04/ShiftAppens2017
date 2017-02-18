"use strict";



(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

function main(){
}

function chooseRegion(event){
	localStorage.setItem("region", event.target.id);
	window.open("http://127.0.0.1:9000/teams.html","_self")
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
