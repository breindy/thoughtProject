import { Share } from '../db/models';

/**
 * @description Share Controller
 * @class ShareController
 */
class shareController {
    /**
     * @description create ideas
     * @params {object} req
     * @params {object} res
     * @returns {object} Idea
     * @memberof ShareController
     */
    static async createIdea(req, res) {
        try {
            const { message } = req.body
            const idea = await Share.create({
                userId: 'first',
                body: message
            });

            return res.status(201).json({
                status: 201,
                data: idea
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                data: error.message
            })
        }

    }
}

export default shareController;