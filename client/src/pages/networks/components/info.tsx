import { Link } from "@dataesr/dsfr-plus"

export default function Info({ href }: { href: string }) {
  return <Link icon="question-line" className="icon-link" href={href} target="_blank" />
}
