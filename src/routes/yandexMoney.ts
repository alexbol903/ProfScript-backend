import express from 'express';
import { createYandexMoneyController } from '../controllers/yandexMoney';

const router = express.Router();

router.post('/ym/create', createYandexMoneyController);

export = router;
