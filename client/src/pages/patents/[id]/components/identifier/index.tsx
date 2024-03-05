import { useParams } from "react-router-dom";
import CopyBadge from "../../../../../components/copy/copy-badge";

export default function Identifiers() {
  const { id } = useParams();
  return (
    <div>
      <div className="fr-badge-group">
        <CopyBadge lowercase size="sm" copyText={id}>{id}</CopyBadge>
      </div>
    </div>
  );
}
