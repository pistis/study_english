import express from 'express';
import account from './account';
import idiom from './idiom';

const router = express.Router();
router.use('/account', account);
router.use('/idiom', idiom);

export default router;