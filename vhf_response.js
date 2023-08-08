var http_req;
var unuse_string = ["UNUSE", "USE"];
var mod_string = ["FM", "Pi/4DQPSK", "Pi/8D8PSKUSE"];
var duplex_string = ["Simplex", "Duplex"];
var band_string = ["25KHz", "12.5KHz"];
var antflt_string = [
	"UNUSE",
	"CH:1",
	"CH:2",
	"CH:3",
	"CH:4",
	"CH:5",
	"CH:6",
	"CH:7",
	"CH:8",
];
var Timer;

function init_page() {
	init_channel_list();
	init_maxlength();
	Timer = setInterval(reload_request, 1000); // start auto reload
}

function init_channel_list() {
	var ch_list = document.getElementById("ch_list");
	var list_item = document.getElementById("list_item");

	if (!ch_list || !list_item) {
		return;
	}

	var height = ch_list.offsetParent.clientHeight - ch_list.offsetTop - 20;
	ch_list.style.height = height + "px";

	//CH:1`99,201`287
	for (var i = 0; i < 99; i++) {
		var new_item = list_item.cloneNode(true);
		var child_items = new_item.getElementsByTagName("input");

		for (var j = 0; j < child_items.length; j++) {
			if (child_items[j].id == "ch") {
				child_items[j].value = i + 1;
			}
			child_items[j].id += i;
		}

		new_item.id += i;
		list_item.parentNode.appendChild(new_item);
	}
	for (var i = 200; i < 287; i++) {
		var new_item = list_item.cloneNode(true);
		var child_items = new_item.getElementsByTagName("input");

		for (var j = 0; j < child_items.length; j++) {
			if (child_items[j].id == "ch") {
				child_items[j].value = i + 1;
			}
			child_items[j].id += i;
		}

		new_item.id += i;
		list_item.parentNode.appendChild(new_item);
	}
	document.getElementById("set_ch").value = "";
	document.getElementById("set_use").value = "";
	document.getElementById("set_mdlt").value = "";
	document.getElementById("set_dupctl").value = "";
	document.getElementById("set_bndwid").value = "";
	document.getElementById("set_antflt").value = "";
	document.getElementById("set_txfreq").value = "";
	document.getElementById("set_rxfreq").value = "";
}

function init_maxlength() {
	var items = document.getElementsByTagName("input");

	for (var i = 0; i < items.length; i++) {
		if (items[i].parentNode.className == "ip_addr") {
			items[i].maxLength = 3;
		}
	}
}

function ch_sel(id) {
	var ch = id.match(/\d+/);

	document.getElementById("set_ch").value = document.getElementById(
		"ch" + ch
	).value;
	document.getElementById("set_use").value = document
		.getElementById("use" + ch)
		.getAttribute("select-idx");
	document.getElementById("set_mdlt").value = document
		.getElementById("mdlt" + ch)
		.getAttribute("select-idx");
	document.getElementById("set_dupctl").value = document
		.getElementById("dupctl" + ch)
		.getAttribute("select-idx");
	document.getElementById("set_bndwid").value = document
		.getElementById("bndwid" + ch)
		.getAttribute("select-idx");
	document.getElementById("set_antflt").value = document
		.getElementById("antflt" + ch)
		.getAttribute("select-idx");
	document.getElementById("set_txfreq").value = document.getElementById(
		"txfreq" + ch
	).value;
	document.getElementById("set_rxfreq").value = document.getElementById(
		"rxfreq" + ch
	).value;
}

function clear_timer() {
	clearInterval(Timer);
	sleep(500);
}

function download_csv() {
	location.href = "ch_csv_get.cgi";
}

function lock_screnn() {
	var locker = document.getElementById("locker");
	if (locker) {
		locker.style.display = "block";
	}
}

function unlock_screnn() {
	var locker = document.getElementById("locker");
	if (locker) {
		locker.style.display = "none";
	}
}

function set_request(id, value) {
	lock_screnn();

	if (arguments.length == 1) {
		var item = document.getElementById(id);
		if (item.className == "group") {
			var items = item.getElementsByTagName("*");
			value = "";

			for (var i = 0; i < items.length; i++) {
				if (
					items[i].className == "set_value" ||
					(id == "ch_reg" && items[i].className == "ro_value")
				) {
					if (items[i].id == "set_txfreq" || items[i].id == "set_rxfreq") {
						value += items[i].id + ":" + items[i].value * 1000000 + ";"; // kHz -> Hz
					} else {
						value += items[i].id + ":" + items[i].value + ";";
					}
				}
			}
		} else {
			value = item.value + ";";
		}
	}
	http_request("POST", id + "_set.cgi", value);
}

