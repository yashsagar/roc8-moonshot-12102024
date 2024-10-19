import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Label,
} from "recharts";

const BarChartComponent = ({ data = [], handleBarClick }) => {
  const totals = data.reduce(
    (acc, currentValue) => {
      acc.A += currentValue.a;
      acc.B += currentValue.b;
      acc.C += currentValue.c;
      acc.D += currentValue.d;
      acc.E += currentValue.e;
      acc.F += currentValue.f;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  );

  // Format the totals into a data array for Recharts
  const chartData = [
    { name: "A", total: totals.A },
    { name: "B", total: totals.B },
    { name: "C", total: totals.C },
    { name: "D", total: totals.D },
    { name: "E", total: totals.E },
    { name: "F", total: totals.F },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <h2 className="text-center">Total Time spent on each feature</h2>
      <BarChart
        layout="vertical"
        barSize={30}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number">
          <Label value="Time" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="name" type="category">
          <Label
            value="features"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />

        <Bar dataKey="total" fill="#8884d8" onClick={handleBarClick}>
          <LabelList dataKey="total" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
