import { TextContext } from "./";

// Select between English and French
const text: TextContext = {
  home: {
    title: {
      en: "Welcome to the Ontario Driver License Application Portal",
      fr: "Bienvenue sur le portail de demande de permis de conduire de l'Ontario",
    },
    subtitle: {
      en: "Please select to view/resume or create a new application",
      fr: "Veuillez sélectionner à afficher/continuer ou créer une nouvelle application",
    },
    new: {
      en: "New",
      fr: "Nouvelle application",
    },
    create: {
      en: "Create",
      fr: "Créer",
    },
    new_application_name: {
      en: "New Application Name",
      fr: "Nouveau nom d'application",
      err: {
        en: "Your app name must be at least 1 character long!",
        fr: "Le nom de votre application doit comporter au moins 1 caractère!",
      },
      res: {
        en: "Successfully created new form! Please wait for redirect...",
        fr: "Nouveau formulaire créé avec succès! Veuillez patienter pendant la redirection...",
      },
    },
    resume: {
      en: "View / Resume application",
      fr: "Afficher / Continuer une application",
    },
    notFound: {
      en: "No Saved Applications Found",
      fr: "Aucune application enregistrée trouvée",
    },
    back: {
      en: "Back",
      fr: "Retourner",
    },
    loading: {
      en: "loading",
      fr: "chargement",
    },
    wait: {
      en: "please wait",
      fr: "please wait",
    },
  },
  formPage: {
    app_name: {
      en: "App Name",
      fr: "Nom d'App",
    },
    save: {
      en: "Save",
      fr: "Enregistrer",
    },
    last_name: {
      en: "Last Name ",
      fr: "Nom ",
    },
    first_name: {
      en: "First Name ",
      fr: "Prénom",
    },
    middle_name: {
      en: "Middle Name ",
      fr: "Deuxième Prénom ",
    },
    birth_date: {
      en: "Date of Birth (MM, DD, YYYY) ",
      fr: "Date de naissance (yy, jj, aaaa) ",
    },
    sex: {
      en: "Sex ",
      fr: "Sexe ",
    },
    m: {
      en: "Male",
      fr: "Homme",
    },
    f: {
      en: "Female",
      fr: "Femme",
    },
    x: {
      en: "Other",
      fr: "Autre",
    },
    height: {
      en: "Height (cm) ",
      fr: "Taille (cm) ",
    },
    address_street_unit: {
      en: "Unit Number ",
      fr: "Numéro d'unité ",
    },
    address_street_num: {
      en: "Street Number ",
      fr: "Numéro de rue ",
    },
    address_street_name: {
      en: "Street Name ",
      fr: "Nom de rue ",
    },
    address_po: {
      en: "PO BOX",
      fr: "CP",
    },
    city: {
      en: "City/Town ",
      fr: "Ville ",
    },
    postal_code: {
      en: "Postal Code",
      fr: "Code postale",
    },
    submit: {
      en: "Submit",
      fr: "Soumettre",
    },
    required: {
      en: "required",
      fr: "requis",
    },
    required_po: {
      en: "required if no civic address entered",
      fr: "requis si aucune adresse civique n'est enregistrée",
    },
    required_address: {
      en: "required if no po/rr entered",
      fr: "requis si aucun po/rr n'est enregistré",
    },
    required_height: {
      en: "required, value must be above 0",
      fr: "requis doit être supérieur à 0",
    },
  },
};

export default text;
