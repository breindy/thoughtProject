import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import { User } from '../db/models';

/**
 * @description Authentication Controller
 * @class authController
 */
class authController {
	/**
     * @description Register Controller/Method
     * @static
     * @param {object} req 
     * @param {object} res 
     * @returns {object} newUser
     * @memberof authController
     */
	static async register(req, res) {
		try {
			//gets user typed information and check if it exists in the database
			const { firstName, lastName, email, password } = req.body;
			const emailExists = await User.findOne({
				where: {
					email
				}
			});

			if (emailExists) {
				return res.status(409).json({
					status: 409,
					message: '❌ Email taken. Please register under another email.'
				});
			}

			//if email is not taken hash password with bcrypt and add to db
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			const newUser = await User.create({
				userId: uuidv4(),
				firstName,
				lastName,
				email,
				password: hash
			});

			return res.status(201).json({
				status: 201,
				message: '💯 Account successfully created!',
				info: newUser
			});
		} catch (error) {
			return res.status(500).json({
				status: 500,
				message: error.message
			});
		}
	}
	/**
     * @description Login Controller/Method
     * @static
     * @param {object} req 
     * @param {object} res 
     * @returns {object} existingUser
     * @memberof authController
     */

	static async login(req, res) {
		try {
			//gets user typed information and check if it exists in the database
			const { email, password } = req.body;
			const emailExists = await User.findOne({
				where: {
					email
				},
				raw: true,
				attributes: { exclude: [ 'id', 'createdAt', 'updatedAt' ] }
			});

			//if email exists in the database check for the correct password
			//compare the password in req.body and the database pw
			const comparePassword = bcrypt.compareSync(password, emailExists.password);

			if (!comparePassword) {
				return res.status(400).json({
					status: 400,
					message: '❌ Invalid Password'
				});
			}

			//if email is not taken send generic error message
			if (!emailExists) {
				return res.status(404).json({
					status: 404,
					message: '❌ Invalid Email'
				});
			}
			const { userId, firstName, lastName, email: userEmail } = emailExists;
			const existingUser = { userId, firstName, lastName, userEmail };
			return res.status(200).json({
				status: 200,
				message: '💯 Account matched!',
				info: existingUser
			});
		} catch (error) {
			return res.status(500).json({
				status: 500,
				message: error.message
			});
		}
	}
}

export default authController;
