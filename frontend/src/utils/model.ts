export interface AppName {
  app_name: string;
}

export interface CreatedForm extends AppName {
  id?: number;
}

export interface FormBody extends AppName {
  last_name: string;
  first_name: string;
  middle_name: string;
  birth_date: string;
  sex: string;
  height: number;
  address_street_unit: string;
  address_street_num: string;
  address_street_name: string;
  address_po: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface Application extends FormBody {
  id?: number | undefined;
  submitted: number;
}

export type ReducerState = {
  status: string;
  error?: any;
  data?: any;
};

export type RadioSchema = {
  label: string;
  value: string;
};

export type ENFR = {
  en: string;
  fr: string;
  err?: ENFR;
  res?: ENFR;
};

export interface TextHomeContext {
  title: ENFR;
  subtitle: ENFR;
  new: ENFR;
  create: ENFR;
  new_application_name: ENFR;
  resume: ENFR;
  notFound: ENFR;
  back: ENFR;
  loading: ENFR;
  wait: ENFR;
}

export interface TextFormContext {
  app_name: ENFR;
  save: ENFR;
  last_name: ENFR;
  first_name: ENFR;
  middle_name: ENFR;
  birth_date: ENFR;
  sex: ENFR;
  m: ENFR;
  f: ENFR;
  x: ENFR;
  height: ENFR;
  address_street_unit: ENFR;
  address_street_num: ENFR;
  address_street_name: ENFR;
  address_po: ENFR;
  city: ENFR;
  postal_code: ENFR;
  submit: ENFR;
  required: ENFR;
  required_po: ENFR;
  required_address: ENFR;
  required_height: ENFR;
}

export interface TextContext {
  home: TextHomeContext;
  formPage: TextFormContext;
}

export type LangThemeContext = {
  lang: string;
  theme: string;
  toggleLang: (l: string) => void;
  toggleTheme: (t: string) => void;
};
