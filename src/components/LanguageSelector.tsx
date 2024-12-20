import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

let countries = [
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>
        <Icon icon="mdi-light:home" />
        <Dropdown>
          <Dropdown.Toggle
            className="group w-full text-sm text-left font-medium text-gray-700 focus:outline-none"
            aria-label="usermenu-button"
          >
            <span className="flex w-full justify-between items-center">
              <Icon
                icon="fa-solid:language"
                className="h-7 w-7 cursor-pointer text-blue-600"
              />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="px-1 py-1" aria-label="menu-items">
              {countries.map((lng) => (
                <Dropdown.Item key={lng.code}>
                  <button
                    className={classNames(
                      "flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer"
                    )}
                    onClick={() => i18n.changeLanguage(lng.code)}
                    disabled={i18n.language === lng.code}
                  >
                    <Icon
                      icon={`flag-icons:${lng.country_code}`}
                      className="h-7 w-7 cursor-pointer text-blue-600"
                    />
                    <span>{lng.name}</span>
                  </button>
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default LanguageSelector;
