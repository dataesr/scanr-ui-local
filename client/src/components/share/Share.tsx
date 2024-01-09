export function Share({ title, description, children }: { title?: string, description?: string, children?: React.ReactNode }) {
  return (
    <div className="fr-share">
      {title ? <p className="fr-share__title">{title}</p> : null}
      {description
        ? <p className="fr-share__text">{description}</p>
        : null
      }
      <ul className="fr-share__group">
        {children}
      </ul>
    </div >
  )
}

export function ShareLink({ type, ...props }: { type: string, props?: React.HTMLProps<HTMLAnchorElement> }) {
  return (
    <li>
      <a className="fr-share__link fr-share__link--{type}" title="Partager sur {type}" {...props}>Partager sur {type}</a>
    </li>
  )
}