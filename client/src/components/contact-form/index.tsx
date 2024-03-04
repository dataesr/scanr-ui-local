import { Button, ButtonGroup, Notice, TextArea, TextInput } from "@dataesr/dsfr-plus";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
      console.log("error", e)
    },
  });

  const { form, updateForm, errors, } = useForm<FormState, FormState>({ id, type }, validate);

  if (thanks) {
    return (
      <div>
        <Notice className="fr-mb-2w" type="success" closeMode="disallow">
          <span>Merci pour votre message, nous vous répondrons dans les plus brefs délais.</span>
          <ButtonGroup className="fr-mt-5w" isInlineFrom="xs">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Retour
            </Button>
          </ButtonGroup>
        </Notice>
      </div >
    );
  }
  if (isError) {
    return (
      <div>
        <Notice className="fr-mb-2w" type="error" closeMode="disallow">
          <span>Une erreur s'est produite. Veuillez réessayer plus tard.</span>
          <ButtonGroup className="fr-mt-5w" isInlineFrom="xs">
            <Button
              onClick={() => {
                setThanks(false)
              }}
            >
              Réessayer
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Retour
            </Button>
          </ButtonGroup>
        </Notice>
      </div >
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(form)
      }
      }
    >
      <TextInput
        value={form.name}
        onChange={(e) => updateForm({ name: e.target.value })}
        label="Votre nom et prénom"
        required
        type="text"
        message={errors?.name}
        messageType={errors?.name ? "error" : undefined}
        disableAutoValidation

      />
      <TextInput
        value={form.email}
        onChange={(e) => updateForm({ email: e.target.value })}
        label="Renseignez votre email"
        required
        type="email"
        hint="Cet email sera utilisé que pour vous informer de la prise en compte de votre contribution."
        disableAutoValidation
        message={errors?.email}
        messageType={errors?.email ? "error" : undefined}
      />
      <TextInput
        value={form.organization}
        onChange={(e) => updateForm({ organization: e.target.value })}
        label="Votre organisation"
        type="text"
        disableAutoValidation
      />
      <TextInput
        value={form.fonction}
        onChange={(e) => updateForm({ fonction: e.target.value })}
        label="Votre fonction"
        type="text"
        disableAutoValidation
      />
      <TextArea
        value={form.message}
        onChange={(e) => updateForm({ message: e.target.value })}
        label="Votre message"
        required
        rows={10}
        message={errors?.message}
        messageType={errors?.message ? "error" : undefined}
        disableAutoValidation
      />
      <Button disabled={isPending} type="submit">Envoyer le message</Button>
    </form>
  );
}