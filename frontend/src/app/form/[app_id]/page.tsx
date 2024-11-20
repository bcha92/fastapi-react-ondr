"use client";
import { useReducer, useEffect } from "react";
// import { useParams } from "next/navigation";
import { Header, Input } from "@/components";
import { text, getOneApplication, getInitState, getReducer } from "@/utils";

export default function Form({
  params,
}: {
  params: Promise<{ app_id: string }>;
}) {
  const [state, dispatch] = useReducer(getReducer, getInitState);
  const editDisabled = state?.data?.body?.submitted === 1; // User should not be able to edit form if already submitted // view only

  useEffect(() => {
    if (state.status === "idle") {
      getOneApplication(dispatch, params);
    }
  }, [params, state.status]);
  console.log(state?.data?.body, editDisabled);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header showTitle={"App Name"} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {state?.data?.body && (
          <Input
            id="first-name"
            label="Hello"
            disabled={editDisabled}
            value={state.data.body.first_name}
          />
        )}
      </main>
    </div>
  );
}
