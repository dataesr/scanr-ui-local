import { Button, ButtonGroup, Notice, TextArea, TextInput, useDSFRConfig } from "@dataesr/dsfr-plus";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createIntl, RawIntlProvider } from "react-intl";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

type FormState = {
  name?: string;
  email?: string;
  organization?: string;
  fonction?: string;
  message?: string;
  id?: string;
  type?: string;
};

const validate = (form: FormState) => {
  const errors: Partial<FormState> = {};
  if (!form.name) {
    errors.name = "Ce champ est obligatoire";
  }
  if (!form.email) {
    errors.email = "Ce champ est obligatoire";
  }
  if (!form.message) {
    errors.message = "Ce champ est obligatoire";
  }
  return errors;
}

type Props = {
  id?: string;
  type?: string;
}



export default function ContactForm({ id, type }: Props) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const navigate = useNavigate();
  const api = (id && type) ? "contribute" : "contact"
  const [thanks, setThanks] = useState(false);
  const { isPending, isError, mutate } = useMutation({
    mutationFn: async (data: FormState) => {
      const resp = await fetch(`https://scanr-api.dataesr.ovh/${api}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (resp.status !== 201) throw new Error("error");
      return resp.json();
    },
    onSuccess: () => {
      setThanks(true);
    },
    onError: (e) => {
      console.error("error", e)
    },
  });

  const { form, updateForm, errors, } = useForm<FormState, FormState>({ id, type }, validate);

  if (thanks) {
    return (
      <RawIntlProvider value={intl}>
        <Notice className="fr-mb-2w" type="success" closeMode="disallow">
          <span>{intl.formatMessage({ id: "contact.thanks.message" })}</span>
          <ButtonGroup className="fr-mt-5w" isInlineFrom="xs">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              {intl.formatMessage({ id: "contact.thanks.return" })}
            </Button>
          </ButtonGroup>
        </Notice>
      </RawIntlProvider >
    );
  }
  if (isError) {
    return (
      <RawIntlProvider value={intl}>
        <Notice className="fr-mb-2w" type="error" closeMode="disallow">
          <span>
            {intl.formatMessage({ id: "contact.error.message" })}
          </span>
          <ButtonGroup className="fr-mt-5w" isInlineFrom="xs">
            <Button
              onClick={() => {
                setThanks(false)
              }}
            >
              {intl.formatMessage({ id: "contact.error.retry" })}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              {intl.formatMessage({ id: "contact.error.return" })}
            </Button>
          </ButtonGroup>
        </Notice>
      </RawIntlProvider >
    );
  }

  return (
    <RawIntlProvider value={intl}>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(form)
        }}
      >
        <TextInput
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.name" })}
          required
          type="text"
          message={errors?.name}
          messageType={errors?.name ? "error" : undefined}
          disableAutoValidation

        />
        <TextInput
          value={form.email}
          onChange={(e) => updateForm({ email: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.email" })}
          required
          type="email"
          hint={intl.formatMessage({ id: "contact.form.email.hint" })}
          disableAutoValidation
          message={errors?.email}
          messageType={errors?.email ? "error" : undefined}
        />
        <TextInput
          value={form.organization}
          onChange={(e) => updateForm({ organization: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.organization" })}
          type="text"
          disableAutoValidation
        />
        <TextInput
          value={form.fonction}
          onChange={(e) => updateForm({ fonction: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.fonction" })}
          type="text"
          disableAutoValidation
        />
        <TextArea
          value={form.message}
          onChange={(e) => updateForm({ message: e.target.value })}
          label={intl.formatMessage({ id: "contact.form.message" })}
          required
          rows={10}
          message={errors?.message}
          messageType={errors?.message ? "error" : undefined}
          disableAutoValidation
        />
        <Button disabled={isPending} type="submit">Envoyer le message</Button>
      </form>
    </RawIntlProvider >

  );
}