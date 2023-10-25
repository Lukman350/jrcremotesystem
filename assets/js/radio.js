const setTemplate = (data) => {};

let allRadio;
const getAllRadio = async () => {
	allRadio = await $.ajax({
		url: "main/getAllRadio",
		type: "GET",
		dataType: "JSON",
		success: function (result) {
			return result;
		},
		error: function (error) {
			notifError(error);
		},
	});
};

const getRadio = async () => {
	for (const radio of allRadio.data) {
		const endpoint =
			radio.type === "VHF" || radio.type.contains("VHF")
				? "/index_get.cgi"
				: "/status_get.cgi";
		const auth =
			radio.type === "VHF" || radio.type.contains("VHF")
				? { username: "root", password: "/admin/" }
				: { username: "jrc", password: "aaaa" };

		let data;

		if (radio.type === "VHF" || radio.type.contains("VHF")) {
			data = await $.ajax({
				url: `http://${radio.ip_address}${endpoint}`,
				username: auth.username,
				password: auth.password,
				type: "GET",
				dataType: "JSON",
				success: function (result) {
					return result;
				},
				error: function (error) {
					notifError(error);
				},
			});
		} else {
			data = await $.ajaxDigest(`http://${radio.ip_address}${endpoint}`, {
				username: auth.username,
				password: auth.password,
			})
				.done(function (result) {
					return result;
				})
				.fail(function (error) {
					notifError(error);
				});
		}
		console.log(data);
	}
};

getAllRadio();

setInterval(getRadio, 5 * 60 * 1000);

getRadio();
