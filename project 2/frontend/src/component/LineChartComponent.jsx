import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const LineChartComponent = ({ data = [], lineChartFilter }) => {
  function formateDate(isoString) {
    let date = new Date(isoString);
    let day = date.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = months[date.getMonth()];
    return `${day}-${month}`;
  }

  const chartData = data.reduce((acc, curr) => {
    acc.push({
      date: formateDate(curr.day),
      value: curr[lineChartFilter],
    });
    return acc;
  }, []);

  const minValue = Math.min(...chartData.map((item) => item.value));
  const maxValue = Math.max(...chartData.map((item) => item.value));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <h2 className="text-center">{`Total Time spent on each ${lineChartFilter.toUpperCase()} feature`}</h2>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date">
          <Label value="Dates" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis type="number" domain={[minValue, maxValue]}>
          <Label
            value="Time"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
