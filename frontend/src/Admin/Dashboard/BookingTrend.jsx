import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BookingTrend(){

const series=[{
name:"Bookings",
data:[120,340,280,510,620,700,680]
}];

const options={
chart:{
type:"line",
toolbar:{show:false},
animations:{enabled:true}
},
stroke:{curve:"smooth",width:3},
colors:["#6366f1"],
xaxis:{
categories:["Jan","Feb","Mar","Apr","May","Jun","Jul"]
},
tooltip:{theme:"light"}
};

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-lg font-semibold mb-4">
Booking Trend
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