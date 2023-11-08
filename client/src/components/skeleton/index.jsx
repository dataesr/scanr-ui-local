import './styles.module.scss';

export default function Skeleton({ header = true }) {
  return (
    <>
      {header && <div className="skeleton-sm fr-mb-4w" />}

      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
      <hr />
      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
      <hr />
      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
      <hr />
      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
      <hr />
      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
      <hr />
      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
      <hr />
      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
      <hr />
      <div className="skeleton-xs fr-mb-1v" />
      <div className="skeleton fr-mb-2w" />
    </>
  )
}