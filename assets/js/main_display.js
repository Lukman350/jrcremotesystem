class RadioDisplay {
	radioElement;
	dataRadio;

	constructor(
		element,
		data,
	) {
		this.radioElement = element;
		this.dataRadio = data;
	}

	set data({ key, value }) {
		this.dataRadio[key] = value;
	}

	radioTemplate(data) {
		const template = getRadioTemplates(data);
		return template;
	}
}

const formSubmit = (form, url, data, callback) => {
	$(form).on("submit", function (event) {
		event.preventDefault();

		$.ajax({
			url: url,
			type: "POST",
			data: data,
			dataType: "JSON",
			success: function (result) {
				if (result.status) {
					callback(result);
				} else {
					notifError("There are any trouble in processing data.");
				}
			},
			error: function () {
				notifError("There are any trouble in processing data.");
			},
		});
	});
};


const getRadioData = async (id, type, ip, name, callback) => {
	await $.ajax({
		url: "main/get_radio",
		data: {
			id: id,
			type: type,
			ip_address: ip,
			name: name
		},
		type: "POST",
		dataType: "JSON",
		success: function (result) {
			if (result.status) {
				callback(result);
			} else {
				callback(result);
			}
		},
		error: function (error) {
			notifError(error);
		},
	});
};

// const sendReloadData = (type, ip) => {
// 	const radio_length = 11;

// 	for (let i = 1; i <= radio_length; i ++) {
// 		getRadioData(i, type, ip, (result) => {
// 			// const id = $("button[data-id]")
// 		})
// 	}
// }

const loader = (element) => {
	element.html(`
		<div class="loader-wrapper">
			<div class="loader"></div>
		</div>
	`);
};

$(document).ready(function () {
	$(".form-control").change(function () {
		$(this).removeClass("is-invalid");
		$(this).next().empty();
	});

	const radioDisplay = $("#radio-display");

	loader(radioDisplay);

	$(document).on("click", "#btn-vhf", async function () {
		const id = $(this).data("id");
		const ip = $(this).data("ip");
		const type = $(this).data("type");
		const name = $(this).data("name");

		loader(radioDisplay);

		await getRadioData(id, type, ip, name, function (result) {
			const radio = new RadioDisplay(radioDisplay, result.data);
			const html = radio.radioTemplate(radio.dataRadio);
			radio.radioElement.html(html);

			$("#power-btn").on("click", () => {
				const data = {
					key: "status",
					value: $("#radio-status").html() === "ON" ? 0 : 1,
				};

				radio.data = data;

				if (data.value == 1) {
					$("#radio-status").html("ON");
					$("#radio-status-div").removeClass("bg-danger");
					$("#radio-status-div").addClass("bg-green");
					$("#power-btn").html("OFF");
					$("#power-btn").removeClass("btn-custom");
					$("#power-btn").addClass("btn-danger");
				} else {
					$("#radio-status").html("OFF");
					$("#radio-status-div").removeClass("bg-green");
					$("#radio-status-div").addClass("bg-danger");
					$("#power-btn").html("ON");
					$("#power-btn").removeClass("btn-danger");
					$("#power-btn").addClass("btn-custom");
				}
			});

			$("#tx-power-btn").on("click", () => {
				const data = {
					key: "tx_level",
					value: $("#tx-power-btn").html() === "RATED" ? 0 : 100,
				};

				radio.data = data;
				$("#tx-power-btn").html(data.value == 100 ? "RATED" : "OFF");
			});

			$("#channel-input").on("change", () => {
				const value = $("#channel-input").val();

				if (value < 1 || value > 99) {
					$("#channel-input").addClass("is-invalid");

					return;
				} else {
					$("#channel-input").removeClass("is-invalid");
				}

				const data = {
					key: "channel",
					value,
				};

				radio.data = data;
				$("#channel-number-1").html(data.value);
			});

			// $("#tx-power-form").on("submit", (event) => {
			// 	event.preventDefault();

			// 	const value = $("#tx-power-input").val();

			// 	if (value < 0 || value > 100) {
			// 		$("#tx-power-input").addClass("is-invalid");

			// 		return;
			// 	}

			// 	$("#tx-power-input").removeClass("is-invalid");

			// 	const data = {
			// 		key: "tx_level",
			// 		value,
			// 	};

			// 	radio.data = data;
			// 	$("#tx-level-bar").css("height", `${data.value}%`);
			// 	$("#tx-level-bar").attr("aria-valuenow", data.value);
			// 	$("#tx-level-value").html(`${data.value}`);
			// 	$("#tx-level-value").css("bottom", `calc(75px + ${data.value}px)`);
			// });
		});
	});
});

function action(type) {
	let data_input;
	let api_url;
	let kode_aksi;

	switch (type) {
		case "channel_set":
			data_input = $("#channelinput").val();
			api_url = "ch_set.cgi";
			kode_aksi = "channel";
			break;

		case "power_set":
			data_input = $("#powerselect").val();
			api_url = "sel_set.cgi";
			kode_aksi = "powerreduction";
			break;

		case "sq_set":
			data_input = $("#sqselect").val();
			api_url = "sel_set.cgi";
			kode_aksi = "sqselect";
			break;

		case "sqlevel_set":
			data_input = $("#sqlevelinput").val();
			api_url = "sq_lvl_set.cgi";
			kode_aksi = "sqlevel";
			break;

		case "squplimit_set":
			data_input = $("#squplimitinput").val();
			api_url = "sq_uplim_set.cgi";
			kode_aksi = "squplimit";
			break;

		case "reset_alarm":
			data_input = "";
			api_url = "alm_set.cgi";
			kode_aksi = "reset";
	}

	$.ajax({
		url: "main/action_post",
		type: "POST",
		data: {
			data_send: data_input,
			url: api_url,
			kode: kode_aksi,
		},
		dataType: "JSON",
		success: function (result) {
			if (result.status) {
				notifSuccess(result.message);
			} else {
				notifError();
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			notifError();
		},
	});
}

function notifSuccess(text) {
	$.notify(
		{
			// options
			icon: "flaticon-success",
			title: "Success!",
			message: text,
		},
		{
			// settings
			element: "body",
			position: null,
			type: "success",
			allow_dismiss: true,
			newest_on_top: false,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "right",
			},
			offset: 20,
			spacing: 10,
			z_index: 1031,
			delay: 2000,
			timer: 800,
			url_target: "_blank",
			mouse_over: null,
			animate: {
				// enter: 'animated flipInX',
				// exit: 'animated flipOutX',
				enter: "animated bounceIn",
				exit: "animated bounceOut",
			},
			onShow: null,
			onShown: null,
			onClose: null,
			onClosed: null,
			icon_type: "class",
		}
	);
}

function notifError(message = null) {
	$.notify(
		{
			// options
			icon: "flaticon-error",
			title: "Error!",
			message: message == null ? "There are any trouble in procesing data" : message,
		},
		{
			// settings
			element: "body",
			position: null,
			type: "danger",
			allow_dismiss: true,
			newest_on_top: false,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "right",
			},
			offset: 20,
			spacing: 10,
			z_index: 1031,
			delay: 5000,
			timer: 1000,
			url_target: "_blank",
			mouse_over: null,
			animate: {
				enter: "animated bounceIn",
				exit: "animated bounceOut",
			},
			onShow: null,
			onShown: null,
			onClose: null,
			onClosed: null,
			icon_type: "class",
		}
	);
}
