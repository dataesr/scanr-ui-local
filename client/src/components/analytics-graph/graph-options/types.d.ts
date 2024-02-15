import type { Aggregation } from "../../../types/commons";

export type GetGraphOptionsProps = {
  data: Aggregation[],
  colors?: string[],
  height?: string,
  title?: string,
  subtitle?: string,
}