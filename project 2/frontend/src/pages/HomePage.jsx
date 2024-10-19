import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import BarChart from "../component/BarChartComponent.jsx";
import LineChart from "../component/LineChartComponent.jsx";
import { useEffect, useState } from "react";
import NavBar from "../component/NavBar.jsx";

import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
  const { control, handleSubmit } = useForm();
  const [data, setData] = useState(null);
  const [lineChartFilter, setLineChartFilter] = useState("a");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      fetch(`http://localhost:3000/v1/db/fetchData${location.search}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setData(data.filteredData));
    }
  }, [location]);

  const onSubmit = (fiterData) => {
    const params = new URLSearchParams(fiterData);

    navigate(`?${params}`);
  };

  const handlResetFilter = () => {
    if (location.search) {
      fetch(`http://localhost:3000/v1/db/fetchData`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setData(data.filteredData));
    }
    navigate("/", { replace: true });
  };

  // chart bar click handler function

  const handleBarClick = (feature) => {
    setLineChartFilter(feature.name.toLowerCase());
  };

  return (
    <section className="bg-[linear-gradient(to_top,#e6e9f0_0%,#eef1f5_100%)] min-h-screen w-full pb-10 ">
      <NavBar />
      <div className="wrapper ">
        <div className=" lg:flex gap-8">
          <div className="mx-auto flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="pt-6 ">
              <div className="sm:flex gap-4 lg:flex-col">
                <div className="flex flex-col  sm:flex-col  gap-2 overflow-hidden ">
                  <div>
                    <p className="pl-1 pb-1">Select start date(4/10/2022)</p>
                    <Controller
                      name="startdate"
                      control={control}
                      defaultValue={new Date("2022/10/04")}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd/MM/yyyy"
                          className="h-10 pl-4 border border-slate-700 rounded-md"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <p className="pl-1 pb-1">Select end date(29/10/2022)</p>
                    <Controller
                      name="enddate"
                      control={control}
                      defaultValue={new Date("2022/10/29")}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd/MM/yyyy"
                          className="h-10 pl-4 border border-slate-700 rounded-md"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4 w-full sm:w-[350px] sm:mt-7  lg:mt-0 lg:max-w-[210px]  ">
                  <Controller
                    name="age"
                    control={control}
                    defaultValue="" // Default value is required for controlled components
                    render={({ field }) => (
                      <select
                        {...field}
                        className="h-10 pl-4 border border-slate-700 rounded-md lg:mt-4"
                      >
                        <option value="">Filter by Age</option>
                        <option value="15-25">15-25</option>
                        <option value=">25">{">25"}</option>
                      </select>
                    )}
                  />
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue="" // Default value is required for controlled components
                    render={({ field }) => (
                      <select
                        {...field}
                        className="h-10 pl-4 border border-slate-700 rounded-md sm:mt-7 lg:mt-4"
                      >
                        <option value="">Filter by Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className="h-10  mt-4 w-full sm:w-full sm:max-w-[573px] flex gap-2">
                <button
                  className="border border-slate-700 rounded-md w-full min-w-fit bg-white"
                  type="submit"
                >
                  Filter
                </button>
                <button
                  onClick={handlResetFilter}
                  className="border border-slate-700 rounded-md w-full min-w-fit bg-white"
                  type="button"
                >
                  Reset Filter
                </button>
              </div>
            </form>
          </div>
          {/* <section className="xl:flex gap-4 mt-8 test "></section>  <div className="w-full min-w-[400px]"> */}
          <section className=" grid grid-cols-1  xl:grid-cols-2 gap-4 mt-8 w-full">
            <div className="w-full sm:max-w-[600px] lg:max-w-[800px] mx-auto  md:mx-0 mt-4 xl:mt-0">
              {data && <BarChart data={data} handleBarClick={handleBarClick} />}
            </div>
            <div className="w-full sm:max-w-[600px] lg:max-w-[800px] mx-auto md:mx-0 mt-4 xl:mt-0">
              {data && (
                <LineChart data={data} lineChartFilter={lineChartFilter} />
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
