export interface AppName {
  appName: string;
}

export interface CreatedForm extends AppName {
  id: number;
}

export interface FormBody extends AppName {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  sex: string;
  height: number;
  addressStreetUnit: string;
  addressStreetNum: string;
  addressStreetName: string;
  addressPO: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface Application extends FormBody {
  id: number | undefined;
  submitted: number;
}

export interface TextLang {
  en?: string;
  fr?: string;
}

export type PageText<T> = {
  [K in keyof T]: TextLang;
};
