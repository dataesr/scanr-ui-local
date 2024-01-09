import BaseSkeleton from './base-skeleton';
import './styles.module.scss';

export default function AnalyticsSkeleton() {
  return (
    <>
      <BaseSkeleton height="3rem" />
      <span className="fr-mb-3" />
      <BaseSkeleton height="10rem" />
      <span className="fr-mb-5" />
      <BaseSkeleton height="3rem" />
      <span className="fr-mb-3" />
      <BaseSkeleton height="10rem" />
      <span className="fr-mb-5" />
      <BaseSkeleton height="3rem" />
      <span className="fr-mb-3" />
      <BaseSkeleton height="10rem" />
    </>
  )
}