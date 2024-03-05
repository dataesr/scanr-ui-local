import { useParams } from "react-router-dom";
import Publication from "../pages/publications/[id]";
import Patents from "../pages/patents/[id]";

export default function PublicationIdParser() {
  const { id } = useParams();
  if (parseInt(id, 10)) return <Patents />
  return <Publication />;
}