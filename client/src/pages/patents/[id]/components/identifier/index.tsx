import { useParams } from "react-router-dom";
import CopyBadgeButton from "../../../../../components/copy/copy-badge-button";

export default function Identifiers() {
  const { id } = useParams();
  return (
    <div>
      <div className="fr-badge-group">
        <CopyBadgeButton lowercase size="sm" text={id} />
      </div>
    </div>
  );
}
