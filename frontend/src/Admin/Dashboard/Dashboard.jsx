import AdminLayout from "@/layouts/AdminLayout";
import StatCard from "@/layouts/StatCard";
import BookingTrend from "./BookingTrend";
import RevenueTrend from "./RevenueTrend";
import ParkingUsage from "./ParkingUsage";
import UserDistribution from "./UserDistribution";
import HourlyHeat from "./HourlyHeat";



export default function Dashboard() {

const stats=[
{
title:"Total Parking Locations",
value:12,
change:"+2",
changeType:"up",
description:"Added this month"
},
{
title:"Total Slots",
value:480,
change:"+20",
changeType:"up",
description:"New slots added"
},
{
title:"Available Slots",
value:120,
change:"+8%",
changeType:"up",
description:"Live availability"
},
{
title:"Booked Slots",
value:360,
change:"-5%",
changeType:"down",
description:"Current occupancy"
},
{
title:"Total Users",
value:1540,
change:"+12%",
changeType:"up",
description:"New registrations"
},
{
title:"Total Bookings",
value:3250,
change:"+18%",
changeType:"up",
description:"Monthly bookings"
},
{
title:"Revenue",
value:"₹52,300",
change:"+10%",
changeType:"up",
description:"Monthly earnings"
},
];

return(

<AdminLayout>

<div className="space-y-10">

{/* KPI */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

{stats.map((item,index)=>(
<StatCard key={index} {...item}/>
))}

</div>

{/* Charts Row 1 */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

<BookingTrend/>
<RevenueTrend/>

</div>

{/* Charts Row 2 */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

<ParkingUsage/>
<UserDistribution/>

</div>

{/* Charts Row 3 */}

<div>

<HourlyHeat/>

</div>

</div>

</AdminLayout>

);

}