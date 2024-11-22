"use client";
import { useReducer, useEffect, useState, useContext, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "../../theme-provider";
import { Header, Text, Radio, Selection, Footer } from "@/components";
import {
  text,
  getOneApplication,
  updateApplication,
  getInitState,
  reducer,
  initForm,
} from "@/utils";

export default function Form({
  params,
}: {
  params: Promise<{ app_id: string }>;
}) {
  const [state, dispatch] = useReducer(reducer, getInitState);
  const [submit, handleSubmit] = useReducer(reducer, getInitState);
  const [form, setForm] = useState(initForm);
  const [porr, setPORR] = useState("");
  const [errorVal, setErrorVal] = useState([]);
  const { formPage } = text;
  const { lang } = useContext(ThemeContext);
  const isSubmitted = state?.data?.body?.submitted === 1; // User should not be able to edit form if already submitted // view only
  const router = useRouter();

  const handleAppSubmit = (final: boolean = false, event: MouseEvent<any>) => {
    event.preventDefault();

    let addressPO = "";
    if (form.address_po.trim().length > 0) {
      if (porr === "RR") {
        addressPO = `${porr} ${form.address_po}`;
      } else {
        addressPO = `${formPage.address_po[lang]} ${form.address_po}`;
      }
    }
    updateApplication(handleSubmit, { ...form, address_po: addressPO }, final);
    if (final && submit.status === "error") {
      setErrorVal(
        submit.error.response.data.detail.split(":")[1].trim().split(", ")
      );
      return;
    }
    if (final && submit.status === "done") {
      router.push("/");
    }
  };

  useEffect(() => {
    if (state.status === "idle") {
      getOneApplication(dispatch, params);
    }
    if (state.data && !state.error && form.address_po.length === 0) {
      const { body } = state.data;
      let parsedPORR = "";
      let parsedPO = "";
      if (body.address_po.trim().length > 0) {
        if (body.address_po[0] === "R" && body.address_po[1] === "R") {
          parsedPORR = "RR";
          parsedPO = body.address_po.trim().split(" ")[1];
        } else if (body.address_po[0] === "R" && body.address_po[1] === "R") {
          parsedPORR = "PO BOX / CP";
          parsedPO = body.address_po.trim().split(" ")[1];
        } else if (body.address_po.includes("PO BOX")) {
          parsedPORR = "PO BOX / CP";
          parsedPO = body.address_po.trim().split("PO BOX ")[1];
        }
      }
      setPORR(parsedPORR);
      setForm({ ...body, address_po: parsedPO });
    }
  }, [
    params,
    state.status,
    state.data,
    state.error,
    submit.status,
    submit.data,
    submit.error,
    form.address_po.length,
  ]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header
        showTitle={form.app_name}
        headerName={form.app_name}
        headerLabel={formPage.app_name[lang]}
        isDisabled={form.submitted === 1}
        setState={setForm}
        state={form}
        save={formPage.save[lang]}
        valMessage={text.home.new_application_name.err[lang]}
        warning={
          form.submitted === 1
            ? [
                true,
                "This form is already submitted and cannot be edited!",
                "bg-orange-500",
              ]
            : errorVal.length > 0
            ? [
                true,
                "Invalid input entries for the following: " +
                  errorVal.join(", "),
                "bg-red-500",
              ]
            : undefined
        }
      />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {submit.status === "done" && submit.error ? (
          <h1 className="text-3xl">
            Your application has been submitted! Redirecting to Home Page...
          </h1>
        ) : state.status === "loading" || state.status === "idle" ? (
          <h1 className="text-3xl">
            Please wait a moment! Your Application is Loading...
          </h1>
        ) : state?.data?.body ? (
          <form>
            {/* Name */}
            <fieldset className="p-0 pt-8 pb-8 border-grey-500 border-b-2 last-of-type:border-b-0 flex w-full justify-between">
              <Text
                id="last-name"
                label={formPage.last_name[lang]}
                disabled={isSubmitted}
                value={state.data.body.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                className="ml-4 mr-4"
                validation={
                  (errorVal as string[]).includes("last_name")
                    ? "error"
                    : undefined
                }
                validationMessage={formPage.required[lang]}
              />
              <Text
                id="first-name"
                label={formPage.first_name[lang]}
                disabled={isSubmitted}
                value={state.data.body.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                className="ml-4 mr-4"
                validation={
                  (errorVal as string[]).includes("first_name")
                    ? "error"
                    : undefined
                }
                validationMessage={formPage.required[lang]}
              />
              <Text
                id="middle-name"
                label={formPage.middle_name[lang]}
                disabled={isSubmitted}
                value={state.data.body.middle_name}
                onChange={(e) =>
                  setForm({ ...form, middle_name: e.target.value })
                }
                className="ml-4 mr-4"
              />
            </fieldset>
            {/* Characteristics */}
            <fieldset className="p-0 pt-8 pb-10 border-grey-500 border-b-2 last-of-type:border-b-0 flex w-full items-center justify-between">
              <Text
                id="birth-date"
                label={formPage.birth_date[lang]}
                disabled={isSubmitted}
                value={state.data.body.birth_date}
                inputType="date"
                onChange={(e) =>
                  setForm({ ...form, birth_date: e.target.value })
                }
                className="ml-4 mr-4 max-w-[200px]"
                validation={
                  (errorVal as string[]).includes("birth_date")
                    ? "error"
                    : undefined
                }
                validationMessage={formPage.required[lang]}
              />
              <Radio
                id="sex"
                title="Sex"
                disabled={isSubmitted}
                onChange={(e) => setForm({ ...form, sex: e.target.id })}
                selections={[
                  { label: formPage.m[lang], value: "M" },
                  { label: formPage.f[lang], value: "F" },
                  { label: formPage.x[lang], value: "X" },
                ]}
                defaultValue={
                  state.data.body.sex.length > 0
                    ? state.data.body.sex
                    : formPage.sex
                }
                validation={(errorVal as string[]).includes("sex")}
                valMessage={formPage.required[lang]}
              />
              <Text
                id="height"
                label={formPage.height[lang]}
                disabled={isSubmitted}
                value={state.data.body.height.toString()}
                minNum="0"
                maxNum="300"
                onChange={(e) => {
                  if (
                    e.target.value.split("").includes(" ") ||
                    isNaN(e.target.value as unknown as number) ||
                    Number(e.target.value) < 0 ||
                    Number(e.target.value) > 300
                  ) {
                    e.target.value = form.height.toString();
                  }
                  setForm({ ...form, height: Number(e.target.value) });
                }}
                className="ml-4 mr-4 max-w-[100px]"
                validation={
                  (errorVal as string[]).includes("height")
                    ? "error"
                    : undefined
                }
                validationMessage={formPage.required_height[lang]}
              />
            </fieldset>

            {/* Address */}
            <fieldset className="p-0 pt-8 pb-4 flex w-full items-center justify-between">
              <Text
                id="address-street-unit"
                label={formPage.address_street_unit[lang]}
                disabled={isSubmitted}
                value={state.data.body.address_street_unit}
                onChange={(e) =>
                  setForm({ ...form, address_street_unit: e.target.value })
                }
                className="ml-4 mr-4 max-w-[100px]"
              />
              <Text
                id="address-street-num"
                label={formPage.address_street_num[lang]}
                disabled={isSubmitted}
                value={state.data.body.address_street_num}
                onChange={(e) =>
                  setForm({ ...form, address_street_num: e.target.value })
                }
                className="ml-4 mr-4 max-w-[100px]"
                validation={
                  (errorVal as string[]).includes("address_po")
                    ? "error"
                    : undefined
                }
                validationMessage={formPage.required_address[lang]}
              />

              <Text
                id="address-street-name"
                label={formPage.address_street_name[lang]}
                disabled={isSubmitted}
                value={state.data.body.address_street_name}
                onChange={(e) =>
                  setForm({ ...form, address_street_name: e.target.value })
                }
                validation={
                  (errorVal as string[]).includes("address_po")
                    ? "error"
                    : undefined
                }
                validationMessage={formPage.required_address[lang]}
              />
            </fieldset>
            <fieldset className="mt-4 p-0 pt-4 pb-8 border-grey-500 border-b-2 last-of-type:border-b-0 flex w-full items-end justify-end">
              <div className="flex">
                <Selection
                  id="porr"
                  defaultValue={porr}
                  disabled={isSubmitted}
                  onChange={(e) => setPORR(e.target.value)}
                  selections={["PO BOX / CP", "RR"]}
                />
                <Text
                  id="address-po"
                  disabled={isSubmitted}
                  value={form.address_po}
                  onChange={(e) =>
                    setForm({ ...form, address_po: e.target.value })
                  }
                  className="ml-1 mr-4 max-w-[200px]"
                  validation={
                    (errorVal as string[]).includes("address_po")
                      ? "error"
                      : undefined
                  }
                  validationMessage={formPage.required_po[lang]}
                />
              </div>
              {/* Locale */}
              <div className="flex pb-2">
                <Text
                  id="city"
                  label={formPage.city[lang]}
                  disabled={isSubmitted}
                  value={state.data.body.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="ml-4 mr-4 max-w-[250px] -mt-5"
                  validation={
                    (errorVal as string[]).includes("city")
                      ? "error"
                      : undefined
                  }
                  validationMessage={formPage.required[lang]}
                />
                <Selection
                  id="province"
                  defaultValue={
                    state.data.body.province || form.province || "ON"
                  }
                  required={true}
                  disabled={isSubmitted}
                  onChange={(e) =>
                    setForm({ ...form, province: e.target.value })
                  }
                  selections={[
                    "ON",
                    "AB",
                    "BC",
                    "MB",
                    "NB",
                    "NU",
                    "NL",
                    "NS",
                    "NT",
                    "QC",
                    "PE",
                    "SK",
                    "YT",
                  ]}
                  validation={(errorVal as string[]).includes("province")}
                  valMessage={formPage.required[lang]}
                />
                <Text
                  id="postal-code"
                  label={formPage.postal_code[lang]}
                  disabled={isSubmitted}
                  value={state.data.body.postal_code}
                  onChange={(e) =>
                    setForm({ ...form, postal_code: e.target.value })
                  }
                  className="ml-4 max-w-[100px] -mt-5"
                  validation={
                    (errorVal as string[]).includes("postal_code")
                      ? "error"
                      : undefined
                  }
                  validationMessage={formPage.required[lang]}
                />
              </div>
            </fieldset>
          </form>
        ) : (
          <h1 className="text-3xl">
            OOPS... Form failed to load. Is the application ID correct?
          </h1>
        )}
      </main>
      <Footer
        save={formPage.save[lang]}
        submit={formPage.submit[lang]}
        saveHandler={(e) => handleAppSubmit(false, e)}
        submitHandler={(e) => handleAppSubmit(true, e)}
        disabled={form.submitted === 1}
      />
    </div>
  );
}
