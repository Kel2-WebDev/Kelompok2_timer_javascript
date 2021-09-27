var timers_num;
if (!localStorage.getItem("timers_num")) {
	timers_num = 1;
	localStorage.setItem("timers_num", timers_num)
} else {
	timers_num = localStorage.getItem("timers_num");
}
var timers = document.getElementById("timers");

for (var i = 1; i <= timers_num; i++) {
	var node = new Timer({key: 'timer-kelas-' + i});
	node.setAttribute('id', 'timer-kelas-' + i)
	var headnode = document.createElement("h2");
	headnode.setAttribute("id", "head-timer-kelas-" + i);
    var textnode = document.createTextNode("Timer " + i);
    headnode.appendChild(textnode);
    document.getElementById("timers").appendChild(headnode); 
	document.getElementById("timers").appendChild(node);
}