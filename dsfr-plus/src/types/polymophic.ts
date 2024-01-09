type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
export type Merge<A, B> = DistributiveOmit<A, keyof B> & React.PropsWithChildren<B>;
