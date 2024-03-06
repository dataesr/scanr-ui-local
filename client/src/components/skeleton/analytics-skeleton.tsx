import BaseSkeleton from './base-skeleton';
import './styles.module.scss';

export default function AnalyticsSkeleton() {
  return (
    <>
      <BaseSkeleton height="3rem" className="fr-mb-2w" />
      <BaseSkeleton height="10rem" className="fr-mb-5w" />
      <BaseSkeleton height="3rem" className="fr-mb-2w" />
      <BaseSkeleton height="10rem" className="fr-mb-5w" />
      <BaseSkeleton height="3rem" className="fr-mb-2w" />
      <BaseSkeleton height="10rem" className="fr-mb-5w" />
    </>
  )
}