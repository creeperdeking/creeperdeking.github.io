import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ArticleHeader } from "../components/ArticleHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/pagestyle.css";
import PublicSpendingChart from "./PublicSpendingChart";
import GINIChart from "./GINIChart";
import GNPIncomeChart from "./GNPIncomeChart";
import GNPExpenditureChart from "./GNPExpenditureChart";
import PopulationChart from "./PopulationChart";
import HoursWorkedChart from "./HoursWorkedChart";
import HouseholdConsumptionChart from "./HouseholdConsumption";
import EmploymentChart from "./EmploymentChart";
import EconomicSectorsChart from "./EconomicSectors";
import EconomicSectorsGVAChart from "./EconomicSectorsGVAChart";
import { ExportsChart, ImportsChart } from "./ImportsExportsCharts";
import AbsolutePopulationChart from "./AbsolutePopulationChart";

interface YearData {
  year: string;
  value: number;
}

interface AmecoRow {
  country: string;
  title: string;
  unit: string;
  data: YearData[];
}

const useCSVData = (filePath: string) => {
  const [amecoData, setAmecoData] = useState<AmecoRow[] | undefined>(undefined);

  useEffect(() => {
    const loadData = async (filePath: string) => {
      const response = await fetch(filePath);
      const csv = await response.text();

      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const parsedData: AmecoRow[] = results.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((row: any) => {
              const yearData: YearData[] = [];
              // Start from 1960 to 2026
              for (let year = 1960; year <= 2026; year++) {
                const value = parseFloat(row[year.toString()]);
                if (!Number.isNaN(value)) {
                  yearData.push({ year: year.toString(), value });
                }
              }

              return {
                country: row.COUNTRY,
                title: row.TITLE,
                unit: row["UNIT.1"],
                data: yearData,
              };
            })
            // Filter out invalid entries
            .filter(
              (row) =>
                row.country || row.title || row.unit || row.data.length > 0
            );

          setAmecoData(parsedData);
        },
      });
    };

    loadData(filePath).catch(console.error);
  }, [filePath]);

  return {
    countries: Array.from(new Set(amecoData?.map((row) => row.country))).sort(),
    csvData: amecoData,
  };
};

