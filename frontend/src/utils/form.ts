import type { Application } from "./model";

const initForm: Application = {
  id: undefined,
  app_name: "",
  last_name: "",
  first_name: "",
  middle_name: "",
  birth_date: "",
  sex: "",
  height: 0,
  address_street_unit: "",
  address_street_num: "",
  address_street_name: "",
  address_po: "",
  city: "",
  province: "",
  postal_code: "",
  submitted: 0,
};

export default initForm;
