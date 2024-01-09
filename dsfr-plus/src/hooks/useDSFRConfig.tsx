
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ConfigContextObject = {
  routerComponent?: React.ElementType;
  defaultLang?: string;
  extendRequiredFieldsLabelsWith?: React.ReactNode;
  extendOptionalFieldsLabelsWith?: React.ReactNode;
  verbose?: boolean;
  locale?: string;
  setLocale?: (lang: string) => void;
}
export type DSFRConfigProps = React.PropsWithChildren<ConfigContextObject>

const ConfigContext = createContext<ConfigContextObject>({});


export const DSFRConfig = ({
  children,
  routerComponent,
  extendRequiredFieldsLabelsWith = <span style={{ color: 'var(--text-default-error)' }}> *</span>,
  extendOptionalFieldsLabelsWith = " (optionel)",
  defaultLang = 'fr',
  verbose = false,
}: DSFRConfigProps) => {

  const [locale, switchLang] = useState<string>(window.localStorage.getItem('locale') || defaultLang);
  const [isDSFRStarted, setDSFRStarted] = useState<boolean>(false);

  useEffect(() => {
    const startDSFR = async () => {
      if ((window as any)?.dsfr?.isStarted) {
        return;
      }
      (window as any).dsfr = {
        verbose,
        mode: "manual",
      };

      // @ts-expect-error
      await import("@gouvfr/dsfr/dist/dsfr/dsfr.module.min");
      await import("@gouvfr/dsfr/dist/utility/utility.css");
      await import('@gouvfr/dsfr/dist/dsfr.css');
      // @ts-expect-error
      window.dsfr.start();
      setDSFRStarted(true);
    }
    const defaultPreferedTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const systemPreferences = (defaultPreferedTheme?.matches) ? "dark" : "light";
    const localPreferences = window.localStorage.getItem('theme');
    document.documentElement.setAttribute('data-fr-scheme', localPreferences || systemPreferences);
    startDSFR();
  }, [])


  const setLocale = useCallback((lang: string) => {
    window.localStorage.setItem('locale', lang);
    document.documentElement.setAttribute('lang', 'en');
    switchLang(lang);
  }, []);

  const value: ConfigContextObject = useMemo(() => ({
    setLocale,
    routerComponent,
    locale,
    extendRequiredFieldsLabelsWith,
    extendOptionalFieldsLabelsWith,
  }), [routerComponent, setLocale, locale, extendRequiredFieldsLabelsWith, extendOptionalFieldsLabelsWith]);

  return (
    <ConfigContext.Provider value={value}>
      {isDSFRStarted ? children : null}
    </ConfigContext.Provider>
  );
};


export const useDSFRConfig = () => useContext(ConfigContext);
