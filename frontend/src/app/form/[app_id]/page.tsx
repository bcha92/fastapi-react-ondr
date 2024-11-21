"use client";
import { useReducer, useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../theme-provider";
import { Header, Text, Radio, Selection } from "@/components";
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
  const { formPage } = text;
  const { lang }: { lang: string } = useContext(ThemeContext);
  const isSubmitted = state?.data?.body?.submitted === 1; // User should not be able to edit form if already submitted // view only

  useEffect(() => {
    if (state.status === "idle") {
      getOneApplication(dispatch, params);
    }
    if (state.data && !state.error) {
      const { body } = state.data;
      let parsedPORR = "";
      let parsedPO = "";
      if (body.address_po.trim().length > 0) {
        if (body.address[0] === "R" && body.address[1] === "R") {
          parsedPORR = "RR";
          parsedPO = body.address.trim().split(" ")[1];
        } else if (body.address[0] === "R" && body.address[1] === "R") {
          parsedPORR = "PO BOX / CP";
          parsedPO = body.address.trim().split(" ")[1];
        } else if (body.address.includes("PO BOX")) {
          parsedPORR = "PO BOX / CP";
          parsedPO = body.address.trim().split("PO BOX ")[1];
        }
      }
      setPORR(parsedPORR);
      setForm({ ...body, address_po: parsedPO });
    }
  }, [params, state.status, state.data, state.error, form.sex]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header
        showTitle={form.app_name}
        headerName={form.app_name}
        isDisabled={form.submitted === 1}
        setState={setForm}
        state={form}
      />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {state.status === "loading" || state.status === "idle" ? (
          <h1 className="text-3xl">
            Please wait a moment! Your Application is Loading...
          </h1>
        ) : state?.data?.body ? (
          <form>
            {/* Name */}
            <Text
              id="last-name"
              label={formPage.last_name[lang]}
              disabled={isSubmitted}
              value={state.data.body.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
            <Text
              id="first-name"
              label={formPage.first_name[lang]}
              disabled={isSubmitted}
              value={state.data.body.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
            <Text
              id="middle-name"
              label={formPage.middle_name[lang]}
              disabled={isSubmitted}
              value={state.data.body.middle_name}
              onChange={(e) =>
                setForm({ ...form, middle_name: e.target.value })
              }
            />
            {/* Characteristics */}
            <Text
              id="birth-date"
              label={formPage.birth_date[lang]}
              disabled={isSubmitted}
              value={state.data.body.birth_date}
              inputType="date"
              onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
            />
            <Radio
              id="sex"
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
            />
            {/* Address */}
            <Text
              id="address-street-unit"
              label={formPage.address_street_unit[lang]}
              disabled={isSubmitted}
              value={state.data.body.address_street_unit}
              onChange={(e) =>
                setForm({ ...form, address_street_unit: e.target.value })
              }
            />
            <Text
              id="address-street-num"
              label={formPage.address_street_num[lang]}
              disabled={isSubmitted}
              value={state.data.body.address_street_num}
              onChange={(e) =>
                setForm({ ...form, address_street_num: e.target.value })
              }
            />
            <Text
              id="address-street-name"
              label={formPage.address_street_name[lang]}
              disabled={isSubmitted}
              value={state.data.body.address_street_name}
              onChange={(e) =>
                setForm({ ...form, address_street_name: e.target.value })
              }
            />
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
              value={state.data.body.address_po}
              onChange={(e) => setForm({ ...form, address_po: e.target.value })}
            />
            {/* Locale */}
            <Text
              id="city"
              label={formPage.city[lang]}
              disabled={isSubmitted}
              value={state.data.body.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Selection
              id="province"
              label="Province"
              defaultValue={state.data.body.province || form.province || "ON"}
              required={true}
              disabled={isSubmitted}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
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
            />
            <Text
              id="postal-code"
              label={formPage.postal_code[lang]}
              disabled={isSubmitted}
              value={state.data.body.postal_code}
              onChange={(e) =>
                setForm({ ...form, postal_code: e.target.value })
              }
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                let addressPO = "";
                if (form.address_po.trim().length > 0) {
                  if (porr === "RR") {
                    addressPO = `${porr} ${form.address_po}`;
                  } else {
                    addressPO = `${formPage.address_po[lang]} ${form.address_po}`;
                  }
                }
                updateApplication(
                  handleSubmit,
                  { ...form, address_po: addressPO },
                  false
                );
              }}
            >
              SAVE
            </button>
          </form>
        ) : (
          <h1 className="text-3xl">
            OOPS... Form failed to load. Is the application ID correct?
          </h1>
        )}
      </main>
    </div>
  );
}
