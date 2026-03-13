import React from "react";
import ReactApexChart from "react-apexcharts";

export default function UserDistribution(){

const series=[45,30,25];

const options={
labels:["Daily Users","Weekly Users","Monthly Users"],
colors:["#6366f1","#22c55e","#f59e0b"],
legend:{position:"bottom"}
};

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-lg font-semibold mb-4">
User Activity
</h2>

<ReactApexChart
options={options}
series={series}
type="donut"
height={350}
/>

</div>

);

}