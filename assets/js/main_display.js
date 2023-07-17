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

	radioTemplate({
		id,
		radioNo,
		channel,
		ip_address,
		status,
		rx_level,
		tx_level,
		power_level,
	}) {
		return `
		<div class="radio-display">
			<h2 class="title">
				Radio ${radioNo}
			</h2>

			<div class="section-container">
				<h3 class="section-title my-2">
					Radio Display
				</h3>

				<div class="section-1">
					<div
						class="section-item py-4"
					>
						<h1
							class="section-item-title"
							id="channel-number-1"
						>
							${channel}
						</h1>
	
						<p
							class="section-item-desc"
						>
							Channel Number
						</p>
					</div>
					<div
						class="section-item py-4"
					>
						<div class="p-9 rounded ${status == "1" ? "bg-green" : "bg-danger"}">
							<span id="radio-status" class="text-white">
								${status == "1" ? "ON" : "OFF"}
							</span>
						</div>
						<p
							class="section-item-desc"
						>
							Radio Status
						</p>
					</div>
					<div
						class="section-item py-2"
					>
						<div class="line-wrapper">
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
						</div>
						<div
							class="bar-wrapper"
						>
							<div
								class="progress-bar bg-danger"
								role="progressbar"
								style="height: ${rx_level}%"
								aria-valuenow="${rx_level}"
								aria-valuemin="0"
								aria-valuemax="100"
								id="rx-level-bar"
							>
								<span class="text-dark" id="rx-level-value" style="bottom: calc(75px + ${rx_level}px)">
									${rx_level}
								</span>
							</div>
						</div>
						<p
							class="section-item-desc"
						>
							RX Level
						</p>
					</div>
					<div
						class="section-item py-2"
					>
						<div class="line-wrapper">
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
						</div>
						<div
							class="bar-wrapper"
						>
							<div
								class="progress-bar bg-danger"
								role="progressbar"
								style="height: ${tx_level}%"
								aria-valuenow="${tx_level}"
								aria-valuemin="0"
								aria-valuemax="100"
								id="tx-level-bar"
							>
								<span class="text-dark" id="tx-level-value" style="bottom: calc(75px + ${tx_level}px)">${tx_level}</span>
							</div>
						</div>
						<p
							class="section-item-desc"
						>
							TX Level
						</p>
					</div>
					<div
						class="section-item py-2"
					>
						<div class="line-wrapper">
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
							<div class="line-number"></div>
						</div>
						<div
							class="bar-wrapper"
						>
							<div
								class="progress-bar bg-danger"
								role="progressbar"
								style="height: ${power_level}%"
								aria-valuenow="${power_level}"
								aria-valuemin="0"
								aria-valuemax="100"
								id="power-level-bar"
							>
								<span class="text-dark" id="power-level-value" style="bottom: calc(75px + ${power_level}px)">${power_level}</span>
							</div>
						</div>
						<p
							class="section-item-desc"
						>
							Power Level
						</p>
					</div>
				</div>
			</div>

			<div class="section-container">
				<h3 class="section-title">
					Radio Control
				</h3>

				<div class="section-2">
					<div
						class="section-item px-2"
					>
						<p
							class="section-item-desc"
						>
							Channel No
						</p>

						<form id="channel-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
							<input
								type="number"
								class="form-control"
								id="channel-input"
								value="${channel}"
								placeholder="Enter Channel Number"
							/>
							<button class="btn btn-sm btn-primary" type="submit">
								SET
							</button>
						</form>
					</div>
					<div
						class="section-item px-2"
					>
						<p
							class="section-item-desc"
						>
							Power
						</p>

						<form id="power-reduction-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
							<select
								class="form-control"
								id="power-reduction-input"
								placeholder="Select Power Reduction Value"
							>
								<option value="0">0%</option>
								<option value="25">25%</option>
								<option value="50">50%</option>
								<option value="75">75%</option>
								<option value="100">100%</option>
							</select>
							<button class="btn btn-sm btn-primary" type="submit">
								SET
							</button>
						</form>
					</div>
					<div
						class="section-item px-2"
					>
						<p
							class="section-item-desc"
						>
							TX Power
						</p>

						<form id="sq-select-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
							<select
								class="form-control"
								id="sq-select-input"
								placeholder="Select SQ Value"
							>
								<option value="0">0</option>
								<option value="1">1</option>
							</select>
							<button class="btn btn-sm btn-primary" type="submit">
								SET
							</button>
						</form>
					</div>
					<div
						class="section-item px-2"
					>
						<p
							class="section-item-desc"
						>
							Selt Test
						</p>
						
						<form id="sq-level-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
							<input type="hidden" id="radio_id" value="${id}" />
							<input
								type="number"
								class="form-control"
								id="sq-level-input"
								placeholder="Enter SQ Level"
							/>
							<button class="btn btn-sm btn-primary" type="submit">
								SET
							</button>
						</form>
					</div>
					<div
						class="section-item px-2"
					>
						<p
							class="section-item-desc"
						>
							Squelch
						</p>
						
						<form id="sq-up-limit-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
							<input
								type="number"
								class="form-control"
								id="sq-up-limit-input"
								placeholder="Enter SQ Up Limit"
							/>
							<button class="btn btn-sm btn-primary" type="submit">
								SET
							</button>
						</form>
					</div>
					<div class="col-span-4"></div>
					<div
						class="section-item px-2 my-2"
					>
						<p
							class="section-item-desc"
						>
							ptt
						</p>

						<button
							class="btn btn-sm btn-block btn-primary"
							type="button"
							id="btn-reset-alarm"
						>
							RESET
						</button>
					</div>
				</div>
			</div>

			<div class="section-container">
				<h3 class="section-title">
					Radio Alarm Status
				</h3>

				<div class="section-3">
					<div class="row">
						<div class="col">
							<button class="btn btn-success btn-block mb-4" id="alm_RxUnitPsFail">RX UNIT PS FAIL</button>
							<button class="btn btn-success btn-block mb-5" id="alm_RxPllUnlock">RX PLL UNLOCK</button>
							<button class="btn btn-success btn-block mb-4" id="alm_TxUnitPsFail">TX UNIT PS FAIL</button>
							<button class="btn btn-success btn-block mb-5" id="alm_TxOutputFail">TX OUTPUT FAIL</button>
							<button class="btn btn-success btn-block mb-4" id="alm_TxPllUnlock">TX PLL UNLOCK</button>
							<button class="btn btn-success btn-block mb-5" id="alm_PfPowerFail">PF POWER FAIL</button>
						</div>
						<div class="col">
							<button class="btn btn-success btn-block mb-4" id="alm_PaUnitPsFail">PA UNIT PS FAIL</button>
							<button class="btn btn-success btn-block mb-5" id="alm_PaTempFail">PA TEMP FAIL</button>
							<button class="btn btn-success btn-block mb-4" id="alm_CtrlUnitPsFail">CTRL UNIT PS FAIL</button>
							<button class="btn btn-success btn-block mb-5" id="alm_PsUnitFail">PS UNIT FAIL</button>
							<button class="btn btn-success btn-block mb-4" id="alm_FanFail">FAN FAIL</button>
							<button class="btn btn-success btn-block mb-5" id="alm_PaPowerFail">PR POWER FAIL</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
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

			formSubmit(
				"#sq-level-form",
				"api/sq_level",
				{
					sq_level: $("#sq-level-input").val(),
					radio_id: $("#radio_id").val(),
				},
				function (result) {
					$("#sq-level-bar")
						.css("height", `${result.data.sq_level}%`)
						.attr("aria-valuenow", result.data.sq_level);

					$("#sq-level-value").html(`${result.data.sq_level}`);
				}
			);

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
				$("#power-level-bar").css("height", `${data.value}%`);
				$("#power-level-bar").attr("aria-valuenow", data.value);
				$("#power-level-value").html(`${data.value}`);
				$("#power-level-value").css("bottom", `calc(75px + ${data.value}px)`);

				console.log("power-level", radio.dataRadio);
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
