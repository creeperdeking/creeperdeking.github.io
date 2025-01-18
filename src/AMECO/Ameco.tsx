import _ from "lodash";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { ArticleHeader } from "../components/ArticleHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/pagestyle.css";

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

const makeChartData = (row: AmecoRow) => {
  return [["Year", row.title], ...row.data.map((d) => [d.year, d.value])];
};

const EMPTY_CHART_DATA = [
  ["", ""],
  ["", 0],
];

const makeGDPChartData = (amecoData: AmecoRow[]) => {
  console.log(amecoData);
  const compensationEmployees = amecoData.find((d) =>
    d.title.includes("Compensation of employees: total economy")
  );
  const netTaxesImportProduction = amecoData.find((d) =>
    d.title.includes(
      "Taxes linked to imports and production minus subsidies: total economy"
    )
  );
  const depreciation = amecoData.find((d) =>
    d.title.includes(
      "Consumption of fixed capital at current prices: total economy"
    )
  );
  const netOperatingSurplus = amecoData.find((d) =>
    d.title.includes(
      "Net operating surplus: total economy :- Adjusted for imputed compensation of self-employed"
    )
  );
  const grossOperatingSurplus = amecoData.find((d) =>
    d.title.includes("Gross operating surplus: total economy")
  );
  const grossOperatingSurplusImputedCompensationSelfEmployed = amecoData.find(
    (d) =>
      d.title.includes(
        "Gross operating surplus: total economy :- Adjusted for imputed compensation of self-employed"
      )
  );

  const compensationSelfEmployed: AmecoRow = {
    country: grossOperatingSurplus?.country || "",
    title: "Imputed compensation of self-employed",
    unit: grossOperatingSurplus?.unit || "",
    data: _.chain(grossOperatingSurplus?.data || [])
      .map((yearData) => {
        const { year } = yearData;
        const compensationSelfEmployed =
          (grossOperatingSurplus?.data.find((d) => d.year === year)?.value ||
            0) -
          (grossOperatingSurplusImputedCompensationSelfEmployed?.data.find(
            (d) => d.year === year
          )?.value || 0);
        return { year, value: compensationSelfEmployed };
      })
      .value(),
  };
  const netPrimaryForeignIncome = amecoData.find((d) =>
    d.title.includes("Net primary income from the rest of the world")
  );
  const incomingForeignIncome = {
    ...netPrimaryForeignIncome,
    data: netPrimaryForeignIncome?.data.map((d) => {
      return { year: d.year, value: Math.max(d.value, 0) };
    }),
  };

  const GNP: AmecoRow = {
    country: compensationEmployees?.country || "",
    title: "Gross National Product",
    unit: compensationEmployees?.unit || "",
    data: _.chain(compensationEmployees?.data || [])
      .map((yearData) => {
        const { year } = yearData;
        const sum = _.sum([
          compensationEmployees?.data.find((d) => d.year === year)?.value || 0,
          netTaxesImportProduction?.data.find((d) => d.year === year)?.value ||
            0,
          depreciation?.data.find((d) => d.year === year)?.value || 0,
          netOperatingSurplus?.data.find((d) => d.year === year)?.value || 0,
          compensationSelfEmployed?.data.find((d) => d.year === year)?.value ||
            0,
          incomingForeignIncome?.data?.find((d) => d.year === year)?.value || 0,
        ]);
        return { year, value: sum };
      })
      .value(),
  };

  // Calculate percentages for each component
  const data = GNP.data.map((yearData) => {
    const { year } = yearData;
    const gnpValue = yearData.value;

    return [
      year,
      ((compensationEmployees?.data.find((d) => d.year === year)?.value || 0) /
        gnpValue) *
        100,
      ((compensationSelfEmployed?.data.find((d) => d.year === year)?.value ||
        0) /
        gnpValue) *
        100,
      ((netOperatingSurplus?.data.find((d) => d.year === year)?.value || 0) /
        gnpValue) *
        100,
      ((incomingForeignIncome?.data?.find((d) => d.year === year)?.value || 0) /
        gnpValue) *
        100,
      ((depreciation?.data.find((d) => d.year === year)?.value || 0) /
        gnpValue) *
        100,
      ((netTaxesImportProduction?.data.find((d) => d.year === year)?.value ||
        0) /
        gnpValue) *
        100,
    ];
  });

  const chartData = [
    [
      "Year",
      "Compensation of employees (%)",
      "Compensation of self-employed (%)",
      "Net operating surplus (%)",
      "Net primary foreign income (%)",
      "Depreciation (%)",
      "Net taxes on production (%)",
    ],
    ...data,
  ];
  console.log(chartData);

  return chartData;
};

const Ameco: React.FC = () => {
  const [amecoData, setAmecoData] = useState<AmecoRow[] | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("/ameco_data.csv");
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result?.value);

      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const parsedData: AmecoRow[] = results.data
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
                row.country && row.title && row.unit && row.data.length > 0
            );

          setAmecoData(parsedData);
        },
      });
    };

    loadData().catch(console.error);
  }, []);

  const countries = amecoData
    ? Array.from(new Set(amecoData.map((row) => row.country))).sort()
    : [];

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
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
              height: "20em",
              overflow: "scroll",
            }}
          >
            {filteredCountries.map((country) => (
              <Dropdown.Item
                key={country}
                onClick={() => {
                  setSelectedCountry(country);
                  setSearchTerm(country);
                  setIsDropdownOpen(false);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  display: "block",
                  width: "100%",
                }}
              >
                {country}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {amecoData && amecoData.length > 0 && (
        <Chart
          chartType="SteppedAreaChart"
          data={
            selectedCountry
              ? makeGDPChartData(
                  amecoData.filter((d) => d.country === selectedCountry)
                )
              : EMPTY_CHART_DATA
          }
          options={{
            title: "Components of GNP as percentage",
            isStacked: true,
            legend: {
              position: "top",
              maxLines: 3,
              textStyle: {
                whiteSpace: "nowrap",
                fontSize: 12,
              },
            },
            vAxis: {
              title: "Percentage of GNP",
              format: "#.##'%'",
            },
          }}
          width="100%"
          height="400px"
          style={{ zIndex: 1 }}
        />
      )}
    </>
  );
};

export default Ameco;
