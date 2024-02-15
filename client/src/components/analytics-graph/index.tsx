import { Title, MenuButton, MenuSection, MenuItem, Modal, ModalTitle, ModalContent } from "@dataesr/dsfr-plus"
import HighchartsReact, { HighchartsReactProps } from "highcharts-react-official";
import React, { useId, useRef, useState } from "react";
import Highcharts from "./highcharts";

export type AnalyticsGraphProps = {
  title: string,
  description?: React.ReactNode,
  comment?: React.ReactNode,
  options: HighchartsReactProps,
}


export default function AnalyticsGraph({ title, description, comment, options }: AnalyticsGraphProps) {
  const descriptionId = useId();
  const titleId = useId();
  const chartRef = useRef(null);
  const [table, setTable] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const handleAction = (key: any): void => {
    if (!chartRef.current) return;
    const { chart } = chartRef.current;
    const expOptions = { title: title.replace(/ /g, "_") }
    if (key === "export>pdf") return chart.exportChart({ type: 'application/pdf', ...expOptions });
    if (key === "export>png") return chart.downloadPNG();
    if (key === "download>csv") return chart.downloadCSV();
    if (key === "view>fullscreen") return chart.fullscreen.toggle();
    if (key === "view>table") {
      if (!table) setTable(chart.getTable())
      setShowTable((prev) => !prev)
    }
  }

  return (
    <div className="fr-pb-3w">
      <div style={{ display: 'flex', alignItems: 'start' }}>
        <div style={{ flexGrow: 1 }}>
          <Title id={titleId} as="h2" className="fr-text--md fr-text--bold fr-m-0">
            {title}
          </Title>
          {description && <p id={descriptionId} className="fr-text--xs fr-text-mention--grey">{description}</p>}
        </div>
        <div>
          <MenuButton placement="end" size="sm" aria-label="Options" variant="text" icon="settings-5-line" onAction={handleAction}>
            <MenuSection className="fr-my-1v" aria-label="EXPLORER" showDivider>
              <MenuItem
                key="view>fullscreen"
                className="fr-p-1v"
                endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-1w" />}
              >
                <span className="fr-text--sm">Plein écran</span>
              </MenuItem>
              <MenuItem
                key="view>table"
                className="fr-p-1v"
                endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-1w" />}
              >
                <span className="fr-text--sm">{showTable ? "Masquer" : "Voir"} les données</span>
              </MenuItem>
            </MenuSection>
            <MenuSection title="EXPORTER" showDivider>
              <MenuItem
                key="export>jpeg"
                className="fr-p-1v"
                endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-1w" />}
              >
                <span className="fr-text--sm">Exporter une image jpeg</span>
              </MenuItem>
              <MenuItem
                key="export>pdf"
                className="fr-p-1v"
                endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-1w" />}
              >
                <span className="fr-text--sm">PDF</span>
              </MenuItem>
            </MenuSection>
            <MenuSection title="TELECHARGER">
              <MenuItem
                key="download>csv"
                className="fr-p-1v"
                endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-1w" />}
              >
                <span className="fr-text--sm">Télécharger les données en csv</span>
              </MenuItem>
            </MenuSection>
          </MenuButton>
        </div>
      </div>
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={options}
        aria-describedby={description && descriptionId}
        aria-labelledby={title}
      />
      {comment && <p className="fr-text--sm fr-mt-1v">{comment}</p>}
      <Modal isOpen={showTable} hide={() => setShowTable(false)}>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>
          <div dangerouslySetInnerHTML={{ __html: table }} />
        </ModalContent>
      </Modal>
    </div>
  )
}