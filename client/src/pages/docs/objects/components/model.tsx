import { Row } from "@dataesr/dsfr-plus";
import DocumentedField from "./fields";

export type Field = {
  type: string;
  description?: string;
  enum?: string[] | number[];
  example?: string;
  fields?: Fields;
};

export type Fields = {
  [key: string]: Field
};

export type ModelProps = {
  fields: Fields;
  index?: string;
};

export function Model({ fields }: ModelProps) {
  const hasFields = typeof fields === "object";
  if (!hasFields) throw new Error("No fields found in model");
  return (
    <Row gutters>
      {Object.entries(fields)?.map(([field, doc]) => (
        <DocumentedField
          name={field}
          doc={doc}
          isNested={true}
        />
      ))}
    </Row>
  );
}