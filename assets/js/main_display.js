class RadioDisplay {
	radioElement;
	data;

	constructor(
		element,
		{
			id,
			channel,
			ip_address,
			status,
			rx_level,
			power_level,
			power,
			sequelch,
			remote,
		}
	) {
		this.radioElement = element;
		this.data = {
			id,
			channel,
			ip_address,
			status,
			rx_level,
			power_level,
			power,
			sequelch,
			remote,
		};
	}

	radioTemplate({
		id,
		channel,
		ip_address,
		status,
		rx_level,
		power_level,
		power,
		sequelch,
		remote,
		type,
	}) {
		return `
		<div class="radio-display">
			<h2 class="title">
				Radio ${type}
			</h2>
			<h3 class="section-title my-2">
				Radio Display
			</h3>

			<div class="section">
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
					<div class="p-9 rounded ${status == "1" ? "bg-success" : "bg-danger"}">
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
							id="rx-level-bar-1"
						>
							<span class="text-white" id="rx-level-value-1">
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
							id="power-level-bar-1"
						>
							<span class="text-white" id="power-level-value-1">${power_level}</span>
						</div>
					</div>
					<p
						class="section-item-desc"
					>
						Power Level
					</p>
				</div>
				<div
					class="section-item py-2"
				>
					<div>
						<p
							class="section-item-desc"
						>
							Power
						</p>

						<div
							class="px-7 py-2 rounded ${
								power == "1" ? "bg-success" : "bg-danger"
							} text-white"
							id="power-squelch"
						>
							${power == "1" ? "ON" : "OFF"}
						</div>
					</div>
					<div>
						<p
							class="section-item-desc"
						>
							Squelch
						</p>

						<div
							class="px-7 py-2 rounded ${
								sequelch == "1" ? "bg-success" : "bg-danger"
							} text-white"
							id="power-squelch"
						>
							${sequelch == "1" ? "ON" : "OFF"}
						</div>
					</div>
					<div>
						<p
							class="section-item-desc"
						>
							Remote
						</p>

						<div
							class="px-7 py-2 rounded ${
								remote == "1" ? "bg-success" : "bg-danger"
							} text-white"
						>
							${remote == "1" ? "ON" : "OFF"}
						</div>
					</div>
				</div>
			</div>

			<h3 class="text-sm text-slate-500 font-semibold uppercase my-2">
				Radio Control
			</h3>

			<div class="grid grid-cols-5 grid-rows-2 gap-2">
				<div
					class="flex items-center justify-around flex-col gap-2 outline outline-1 px-2"
				>
					<p
						class="section-item-desc"
					>
						Channel No
					</p>

					<select
						name="channel-no"
						id="channel-no"
						class="py-1 px-4 pr-9 block bg-slate-200 border w-full rounded-full mb-2"
					>
						<option selected disabled>Select Channel</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 px-2"
				>
					<p
						class="section-item-desc"
					>
						Power
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 px-2"
				>
					<p
						class="section-item-desc"
					>
						TX Power
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 px-2"
				>
					<p
						class="section-item-desc"
					>
						Selt Test
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 px-2"
				>
					<p
						class="section-item-desc"
					>
						Squelch
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div class="col-span-4"></div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 px-2"
				>
					<p
						class="section-item-desc"
					>
						Ptt
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
			</div>

			<h3 class="text-sm text-slate-500 font-semibold uppercase my-2">
				Radio Alarm Status
			</h3>

			<div class="grid grid-cols-5 grid-rows-1 gap-2">
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 p-2"
				>
					<p
						class="section-item-desc"
					>
						tx unlock
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 p-2"
				>
					<p
						class="section-item-desc"
					>
						rx unlock
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 p-2"
				>
					<p
						class="section-item-desc"
					>
						low power
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 p-2"
				>
					<p
						class="section-item-desc"
					>
						over heat
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
				<div
					class="flex items-center justify-center gap-2 flex-col outline outline-1 p-2"
				>
					<p
						class="section-item-desc"
					>
						selt test
					</p>

					<button
						class="status-on px-3 py-1 rounded-md shadow focus:shadow-md uppercase"
						type="button"
					>
						ON
					</button>
				</div>
			</div>
		</div>
		`;
	}
}

$(document).ready(function () {
	$(".form-control").change(function () {
		$(this).removeClass("is-invalid");
		$(this).next().empty();
	});

	const radioDisplay = $("#radio-display");

	$(document).on("click", "#btn-vhf", function () {
		const id = $(this).data("id");

		radioDisplay.html(`<div class="loader"></div>`);

		$.ajax({
			url: "main/get_radio",
			type: "POST",
			data: {
				id: id,
			},
			dataType: "JSON",
			success: function (result) {
				if (result.status) {
					console.log(result.data);
					const radio = new RadioDisplay(radioDisplay, result.data);
					const html = radio.radioTemplate(radio.data);
					radio.radioElement.html(html);
				} else {
					notifError();
				}
			},
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