function get_request(id) {
	http_request("GET", id + "_get.cgi", null);
}

function reload_request() {
	if (!http_req || http_req.readyState == 4) {
		http_request("GET", "status_get.cgi", null);
	}
}

function reset_request(type) {
	if (confirm("Are you sure you want to reset transmitter?")) {
		http_request("POST", "reset.cgi", type);
	}
}

function http_request(method, url, data) {
	if (!http_req) {
		// Create XMLHttpRequest object
		if (window.XMLHttpRequest) {
			// ie7,8
			http_req = new XMLHttpRequest();
		} else {
			// ie6 (only for debug)
			try {
				http_req = new ActiveXObject("MSXML2.XMLHTTP.6.0");
			} catch (e) {
				try {
					http_req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
				} catch (e) {
					return; // not supported
				}
			}
		}
	} else {
		// Recycle XMLHttpRequest object
		http_req.abort();
	}

	http_req.open(method, url, true);
	http_req.onreadystatechange = http_response;
	if (method == "POST") {
		http_req.setRequestHeader("Content-Type", "text/plain");
	} else {
		http_req.setRequestHeader(
			"If-Modified-Since",
			"Thu, 01 Jun 1970 00:00:00 GMT"
		); // avoid caching
	}
	http_req.send(data);
}

function http_response() {
	var use_num = 0;
	var mdlt_num = 0;
	var dupctl_num = 0;
	var bndwid_num = 0;
	var antflt_num = 0;
	if (http_req.readyState == 4 && http_req.status == 200) {
		var data = eval("(" + http_req.responseText + ")"); // parse JSON

		for (var id in data) {
			var item = document.getElementById(id);

			if (item) {
				if (id == "rmt_sw") {
					item.innerHTML = data[id] ? "Local" : "Remote";
					item.className = data[id] ? "local" : "remote";

					var items = document.getElementsByTagName("input");
					for (var i = 0; i < items.length; i++) {
						if (items[i].className == "set_button") {
							items[i].disabled = data[id];
						}
					}
				} else if (id == "use" + use_num || id.match(/^em\d+$/)) {
					item.value = unuse_string[data[id]];
					item.setAttribute("select-idx", data[id]);
					use_num++;
					if (use_num == 99) {
						use_num = 200;
					}
				} else if (id == "mdlt" + mdlt_num || id.match(/^em\d+$/)) {
					item.value = mod_string[data[id]];
					item.setAttribute("select-idx", data[id]);
					mdlt_num++;
					if (mdlt_num == 99) {
						mdlt_num = 200;
					}
				} else if (id == "dupctl" + dupctl_num || id.match(/^em\d+$/)) {
					item.value = duplex_string[data[id]];
					item.setAttribute("select-idx", data[id]);
					dupctl_num++;
					if (dupctl_num == 99) {
						dupctl_num = 200;
					}
				} else if (id == "bndwid" + bndwid_num || id.match(/^em\d+$/)) {
					item.value = band_string[data[id]];
					item.setAttribute("select-idx", data[id]);
					bndwid_num++;
					if (bndwid_num == 99) {
						bndwid_num = 200;
					}
				} else if (id == "antflt" + antflt_num || id.match(/^em\d+$/)) {
					item.value = antflt_string[data[id]];
					item.setAttribute("select-idx", data[id]);
					antflt_num++;
					if (antflt_num == 99) {
						antflt_num = 200;
					}
				} else if (item.className == "alarm" || item.className == "no_alarm") {
					item.className = data[id] ? "alarm" : "no_alarm";
				} else if (item.tagName == "INPUT" || item.tagName == "SELECT") {
					item.value = data[id];
				} else {
					item.innerHTML = data[id];
				}
			}

			if (id == "error_msg") {
				alert(data[id]); // popup error message
			}
		}
	}
	if (http_req.readyState == 4) {
		unlock_screnn();
	}
}

function sleep(time) {
	var d1 = new Date().getTime();
	var d2 = new Date().getTime();
	while (d2 < d1 + time) {
		d2 = new Date().getTime();
	}
	return;
}
