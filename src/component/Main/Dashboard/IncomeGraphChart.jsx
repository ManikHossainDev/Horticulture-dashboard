/* eslint-disable react/prop-types */
import { Select } from "antd";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetEarningGraphChartsQuery } from "../../../redux/features/dashboard/dashboardApi";

const { Option } = Select;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`Month: ${label}`}</p>
        <p className="intro">{`Total Income: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const IncomeGraphChart = () => {
  const currentYear = new Date().getFullYear();
  const yearRange = [];
  for (let i = currentYear - 12; i <= currentYear + 12; i++) {
    yearRange.push(i);
  }

  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Fetch data for the selected year
  const { data: responseData } = useGetEarningGraphChartsQuery(selectedYear);
  const graphChartData = responseData?.monthlyIncomeRatio;

  // Handle Year selection change
  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <section className="w-full col-span-full md:col-span-4 bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center py-3">
        <h1 className="font-semibold">Income Ratio</h1>

        {/* Ant Design Select for year picker */}
        <Select
          value={selectedYear}
          onChange={handleYearChange}
        >
          {yearRange.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          data={graphChartData}
          margin={{
            top: 5,
            bottom: 5,
          }}
          className="md:mt-5 md:mb-5"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="totalEarnings" barSize={20} fill="#42B244" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
