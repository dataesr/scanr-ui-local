import cn from 'classnames';
import { Col, Row, Text } from "@dataesr/dsfr-plus";

import { Field } from '../model';
import styles from './styles.module.scss';

type FieldProps = {
  isNested: boolean;
  name: string;
  doc: Field;
};

export default function DocumentedField({ name, doc, isNested }: FieldProps) {
  const { type, example, description, enum: enumeration, fields } = doc;
  const hasFields = (type === "array of objects" || type === "object") && typeof fields === "object";
  const length = hasFields ? Object.keys(fields).length : 0;
  return (
    <Col xs={12}>
      <Text size="lg" className="fr-mb-0" bold>{name}</Text>
      <Text size="xs" className="fr-text-mention--grey fr-mb-1w">
        {type}
        {type === "enum" && ` : ${enumeration.join(" | ")}`}
      </Text>
      {example && (
        <Text size="sm" className="fr-text-mention--grey fr-mb-1w">
          Example: {example}
        </Text>
      )}
      <Text size="sm" className="fr-mb-0">
        {description}
      </Text>
      {hasFields && (
        <Row gutters className={cn(styles.vr, { "fr-m-3w": !isNested, "fr-mt-3w": isNested, "fr-mx-3w": isNested })}>
          {Object.entries(fields)?.map(([subfield, subdoc], i) => (
            <DocumentedField name={subfield} doc={subdoc} isNested={i !== (length)} />
          ))}
        </Row>)}
    </Col>
  );
}