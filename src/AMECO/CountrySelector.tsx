import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CountrySelector: React.FC<{
  countries: string[];
  selectedCountries: string[];
  setSelectedCountries: (searchTerms: string[]) => void;
}> = ({ countries, selectedCountries, setSelectedCountries }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryToggle = (country: string) => {
    const newSelection = selectedCountries.includes(country)
      ? selectedCountries.filter((c) => c !== country)
      : [...selectedCountries, country];

    setSelectedCountries(newSelection);
  };

  return (
    <>
      {countries.length > 0 && (
        <Dropdown
          className="mb-3"
          show={isDropdownOpen}
          onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
        >
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-country"
            style={{ paddingRight: "12px" }}
          >
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(true);
              }}
              className="search-input"
              style={{
                border: "none",
                background: "transparent",
                color: "white",
                outline: "none",
                width: "100%",
              }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              width: "20em",
              maxHeight: "20em",
              overflow: "auto",
            }}
          >
            {/* Selected countries section */}
            {selectedCountries.length > 0 && (
              <>
                {selectedCountries.map((country) => (
                  <Dropdown.Item
                    key={`selected-${country}`}
                    as="div"
                    className="d-flex align-items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCountryToggle(country);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="checkbox"
                      checked
                      onChange={() => handleCountryToggle(country)}
                      onClick={(e) => e.stopPropagation()}
                      className="me-2"
                    />
                    <span style={{ margin: "auto 0" }}>{country}</span>
                  </Dropdown.Item>
                ))}
              </>
            )}

            {/* Available countries list */}
            {filteredCountries
              .filter((country) => !selectedCountries.includes(country))
              .map((country) => (
                <Dropdown.Item
                  key={country}
                  as="div"
                  className="d-flex align-items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCountryToggle(country);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country)}
                    onChange={() => handleCountryToggle(country)}
                    onClick={(e) => e.stopPropagation()}
                    className="me-2"
                  />
                  <span style={{ margin: "auto 0" }}>{country}</span>
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default CountrySelector;
