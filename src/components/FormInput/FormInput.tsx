import { useEffect, useState } from "react";
import {
  useForm,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import s from "./FormInput.module.scss";

interface OptionTypeInterface {
  id: string | number;
  name?: string;
  slug?: string;
}

interface FormInputInterface {
  inputType: string;
  register: ReturnType<typeof useForm>["register"];
  registerName: string;
  inputValidation?: RegisterOptions;
  inputName: string;
  inputPlaceholder?: string;
  error?: string;
  defaultOption?: boolean;
  defaultValues?: FieldValues;
  endpoint?: string;
}

export const FormInput = ({
  inputType,
  register,
  registerName,
  inputValidation,
  inputName,
  inputPlaceholder,
  error,
  defaultOption,
  defaultValues,
  endpoint,
}: FormInputInterface) => {
  const [options, setOptions] = useState<OptionTypeInterface[]>([]);
  const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);

  useEffect(() => {
    if (inputType === "select" && endpoint) {
      setApiEndpoint(
        `https://dishshare.up.railway.app/${endpoint}?attributes=id,name`
      );
    }
  }, [inputType, endpoint]);

  const { data } = useFetch<{ data: OptionTypeInterface[] }>(apiEndpoint ?? "");

  useEffect(() => {
    if (data?.data) {
      setOptions(data?.data);
    }
  }, [data]);

  switch (inputType) {
    case "select":
      return (
        <>
          <span className={s.inputContainers}>
            <label htmlFor={inputName}>{inputName}</label>
            <select {...register(registerName, inputValidation)}>
              {defaultOption && defaultValues ? (
                <option value={defaultValues?.[registerName]?.id}>
                  {defaultValues?.[registerName]?.name}
                </option>
              ) : null}
              {options?.map((item) => {
                return (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </span>
          {error && <p>{error}</p>}
        </>
      );
    case "textarea":
      return (
        <>
          <span className={s.inputContainers}>
            <label htmlFor={inputName}>{inputName}</label>
            <textarea
              {...register(registerName, inputValidation)}
              defaultValue={defaultValues?.[registerName]}
              placeholder={inputPlaceholder || ""}
            />
          </span>
          {error && <p>{error}</p>}
        </>
      );
  }
  return (
    <>
      <span className={s.inputContainers}>
        <label htmlFor={inputName}>{inputName?.toUpperCase()}</label>
        <input
          type={inputType}
          {...register(registerName, inputValidation)}
          defaultValue={defaultValues?.[registerName]}
          placeholder={inputPlaceholder || ""}
          accept=".jpg, .jpeg, .png"
        />
      </span>
      {error && <p>{error}</p>}
    </>
  );
};
