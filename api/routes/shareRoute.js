import shareController from '../controllers/shareController';
import express from 'express';

const router = express.Router();

const { createIdea } = shareController;

router.post('/idea', createIdea);

export default router;