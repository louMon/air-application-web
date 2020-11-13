const validateEmail = email => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const validatePass = pass => {
	return pass.length >= 6 ? true : false;
};

export { validateEmail, validatePass };
