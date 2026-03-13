import React from "react";
import ReactApexChart from "react-apexcharts";

export default function RevenueTrend(){

const series=[{
name:"Revenue",
data:[12000,19000,15000,23000,28000,32000,35000]
}];

const options={
chart:{type:"area",toolbar:{show:false}},
stroke:{curve:"smooth"},
colors:["#22c55e"],
dataLabels:{enabled:false},
fill:{
type:"gradient",
gradient:{
shadeIntensity:1,
opacityFrom:0.7,
opacityTo:0.2
}
},
xaxis:{
categories:["Jan","Feb","Mar","Apr","May","Jun","Jul"]
}
};

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-lg font-semibold mb-4">
Revenue Growth
</h2>

<ReactApexChart
options={options}
series={series}
type="area"
height={350}
/>

</div>

);

}