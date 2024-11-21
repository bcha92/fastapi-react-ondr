"use client";
import { useReducer, useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../theme-provider";
import { Header, Text } from "@/components";
import {
  text,
  getOneApplication,
  getInitState,
  getReducer,
  initForm,
} from "@/utils";

export default function Form({
  params,
}: {
  params: Promise<{ app_id: string }>;
}) {
  const [state, dispatch] = useReducer(getReducer, getInitState);
  const [form, setForm] = useState(initForm);
  const { formPage } = text;
  const { lang }: { lang: string } = useContext(ThemeContext);
  const isSubmitted = state?.data?.body?.submitted === 1; // User should not be able to edit form if already submitted // view only

  useEffect(() => {
    if (state.status === "idle") {
      getOneApplication(dispatch, params);
    }
    if (state.data && !state.error) {
      setForm({ ...state.data.body });
    }
  }, [params, state.status, state.data, state.error]);
  console.log(form, lang);

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
        {state?.data?.body && (
          <form>
            {/* Name */}
            <Text
              id="last-name"
              label={formPage.last_name[lang]}
              disabled={isSubmitted}
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
            <Text
              id="first-name"
              label={formPage.first_name[lang]}
              disabled={isSubmitted}
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
            <Text
              id="middle-name"
              label={formPage.middle_name[lang]}
              disabled={isSubmitted}
              value={form.middle_name}
              onChange={(e) =>
                setForm({ ...form, middle_name: e.target.value })
              }
            />
            {/* Characteristics */}
            <Text
              id="birth-date"
              label={formPage.birth_date[lang]}
              disabled={isSubmitted}
              value={form.birth_date}
              inputType="date"
              onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
            />
            <Text // REPLACE WITH RADIO
              id="sex"
              label={formPage.sex[lang]}
              disabled={isSubmitted}
              value={form.sex}
              inputType="radio"
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
            />
            <Text
              id="height"
              label={formPage.height[lang]}
              disabled={isSubmitted}
              value={form.height.toString()}
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
              value={form.address_street_unit}
              onChange={(e) =>
                setForm({ ...form, address_street_unit: e.target.value })
              }
            />
            <Text
              id="address-street-num"
              label={formPage.address_street_num[lang]}
              disabled={isSubmitted}
              value={form.address_street_num}
              onChange={(e) =>
                setForm({ ...form, address_street_num: e.target.value })
              }
            />
            <Text
              id="address-street-name"
              label={formPage.address_street_name[lang]}
              disabled={isSubmitted}
              value={form.address_street_name}
              onChange={(e) =>
                setForm({ ...form, address_street_name: e.target.value })
              }
            />
            <Text
              id="address-po"
              label={formPage.address_po[lang]}
              disabled={isSubmitted}
              value={form.address_po}
              onChange={(e) => setForm({ ...form, address_po: e.target.value })}
            />
            {/* Locale */}
            <Text
              id="city"
              label={formPage.city[lang]}
              disabled={isSubmitted}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Text // Replace with Select
              id="province"
              label="Province"
              disabled={isSubmitted}
              value={form.province}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
            />
            <Text
              id="postal-code"
              label={formPage.postal_code[lang]}
              disabled={isSubmitted}
              value={form.postal_code}
              onChange={(e) =>
                setForm({ ...form, postal_code: e.target.value })
              }
            />
          </form>
        )}
      </main>
    </div>
  );
}
