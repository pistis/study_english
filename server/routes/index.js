import express from 'express';
import account from './account';
import card from './card';

const router = express.Router();
router.use('/account', account);
router.use('/card', card);

export default router;