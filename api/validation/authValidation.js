import validator from 'validator';

/**
 * @description Authentication Validation
 * @class AuthValidation
 */
class authValidation {
	/**
     * @description signup Validation
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} validation
     * @memberof authValidation
     */
	static signupValidation(req, res, next) {
		const { firstName, lastName, email, password } = req.body;

		//Check for spaces in the input, any white spaces and removes them
		const spaces = /\s/g;
		const errors = {};
		const user = {};

		// firstName = firstName.replace(spaces, '');
		// lastName = lastName.replace(spaces, '');
		// email = email.replace(spaces, '');
		// password = password.replace(spaces, '');

		if (!validator.isAlpha(firstName)) {
			errors.firstName = 'First name should not contain numbers or spaces';
		}

		// if (!validator.isEmpty(firstName, { ignore_whitespace: false })) {
		// 	errors.firstName = 'First name cannot be blank.';
		// }

		if (!validator.isLength(firstName, { min: 2, max: 20 })) {
			errors.firstName = 'First name should be between 2-20 characters';
		}

		if (!validator.isLength(lastName, { min: 1, max: 20 })) {
			errors.lastName = 'Last name should be between 1-20 characters';
		}

		if (!validator.isAlpha(lastName)) {
			errors.lastName = 'Last name should not contain numbers.';
		}

		if (!validator.isEmail(email)) {
			errors.email = 'Please enter a valid email';
		}

		if (!validator.isLength(password, { min: 5, max: 10 })) {
			errors.password = 'Password should be between 5-10 characters;';
		}

		//Check if errors exist
		if (Object.keys(errors).length === 0) {
			//goes to the controller
			return next();
		}
		//if errors exists
		return res.status(422).json({
			status: 422,
			data: errors
		});
	}

	/**
     * @description Login Validation
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} validation
     * @memberof authValidation
     */

	static loginValidation(req, res, next) {
		const { email, password } = req.body;

		//Check for spaces in the input, any white spaces and removes them
		const spaces = /\s/g;
		const errors = {};

		// firstName = firstName.replace(spaces, '');
		// lastName = lastName.replace(spaces, '');
		// email = email.replace(spaces, '');
		// password = password.replace(spaces, '');

		if (!validator.isEmail(email)) {
			errors.email = 'Please enter a valid email';
		}

		if (!validator.isLength(password, { min: 5, max: 10 })) {
			errors.password = 'Password should be between 5-10 characters;';
		}

		//Check if errors exist
		if (Object.keys(errors).length === 0) {
			//goes to the controller
			return next();
		}
		//if errors exists
		return res.status(422).json({
			status: 422,
			data: errors
		});
	}
}

export default authValidation;
