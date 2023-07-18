class RadioDisplay {
	radioElement;
	dataRadio;

	constructor(
		element,
		radioNo,
		{ id, channel, ip_address, status, rx_level, tx_level, power_level }
	) {
		this.radioElement = element;
		this.dataRadio = {
			id,
			radioNo,
			channel,
			ip_address,
			status,
			rx_level,
			tx_level,
			power_level,
		};
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
					notifError();
				}
			},
			error: function () {
				notifError();
			},
		});
	});
};

const getRadioData = async (id, callback) => {
	await $.ajax({
		url: "main/get_radio",
		data: {
			id: id,
		},
		type: "POST",
		dataType: "JSON",
		success: function (result) {
			if (result.status) {
				callback(result);
			} else {
				notifError();
			}
		},
		error: function () {
			notifError();
		},
	});
};

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

	getRadioData(1, function (result) {
		const radio = new RadioDisplay(radioDisplay, "VHF 1", result.data);
		const html = radio.radioTemplate(radio.dataRadio);
		radio.radioElement.html(html);
	});

	$(document).on("click", "#btn-vhf", async function () {
		const id = $(this).data("id");
		const radioNo = $(this).data("radio-no");

		loader(radioDisplay);

		await getRadioData(id, function (result) {
			const radio = new RadioDisplay(radioDisplay, radioNo, result.data);
			const html = radio.radioTemplate(radio.dataRadio);
			radio.radioElement.html(html);

			$("#channel-form").on("submit", (event) => {
				event.preventDefault();

				const data = {
					key: "channel",
					value: $("#channel-input").val(),
				};

				radio.data = data;
				$("#channel-number-1").html(data.value);
				console.log(radio.dataRadio);
			});

			$("#power-reduction-form").on("submit", (event) => {
				event.preventDefault();

				const data = {
					key: "power_level",
					value: $("#power-reduction-input").val(),
				};

				radio.data = data;
				$("#power-level-bar")
					.css("height", `${data.value}%`)
					.attr("aria-valuenow", data.value);
				$("#power-level-value")
					.html(`${data.value}`)
					.css("bottom", `calc(75px + ${data.value}px)`);
			});

			$("#rx-power-form").on("submit", (event) => {
				event.preventDefault();

				const value = $("#rx-power-input").val();

				if (value < 0 || value > 100) {
					$("#rx-power-input").addClass("is-invalid");

					return;
				}

				$("#rx-power-input").removeClass("is-invalid");

				const data = {
					key: "rx_level",
					value: $("#rx-power-input").val(),
				};

				radio.data = data;
				$("#rx-level-bar").css("height", `${data.value}%`);
				$("#rx-level-bar").attr("aria-valuenow", data.value);
				$("#rx-level-value").html(`${data.value}`);
				$("#rx-level-value").css("bottom", `calc(75px + ${data.value}px)`);
			});

			$("#tx-power-form").on("submit", (event) => {
				event.preventDefault();

				const value = $("#tx-power-input").val();

				if (value < 0 || value > 100) {
					$("#tx-power-input").addClass("is-invalid");

					return;
				}

				$("#tx-power-input").removeClass("is-invalid");

				const data = {
					key: "tx_level",
					value,
				};

				radio.data = data;
				$("#tx-level-bar").css("height", `${data.value}%`);
				$("#tx-level-bar").attr("aria-valuenow", data.value);
				$("#tx-level-value").html(`${data.value}`);
				$("#tx-level-value").css("bottom", `calc(75px + ${data.value}px)`);
			});
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

function notifError() {
	$.notify(
		{
			// options
			icon: "flaticon-error",
			title: "Error!",
			message: "There are any trouble in processing data",
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
