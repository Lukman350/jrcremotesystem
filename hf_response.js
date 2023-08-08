var http_req;
var e_mode_string = ["CW", "SSB-F", "SSB-R", "SSB-S", "FSK"];

function init_page() {
	init_channel_list();
	init_maxlength();
	setInterval(reload_request, 1000); // start auto reload
}

function init_channel_list() {
	var ch_list = document.getElementById("ch_list");
	var list_item = document.getElementById("list_item");

	if (!ch_list || !list_item) {
		return;
	}

	var height = ch_list.offsetParent.clientHeight - ch_list.offsetTop - 20;
	ch_list.style.height = height + "px";

	for (var i = 0; i < 100; i++) {
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
	document.getElementById("set_freq").value = document.getElementById(
		"freq" + ch
	).value;
	document.getElementById("set_em").value = document
		.getElementById("em" + ch)
		.getAttribute("select-idx");
	document.getElementById("set_po").value = document.getElementById(
		"po" + ch
	).value;
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
				if (items[i].className == "set_value") {
					if (items[i].id == "set_freq") {
						value += items[i].id + ":" + items[i].value * 1000 + ";"; // kHz -> Hz
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
	if (http_req.readyState == 4 && http_req.status == 200) {
		var data = eval("(" + http_req.responseText + ")"); // parse JSON

		for (var id in data) {
			var item = document.getElementById(id);

			if (item) {
				if (id == "rmt_sw") {
					item.innerHTML = data[id] ? "Remote" : "Local";
					item.className = data[id] ? "remote" : "local";

					var items = document.getElementsByTagName("input");
					for (var i = 0; i < items.length; i++) {
						if (items[i].className == "set_button") {
							items[i].disabled = !data[id];
						}
					}
				} else if (id == "sts_em" || id.match(/^em\d+$/)) {
					item.value = e_mode_string[data[id]];
					item.setAttribute("select-idx", data[id]);
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
