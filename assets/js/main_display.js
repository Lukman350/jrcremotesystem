$(document).ready(function () {
	$(".form-control").change(function () {
		$(this).removeClass("is-invalid");
		$(this).next().empty();
	});

	$(document).on("click", "#btn-vhf", function () {
		const id = $(this).data("id");

		console.log(id);
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
