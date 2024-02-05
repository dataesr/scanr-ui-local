import { ExternalIdsData } from "../../types/organization";
import CopyBadgeButton from "../copy/copy-badge-button";

export default function Identifiers({ data: externalIds }: { data: ExternalIdsData[] }) {
  if (!externalIds?.length) return null;
  return (
    <div>
      <div className="fr-badge-group">
        {externalIds
          ?.filter((ext) => ext?.type !== 'scanr')
          .map((ext) => <CopyBadgeButton key={ext.id} lowercase size="sm" text={ext.id} />)
        }
      </div>
    </div>
  );
}