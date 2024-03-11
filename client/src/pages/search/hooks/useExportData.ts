import { useCallback, useMemo, useState } from "react";
import {
  exportOrganizations,
  exportOrganizationsForHe,
} from "../../../api/organizations/export";
import { exportAuthors } from "../../../api/authors/export";
import { exportProjects } from "../../../api/projects/export";
import { exportPublications } from "../../../api/publications/export";
import { exportPatents } from "../../../api/patents/export";
import useUrl from "./useUrl";

const API_MAPPING = {
  organizations: exportOrganizations,
  authors: exportAuthors,
  projects: exportProjects,
  publications: exportPublications,
  patents: exportPatents,
  he: exportOrganizationsForHe,
};

export default function useExportData() {
  const ctx = window.location.href;
  const { api, currentQuery, filters } = useUrl();
  const [isLoading, setIsLoading] = useState(false);

  const exportFile = useCallback(
    async (format: "csv" | "json") => {
      setIsLoading(true);
      const exportFn = API_MAPPING?.[api];
      const data = await exportFn({
        query: currentQuery,
        filters,
        format,
        ctx,
      });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${api}.${format}`);
      document.body.appendChild(link);
      link.click();
      setIsLoading(false);
    },
    [api, currentQuery, filters, ctx]
  );

  const values = useMemo(() => {
    return { isExporting: isLoading, exportFile };
  }, [isLoading, exportFile]);
  return values;
}
