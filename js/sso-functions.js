var userDate, userTime, userPersons, userTable;

// Slideshow
var slideIndex = 1;
showDivs(slideIndex);

function sidebar_open() {
	//document.getElementById("sidebar-navi").style.width = "100%";
	document.getElementById("sidebar-navi").style.display = "block";
}

function sidebar_close() {
	document.getElementById('sidebar-navi').style.display = 'none';
}

function plusDivs(n) {
	showDivs(slideIndex += n);
}

function showDivs(n) {
	var i;
	var x = document.getElementsByClassName("intro-slides");
	if (n > x.length) {slideIndex = 1}
	if (n < 1) {slideIndex = x.length}
	for (i = 0; i < x.length; i++) {
	  x[i].style.display = "none";  
	}
	x[slideIndex-1].style.display = "block";  
}



/* Form Validation of Reservation */
function validateForm1() {
	// validate current date and time
	var today = new Date();
	var month, day, year, hours, minutes, today_date, today_time;
	
	month = '' + (today.getMonth()+1);
	day = '' + today.getDate();
	year = today.getFullYear();
	
	if (month.length < 2) {
		month = '0' + month;
	}
	if (day.length < 2) {
		day = '0' + day;
	}
	
	today_date = [year, month, day].join('-');
	
	//var today_time = today.getHours() + ':' + today.getMinutes();
	minutes = today.getMinutes();
	hours = today.getHours();
	
	if (minutes.length < 2) {
		minutes = '0' + minutes;
	}
	if (hours.length < 2) {
		hours = '0' + hours;
	}
	today_time = [hours, minutes].join(':');
	
	// add data to summary table
	
	// check if date and time isnt in the past
	userDate = document.getElementById('my-date').value;
	userTime = document.getElementById('my-time').value;
	userPersons = document.getElementById('my-persons').value;
	
	if (userDate.localeCompare(today_date) == -1) {
		alert('Das Datum liegt in der Vergangenheit! Bitte wählen Sie ein zukünftiges Datum aus.');
		return;
	}
	
	/*if (userTime.localeCompare(today_time) == -1) {
		alert('Die Uhrzeit liegt in der Vergangenheit! Bitte wählen Sie eine zukünftige Zeit aus.');
		return;
	}*/
	
	plusDivs(1);
}


function removeTable() {
	userTable = '';
	document.getElementById('current-table').innerHTML = '';
	plusDivs(-1);
}



function selectTable(tableNb) {
	userTable = tableNb;
	document.getElementById('current-table').innerHTML = userTable;
}



function validateTable() {
	if (userTable) {
		plusDivs(1);
	} else {
		alert('Leider wurde noch kein Tisch ausgewählt');
	}
}




function validateContact() {
	document.getElementById('sel-vorname').innerHTML = document.getElementById('my-first-name').value;
	document.getElementById('sel-nachname').innerHTML = document.getElementById('my-name').value;
	document.getElementById('sel-phone').innerHTML = document.getElementById('my-phone').value;
	document.getElementById('sel-mail').innerHTML = document.getElementById('my-mail').value;
	
	
	document.getElementById('sel-date').innerHTML = userDate;
	document.getElementById('sel-time').innerHTML = userTime;
	document.getElementById('sel-persons').innerHTML = userPersons;
	document.getElementById('sel-table').innerHTML = userTable;
	
	plusDivs(1);
}


function menuSelect() {
	// get selection
	var selected_starter = document.getElementById('my-starter');
	
	if (selected_starter.selectedIndex > 0) {
		document.getElementById('sel-starter').innerHTML = selected_starter.options[selected_starter.selectedIndex].innerHTML;
	} else {
		document.getElementById('sel-starter').innerHTML = "";
	}
	
	var selected_main = document.getElementById('my-main');
	
	if (selected_main.selectedIndex > 0) {
		document.getElementById('sel-main').innerHTML = selected_main.options[selected_main.selectedIndex].innerHTML;
	} else {
		document.getElementById('sel-main').innerHTML = "";
	}
	
	var selected_dessert = document.getElementById('my-dessert');
	
	if (selected_dessert.selectedIndex > 0) {
		document.getElementById('sel-dessert').innerHTML = selected_dessert.options[selected_dessert.selectedIndex].innerHTML;
	} else {
		document.getElementById('sel-dessert').innerHTML = "";
	}
	
	plusDivs(1);
}



function init() {
	init_datapol();
	init_impressum();
}

function init_datapol() {
	request_file("docs/datapolicy.txt", "my-datapol");
}

function init_impressum() {
	request_file("docs/impressum.txt", "my-impressum");
}


function request_file(myFilename, myID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	if (this.readyState == 4) {
      if (this.status == 200 || this.status == 0) {
		var mytext, lines, i, res;
		mytext = this.responseText;
		lines = mytext.split("\n");
		
		for (i = 0; i < lines.length; i++) {
		  if (i == 0) {
			res = "<p>" + lines[i] + "</p>";
		  } else {
			res += "<p>" + lines[i] + "</p>";
		  }
		}
	    
		document.getElementById(myID).innerHTML = res;
	  }
	}
  };
  xhttp.open("GET", myFilename, true);
  xhttp.send(null);
}
