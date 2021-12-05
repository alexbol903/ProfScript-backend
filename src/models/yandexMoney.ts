import mongoose, { Schema } from 'mongoose';
import { IYandexMoney } from '../types/yandexModey';

const YandexMoneySchema: Schema = new Schema(
  {
    amount: { type: String, required: true },
    codepro: { type: Boolean, required: true },
    currency: { type: String, required: true },
    datetime: { type: String, required: true },
    notification_type: { type: String, required: true },
    operation_id: { type: String, required: true },
    sha1_hash: { type: String, required: true },
    send_script: { type: Boolean, required: true, default: false },
    email: String,
    unaccepted: Boolean,
    withdraw_amount: String,
    operation_label: String,
    label: String,
    bill_id: String,
    building: String,
    city: String,
    fathersname: String,
    firstname: String,
    lastname: String,
    flat: String,
    phone: String,
    sender: String,
    street: String,
    suite: String,
    zip: String,
    test_notification: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model<IYandexMoney>('YandexMoneyModel', YandexMoneySchema, 'YandexMoney');
