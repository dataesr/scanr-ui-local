import { useReducer, useState } from 'react';

type UseFormState<T, C> = {
  form: T;
  updateForm: (updates: T) => void;
  errors: C;
};

function createErrorsIfTouched<T, C extends object>(touched: Array<keyof C>, validator: (updates: T) => C, form: T): C {
  if (!validator) return null;
  const validation = validator(form);
  return touched.reduce((acc, key) => {
    if (validation[key]) {
      return { ...acc, [key]: validation[key] };
    }
    return acc;
  }, {} as C);
}

export default function useForm<T, C extends object>(initialState: T, validator: (updates: T) => C): UseFormState<T, C> {
  const [touched, setTouched] = useState([]);
  const [errors, setErrors] = useState(() => createErrorsIfTouched(touched, validator, initialState));
  const [form, updateForm] = useReducer((prevState, updates) => {
    setTouched([...new Set([...touched, ...Object.keys(updates) as Array<keyof C>])]);
    const newForm = { ...prevState, ...updates };
    if (validator) {
      const _errors = createErrorsIfTouched(touched, validator, newForm);
      setErrors(_errors as C);
    }
    return newForm;
  }, initialState);

  return { form, updateForm, errors };
}
