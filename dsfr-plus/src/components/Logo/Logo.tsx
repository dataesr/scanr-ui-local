import { Fragment } from "react";

export interface LogoProps {
  text: string;
  splitCharacter?: string
}

export const Logo = ({ text, splitCharacter = '|' }: LogoProps) => {
  const lines = text.split(splitCharacter);
  const brText = lines.reduce<JSX.Element[]>((acc, cur, i) => {
    return (i > 0)
      ? [...acc, <br key={`br-${i}`} />, <Fragment key={i}>{cur}</Fragment>]
      : [<Fragment key={i}>{cur}</Fragment>]
  }, []);
  return (
    <div className="fr-header__logo">
      <p className="fr-logo">
        {brText}
      </p>
    </div>
  )
}