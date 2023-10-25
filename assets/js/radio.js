const setTemplate = (data) => {};

const getAllRadio = async () => {
	const response = await $.ajax({
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

	return response;
};

const getRadio = async (allRadio) => {
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
				type: "GET",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(
						"Authorization",
						`Basic ${btoa(`${auth.username}:${auth.password}`)}`,
						"Access-Control-Allow-Origin",
						"*",
						"Access-Control-Allow-Credentials",
						"true"
					);
				},
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

(async () => {
	const allRadio = await getAllRadio();

	setInterval(getRadio(allRadio), 5 * 60 * 1000);

	getRadio(allRadio);
})();
