import { ColorFamily } from "../../types/colors";

export type ListboxItemProps = {
  value: string | number;
  children?: React.ReactNode;
  href?: string;
  description?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  textValue?: string;
  selected?: boolean;
  highlighted?: boolean;
  color?: ColorFamily;
  showDivider?: boolean;
  readonly onClick?: () => void;
  readonly onMouseEnter?: () => void;
  readonly onMouseOut?: () => void;
} & React.HTMLAttributes<HTMLLIElement>;