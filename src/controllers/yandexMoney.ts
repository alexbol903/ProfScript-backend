import { Request, Response, NextFunction } from 'express';
import log from '../config/log';
import YandexMoneyModel from '../models/yandexMoney';
import sentScriptToEmail from '../services/sendScript';

const NAMESPACE = 'YandexMoneyController';

const createYandexMoneyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Валидировать входящие данные
    const data = await req.body;

    const isSended = await sentScriptToEmail(data.email);
    if (isSended) {
      data['send_script'] = true;
    }

    const yandexMoney = new YandexMoneyModel(data);
    const result = await yandexMoney.save();
    if (result) {
      log.info(NAMESPACE, 'New yandex money data saved!');

      return res.status(204).json({});
    }
  } catch (err) {
    const error = err as Error;
    log.error(NAMESPACE, error.message, error);

    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export { createYandexMoneyController };
