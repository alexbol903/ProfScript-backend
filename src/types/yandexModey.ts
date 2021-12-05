import { Document } from 'mongoose';

export interface IYandexMoney extends Document {
  amount: string;
  codepro: boolean;
  currency: string;
  datetime: string;
  label: string;
  notification_type: string;
  operation_id: string;
  operation_label: string;
  unaccepted: boolean;
  withdraw_amount: string;
  sha1_hash: string;
  send_script: boolean;
  bill_id: string;
  email?: string;
  building?: string;
  city?: string;
  fathersname?: string;
  firstname?: string;
  lastname?: string;
  flat?: string;
  phone?: string;
  sender?: string;
  street?: string;
  suite?: string;
  zip?: string;
  test_notification?: boolean;
}

export interface IConfig {
  server: IServer;
  mongo: IMongoDB;
  email: IEmail;
}

export interface IServer {
  hostname: string;
  port: number;
}

export interface IMongoDB {
  host: string;
  username: string;
  password: string;
  options: TMongoOptions;
  url: string;
}

export interface IEmail {
  from: string;
  login: string;
  password: string;
  scriptLink: string;
}

export type TMongoOptions = {
  [name: string]: string | number | boolean;
};
