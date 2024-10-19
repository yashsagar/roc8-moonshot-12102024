import Papa from "papaparse";
import { assignmentDataModel } from "../models/assignmentData.model.js";

// data fetching from google sheet function since we are only reading i fetching date in csv format
const assignmentDataFetch = async () => {
  try {
    const response = await fetch(
      "https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/export?format=csv"
    );

    if (!response.ok) {
      throw new Error("failed to fetch data");
    }

    const csvData = await response.text();
    const data = Papa.parse(csvData, {
      header: true,
    }).data;

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: ` failed to fetch data`,
    };
  }
};

// here i am cleaning date and updating to database and also given API data point to refresh from client side
export const updateDb = async (req, res) => {
  function cleanDate(dateString) {
    const [date, month, year] = dateString.split("/");
    return new Date(year, month - 1, date);
  }

  function cleanData(data) {
    const cleanedData = {};
    Object.keys(data).forEach((item) => {
      if (item === "Day") {
        cleanedData[item.toLowerCase()] = cleanDate(data[item]);
        return;
      }
      if (item === "Gender") {
        cleanedData[item.toLowerCase()] = data[item]?.toLowerCase();
        return;
      }
      cleanedData[item.toLowerCase()] = data[item];
      return;
    });
    return cleanedData;
  }

  let status = {
    success: false,
    message: "failed to update database",
  };
  const replay = await assignmentDataFetch();

  if (!replay.success) {
    status = replay;
  } else {
    // data cleaned and stored in new array
    const newData = [];
    replay.data.forEach((item) => {
      newData.push(cleanData(item));
    });

    // remove old data from database
    await assignmentDataModel.deleteMany({});

    // add new data from database
    await assignmentDataModel.insertMany(newData);

    status = {
      success: true,
      message: "update database",
    };
  }

  if (status.success) {
    res.status(201).json(status);
  } else {
    res.status(500).json(status);
  }
};

// api point for data fetch based on query parameter its fetch data
export const fetchData = async (req, res) => {
  const { startdate, enddate, age, gender } = Object.fromEntries(
    Object.entries(req.query)
  );

  const filterParameter = {};
  if (startdate && enddate)
    filterParameter.day = {
      $gte: new Date(startdate),
      $lte: new Date(enddate),
    };
  if (age) filterParameter.age = { $eq: age };
  if (gender) filterParameter.gender = { $eq: gender };

  try {
    const filteredData = await assignmentDataModel.find(filterParameter);
    res.json({
      success: true,
      filteredData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `server side internal error ${error}`,
    });
  }
};
