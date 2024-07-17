import { Link, LinkProps } from "@dataesr/dsfr-plus"
import styles from "./styles.module.scss"
import cs from "classnames"

export default function IconLink({ ...props }: LinkProps) {
  return <Link {...props} className={cs(styles["icon-link"], props?.className)} />
}
