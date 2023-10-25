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
			radio.type === "VHF" || radio.type.includes("VHF")
				? "/index_get.cgi"
				: "/status_get.cgi";
		const auth =
			radio.type === "VHF" || radio.type.includes("VHF")
				? { username: "root", password: "/admin/" }
				: { username: "jrc", password: "aaaa" };

		let data;

		if (radio.type === "VHF" || radio.type.includes("VHF")) {
			data = await fetch(`http://${radio.ip_address}${endpoint}`, {
				mode: "no-cors",
				headers: {
					Authorization: "Basic " + btoa(`${auth.username}:${auth.password}`),
				},
			})
				.then((response) => response.json())
				.catch((error) => notifError(error));
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
