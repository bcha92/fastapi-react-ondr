export interface AppName {
  app_name: string;
}

export interface CreatedForm extends AppName {
  id: number;
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
