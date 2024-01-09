export type ItemProps<T> = {
  data: T;
  highlight?: Record<string, string[]>;
}