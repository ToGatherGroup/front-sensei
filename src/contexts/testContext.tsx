import { axios } from "@api/axios";
import { useYupLocale } from "@hooks/useYupLocale";
import { calendarLocales } from "@i18n/calendarLocales";
import { storageGetLanguage, storageSaveLanguage } from "@storage/storageLanguage";
import { getLocales } from "expo-localization";
import moment from "moment";
import "moment/min/locales";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocaleConfig } from "react-native-calendars";
import { setLocale } from "yup";
import { useContext } from "react";
moment.locale("pt-br");
LocaleConfig.locales["pt"] = calendarLocales.pt;
LocaleConfig.locales["en"] = calendarLocales.en;

export type Locales = "pt" | "en" | "es";

export type LanguageContextProp = {
  changeLanguage: (lng: Locales) => void;
  language: Locales;
  moment: typeof moment;
};

type Props = {
  children: ReactNode;
};

const apiLanguage = {
  pt: "pt_BR",
  es: "es",
  en: "en",
};

export const LanguageContext = createContext<LanguageContextProp>({} as LanguageContextProp);

export function LanguageProvider({ children }: Props) {
  const { i18n } = useTranslation();
  const yupLocale = useYupLocale();
  const [language, setLanguage] = useState<Locales>("en");

  useEffect(() => {
    setLocale(yupLocale);
  }, [yupLocale]);

  useEffect(() => {
    const initialLanguage = async () => {
      const savedLanguage = await storageGetLanguage();
      const availableLanguages = getLocales().map((locale) => locale.languageCode as Locales);
      const firstLanguage = availableLanguages.find((lang) => lang === "en" || lang === "pt" || lang === "es") || "en";
      const selectedLanguage = savedLanguage || firstLanguage;

      changeLanguage(selectedLanguage);
    };

    initialLanguage();
  }, []);

  const updateLanguageHeader = useCallback((lng: Locales) => {
    axios.defaults.headers.common["Accept-Language"] = apiLanguage[lng];
  }, []);

  const changeLanguage = useCallback(
    (lng: Locales) => {
      i18n.changeLanguage(lng);
      moment.locale(lng === "pt" ? "pt-br" : lng);
      LocaleConfig.defaultLocale = lng;
      setLanguage(lng);
      storageSaveLanguage(lng);
      updateLanguageHeader(lng);
    },
    [i18n, setLanguage, updateLanguageHeader],
  );

  return <LanguageContext.Provider value={{ changeLanguage, moment, language }}>{children}</LanguageContext.Provider>;
}


export function useLanguage() {
  const context = useContext(LanguageContext);

  return context;
}