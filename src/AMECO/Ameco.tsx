import Papa from "papaparse";
import React, { useEffect, useState } from "react";
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
import CountrySelector from "./CountrySelector";
import { MultiCountryRow } from "./Chart";
import { MultiCountryChart } from "./MultiCountryChart";

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

const Ameco: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const { countries, csvData: amecoData } = useCSVData("/ameco_data.csv");
  const { csvData: giniData } = useCSVData("/gini_ameco.csv");

  useEffect(() => {
    const handleScroll = () => {
      // Get the selector's position from the top of the page
      const selectorElement = document.getElementById("country-selector");
      if (selectorElement) {
        const selectorPosition = selectorElement.getBoundingClientRect().top;
        setIsSticky(selectorPosition < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredData: MultiCountryRow[] = selectedCountries.map((country) => ({
    country: country,
    data: amecoData?.filter((d) => d.country === country),
  }));
  const filteredGiniData: MultiCountryRow[] = selectedCountries.map(
    (country) => ({
      country: country,
      data: giniData?.filter((d) => d.country.includes(country)),
    })
  );

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
          <div id="country-selector" style={{ position: "relative" }}>
            <h5>Select one or more countries to analyse:</h5>
            <div
              style={{
                position: isSticky ? "fixed" : "static",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: isSticky ? "1rem" : "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  margin: "0 auto",
                }}
                className="d-flex flex-column"
              >
                <CountrySelector
                  countries={countries}
                  selectedCountries={selectedCountries}
                  setSelectedCountries={setSelectedCountries}
                />
                {isSticky && selectedCountries.length > 0 && (
                  <nav
                    id="TOC-sticky"
                    role="doc-toc"
                    style={{
                      maxWidth: "300px",
                      fontSize: "0.9em",
                    }}
                  >
                    <h2 id="toc-title" style={{ fontSize: "1em" }}>
                      Quick Navigation
                    </h2>
                    <ul className="incremental" style={{ marginBottom: 0 }}>
                      <li>
                        <a href="#consumption">1 - Consumption</a>
                      </li>
                      <li>
                        <a href="#population">2 - Population & Employment</a>
                      </li>
                      <li>
                        <a href="#GDP">3 - Gross Domestic Product</a>
                      </li>
                      <li>
                        <a href="#public-spending">4 - Public Spending</a>
                      </li>
                      <li>
                        <a href="#trade">5 - Trade</a>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
          {selectedCountries.length > 0 && (
            <>
              <nav
                id="TOC"
                role="doc-toc"
                style={{ paddingBottom: "1em", paddingTop: "1em" }}
              >
                <h2 id="toc-title">
                  Analysis for {selectedCountries.join(", ")}
                </h2>
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
              <MultiCountryChart
                data={filteredData}
                chart={HouseholdConsumptionChart}
              />
              <p>
                Below I have plotted the GINI coefficient after taxes and social
                transfers. This mean that this reflect the actual income
                inequality as experienced by people. Higher values mean that the
                income is more concentrated in the hands of a few people.
              </p>

              <MultiCountryChart data={filteredGiniData} chart={GINIChart} />
              <p>
                I have also plotted the average number of hours worked, in order
                to help understand the chart on household comsumption per hour
                worked.
              </p>
              <MultiCountryChart data={filteredData} chart={HoursWorkedChart} />

              <br />
              <h2 id="population">2 - Population & Employment</h2>
              <br />

              <p>
                To start, let's have a look at the evolution of the structure of
                the population over time. How many children, how many elders?
              </p>
              <MultiCountryChart data={filteredData} chart={PopulationChart} />
              <MultiCountryChart
                data={filteredData}
                chart={AbsolutePopulationChart}
              />
              <p>
                What about the proportion of the population that is employed? I
                have separated the portion of the population above 14 years old
                between employed, officially unemployed, and the rest, which
                includes students, retirees as well as people considered
                "outside of the workforce" such as people not looking for work.
              </p>
              <MultiCountryChart data={filteredData} chart={EmploymentChart} />
              <p>
                It is interesting to see the evolution of employement in the
                different economic sectors. Where do people work?
              </p>
              <MultiCountryChart
                data={filteredData}
                chart={EconomicSectorsChart}
              />
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
              <MultiCountryChart
                data={filteredData}
                chart={EconomicSectorsGVAChart}
              />

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
              <MultiCountryChart data={filteredData} chart={GNPIncomeChart} />
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
              <MultiCountryChart
                data={filteredData}
                chart={GNPExpenditureChart}
              />
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
              <MultiCountryChart
                data={filteredData}
                chart={PublicSpendingChart}
              />

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
              <MultiCountryChart data={filteredData} chart={ImportsChart} />
              <p>
                One thing that can be observed is that imports and exports tend
                to rise together, with periods where imports are slightly above
                exports, and periods where exports are slightly above imports.
                This is because trade imbalances are not sustainable in the long
                term.
              </p>
              <MultiCountryChart data={filteredData} chart={ExportsChart} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Ameco;