const CountrySelector: React.FC<{
  countries: string[];
  setSelectedCountry: (searchTerm: string) => void;
}> = ({ countries, setSelectedCountry }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryToggle = (country: string) => {
    setSelectedCountries((prev) => {
      const newSelection = prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country];

      // Update the main selectedCountry with the first selected country or undefined
      setSelectedCountry(newSelection.length > 0 ? newSelection[0] : "");

      return newSelection;
    });
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

const Ameco: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const { countries, csvData: amecoData } = useCSVData("/ameco_data.csv");
  const { csvData: giniData } = useCSVData("/gini_ameco.csv");

  const filteredData = selectedCountry
    ? amecoData?.filter((d) => d.country === selectedCountry)
    : undefined;
  const filteredGiniData = selectedCountry
    ? giniData?.filter((d) => d.country.includes(selectedCountry))
    : undefined;

  return (
    <>
      <ArticleHeader
        title="Economic statistics from AMECO"
        subtitle="AMECO database"
        image=""
        author={{
          name: "Alexis Gros",
          email: "alexis.gros99@gmail.com",
          website: "https://alexisgros.fr",
        }}
        creationDate="2025-01-17"
        updatedDate="2025-01-17"
        version="1.0"
      />

      {amecoData && amecoData.length > 0 && (
        <>
          <h5>Select a country to analyse:</h5>

          <CountrySelector
            countries={countries}
            setSelectedCountry={setSelectedCountry}
          />
          {selectedCountry && (
            <>
              <nav
                id="TOC"
                role="doc-toc"
                style={{ paddingBottom: "1em", paddingTop: "1em" }}
              >
                <h2 id="toc-title">Analysis for {selectedCountry}</h2>
                <ul className="incremental">
                  <li>
                    <a href="#consumption" id="toc-consumption">
                      1 - Consumption
                    </a>
                  </li>
                  <li>
                    <a href="#population" id="toc-population">
                      2 - Population & Employment
                    </a>
                  </li>
                  {/* // Todo: add employment of different jobs */}
                  <li>
                    <a href="#GDP" id="toc-GDP">
                      3 - Gross Domestic Product
                    </a>
                  </li>
                  <li>
                    <a href="#public-spending" id="toc-public-spending">
                      4 - Public Spending
                    </a>
                  </li>
                  <li>
                    <a href="#trade" id="toc-trade">
                      5 - Trade
                    </a>
                  </li>
                </ul>
              </nav>
              <hr />

              <br />
              <p className="text-italic">
                NOTE: Some data might not be available for your country. You
                might see sudden jumps in the charts if the data is not
                available for the year.
              </p>

              <br />
              <h2 id="consumption">1 - Consumption</h2>
              <br />
              <p>
                First, as a starting point to think about how the economy
                impacts our lives, let's get an idea of how the average person's
                standard of living evolved over time using the relative
                evolution of household consumption per capita.
              </p>
              <p>
                This household consumption is corrected for inflation and partly
                corrected for the evolution of the population's age structure
                (children don't need as much money as adults to achieve a given
                standard of living).
              </p>
              <p>
                Using consumption instead of income allows us to get a good idea
                of the evolution in standard of living, as it represents the
                real consumption after all taxes and social transfers. Although,
                it is important to look at the gini index provided below as
                higher consumption might be offset for the average person by a
                rise in inequality, and vice versa.
              </p>
              <p>
                I have plotted the evolution of consumption per hour worked, as
                a lot of countries have seen a decrease in working hours per
                worker. In addition, I have plotted GDP per capita corrected for
                inflation and the population's age structure as sometimes there
                can be a big difference between how GDP per capita evolves
                compared to the average person's actual standard of living.
              </p>
              <HouseholdConsumptionChart data={filteredData} format="#.##'%'" />
              <p>
                Below I have plotted the GINI coefficient after taxes and social
                transfers. This mean that this reflect the actual income
                inequality as experienced by people. Higher values mean that the
                income is more concentrated in the hands of a few people.
              </p>

              <GINIChart data={filteredGiniData} />
              <p>
                I have also plotted the average number of hours worked, in order
                to help understand the chart on household comsumption per hour
                worked.
              </p>
              <HoursWorkedChart data={filteredData} />

              <br />
              <h2 id="population">2 - Population & Employment</h2>
              <br />

              <p>
                To start, let's have a look at the evolution of the structure of
                the population over time. How many children, how many elders?
              </p>
              <PopulationChart data={filteredData} />
              <AbsolutePopulationChart data={filteredData} />
              <p>
                What about the proportion of the population that is employed? I
                have separated the portion of the population above 14 years old
                between employed, officially unemployed, and the rest, which
                includes students, retirees as well as people considered
                "outside of the workforce" such as people not looking for work.
              </p>
              <EmploymentChart data={filteredData} />
              <p>
                It is interesting to see the evolution of employement in the
                different economic sectors. Where do people work?
              </p>
              <EconomicSectorsChart data={filteredData} />
              <p>
                But how do these sectors contribute to the economy? The Gross
                Value Added (GVA) is closely related to the GDP, so I have
                charted the evolution of the contribution of the different
                sectors to GVA.
              </p>
              <p>
                For many countries, as the share of the workforce employed in
                industry decreased, the value added of industry declined much
                slower. This mean that the low value added industry closed, and
                the productivity of the remaining industry was very high.
              </p>
              <EconomicSectorsGVAChart data={filteredData} />

              <br />
              <h2 id="GDP">3 - Dissecting GDP</h2>
              <br />

              <p>
                There are several equivalent ways to calculate GDP. Here we will
                first look at the components of GDP viewed from the income
                perspective. They are:
              </p>
              <ul>
                <li>Compensation of employees: wages, salaries</li>
                <li>
                  Compensation of self-employed: revenue for business owners,
                  indendent workers...
                </li>
                <li>
                  Net Operating Surplus: net revenue of companies, before
                  dividends, investments and saving.
                </li>
                <li>
                  Depreciation: the cost of replacement / maintenance of
                  existing capital goods.
                </li>
                <li>
                  Taxes on production and imports: companies taxes on profits
                  and imports.
                </li>
              </ul>
              <GNPIncomeChart data={filteredData} />
              <p>
                Now let's have a look at the components of GDP viewed from the
                expenditure perspective. They are:
              </p>
              <ul>
                <li>
                  Household spending: The same as household consumption we used
                  in the comsumption chapter as a percentage of the whole
                  economy.
                </li>
                <li>
                  Public spending (health, education, housing): Government
                  spending on goods and services for individuals
                </li>
                <li>
                  Public spending (defense, police, justice...): Government
                  spending collective goods and services.
                </li>
                <li>
                  Investment: the total value of new capital goods produced in
                  the country.
                </li>
                <li>
                  Depreciation: the cost of replacement / maintenance of
                  existing capital goods.
                </li>
                <li>
                  Net exports: the difference between the value of goods and
                  services produced in the country and the value of goods and
                  services imported.
                </li>
              </ul>
              <GNPExpenditureChart data={filteredData} />
              <br />
              <h2 id="public-spending">4 - Public Spending</h2>
              <br />

              <p>
                Here I have plotted the evolution of public spending as a
                percentage of GDP and its subcomponents. Notice that the total
                percentage is greater than the addition of individual and
                collective public spending of the GDP chart from the expenditure
                perspective. This is because the GDP break down does not show
                social benefits and transfers, as they end up being part of
                household spending.
              </p>
              <p>
                It is important to keep an eye on interest as it shows the
                weight of the debt of the government's spending. The interest
                cost can be low even with high debt provided the interest rate
                is low.
              </p>
              <p>
                For most developed countries, the growth in the government's
                share of GDP is mainly due to the increasing costs of social
                benefits and transfers such as retirement pensions and
                unemployment benefits.
              </p>
              <PublicSpendingChart data={filteredData} />

              <br />
              <h2 id="trade">5 - Trade</h2>
              <br />
              <p>
                The second half of the 20th century was marked by the rise of
                globalisation. On of the ways to observe that fact is to see the
                rise of imports and exports of a country relative to its GDP.
              </p>
              <p>
                Rising trade effectively means that the countries economy is
                more tighly linked to the rest of the world.
              </p>
              <ImportsChart data={filteredData} />
              <p>
                One thing that can be observed is that imports and exports tend
                to rise together, with periods where imports are slightly above
                exports, and periods where exports are slightly above imports.
                This is because trade imbalances are not sustainable in the long
                term.
              </p>
              <ExportsChart data={filteredData} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Ameco;
