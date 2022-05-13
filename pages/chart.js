import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import url from "../url";
import axios from "axios";
import React from "react";

export default (props) => {
  const [data, setData] = useState({
    datasets: [{}],
  });
  useEffect(() => {
    const label = [];
    const data = [];
    for (var i of props.data.numberDiseaseEach) {
      label.push(i.diseaseName);
      data.push(i.total);
    }
    const fetchData = () => {
      setData({
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            hoverOffset: 8,
          },
        ],
        labels: label,
      });
    };
    fetchData();
  }, []);
  return (
    <div style={{ width: "30%", height: "30%", marginLeft: "500px" }}>
      {/* <Doughnut data={data} /> */}
      <Line data={data} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await axios.get(`${url}/api/getDashboardStat`);
  return {
    props: {
      data: data.data,
    },
  };
};
