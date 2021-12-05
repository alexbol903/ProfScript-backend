import nodemailer from 'nodemailer';
import log from '../config/log';
import config from '../config/config';

const NAMESPACE = 'SendScript';
const { login, password, from, scriptLink } = config.email;

const sentScriptToEmail = async (email: string): Promise<boolean> => {
  if (!email) {
    log.warn(NAMESPACE, 'Email is empty');
    return false;
  }

  try {
    let transporter = nodemailer.createTransport({
      service: 'Yandex',
      auth: {
        user: login,
        pass: password,
      },
    });

    const info = await transporter.sendMail({
      from,
      to: email,
      subject: 'Cкрипт двери купе для Базис мебельщик',
      html: `
      <h3>Здравствуйте!</h3>
      <p>Скрипт для скачивания <a href="${scriptLink}">ссылка на яндекс диск</a></p>
      `,
    });

    const status = parseInt(info.response);
    if (status >= 200 && status < 300) {
      log.info(NAMESPACE, 'Email is sended');
      return true;
    }

    log.info(NAMESPACE, 'Email is not sended');
    return false;
  } catch (err) {
    const error = err as Error;
    log.error(NAMESPACE, error.message, error);
    return false;
  }
};

export default sentScriptToEmail;
