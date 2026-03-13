import React from "react";
import ReactApexChart from "react-apexcharts";

export default function HourlyHeat(){

const series=[{
name:"Bookings",
data:[5,8,12,20,32,40,50,65,70,60,45,30]
}];

const options={
chart:{type:"line",toolbar:{show:false}},
stroke:{curve:"smooth"},
colors:["#f59e0b"],
xaxis:{
categories:[
"6AM","7AM","8AM","9AM","10AM","11AM",
"12PM","1PM","2PM","3PM","4PM","5PM"
]
},
tooltip:{
y:{formatter:(val)=>`${val} bookings`}
}
};

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-lg font-semibold mb-4">
Hourly Booking Activity
</h2>

<ReactApexChart
options={options}
series={series}
type="line"
height={350}
/>

</div>

);

}