import cn from 'classnames';
import { Text, Title } from "@dataesr/dsfr-plus";



type ProjectProgramProps = {
  title: string,
  children?: React.ReactNode,
  icon?: string,
  show: boolean,
  size?: "hero" | "lead" | "lg" | "md" | "sm" | "xs"
}

export default function ProjectProgram({ title, children, size = "md", icon, show }: ProjectProgramProps) {

  if (!show) return null;

  const titleCSS = cn("page-section__title", {
    [`fr-text--${size}`]: size !== "hero",
    "fr-h5": size === "hero",
    [`fr-icon-${icon}`]: icon,
    "fr-mb-1v": children,
    "fr-mb-0": !children,
  });

  return (
    <>
      <Title as="h2" className={titleCSS}>
        {title}
      </Title>
      {children && (<Text className="fr-text-mention--grey" size="sm">
        {children}
      </Text>)}
    </>

  )
}