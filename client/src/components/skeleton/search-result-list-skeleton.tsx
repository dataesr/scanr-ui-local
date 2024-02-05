import { Fragment } from 'react';
import './styles.module.scss';

export default function SearchResultListSkeleton({ size = 8 }: { size?: number }) {
  return (
    <>
      {[...Array(size).keys()].map((el) => (
        <Fragment key={el}>
          <div className="skeleton-xs fr-mb-1v" />
          <div className="skeleton fr-mb-2w" />
          <hr />
        </Fragment>
      ))}
    </>
  )
}