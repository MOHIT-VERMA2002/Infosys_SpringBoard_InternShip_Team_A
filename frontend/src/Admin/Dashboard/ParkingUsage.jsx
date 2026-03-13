import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ParkingUsage(){

const series=[{
name:"Bookings",
data:[120,90,140,60,110]
}];

const options={
chart:{type:"bar",toolbar:{show:false}},
colors:["#3b82f6"],
plotOptions:{
bar:{
borderRadius:6,
columnWidth:"45%"
}
},
xaxis:{
categories:["Phoenix","Airport","Mall","Metro","Stadium"]
}
};

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-lg font-semibold mb-4">
Parking Usage
</h2>

<ReactApexChart
options={options}
series={series}
type="bar"
height={350}
/>

</div>

);

}