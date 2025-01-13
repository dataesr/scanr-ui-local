const NETWORK_TABS_MAPPING = {
  domains: {
    index: 0,
    label: "domains",
    icon: "book-2-line",
  },
  authors: {
    index: 1,
    label: "authors",
    icon: "user-line",
  },
  institutions: {
    index: 2,
    label: "institutions",
    icon: "building-line",
  },
  structures: {
    index: 3,
    label: "structures",
    icon: "microscope-line",
  },
  software: {
    index: 4,
    label: "software",
    icon: "terminal-box-line",
  },
  projects: {
    index: 5,
    label: "projects",
    icon: "briefcase-line",
  },
  countries: {
    index: 6,
    label: "countries",
    icon: "earth-line",
  },
}

export const networkTabs = Object.values(NETWORK_TABS_MAPPING).sort((a, b) => a.index - b.index)
export const networkTabFindIndex = (label: string) => networkTabs.findIndex((tab) => tab.label === label)
export const networkTabFindLabel = (index: number) => networkTabs[index].label
export const networkTabFindIcon = (label: string) => NETWORK_TABS_MAPPING[label].icon
