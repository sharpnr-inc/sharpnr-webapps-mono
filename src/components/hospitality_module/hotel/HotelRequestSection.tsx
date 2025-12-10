import { useState } from "react";
import EmptyHotelPlaceHolder from "./EmptyHotelComponenet";

export default function HotelRequestSection() {
    const [isdata, setData] = useState(false);
    console.log(setData)
  return (
    <>
    {isdata ? ( <div className="border rounded p-2 space-y-2">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Guest Request and Orders
        </h2>
        <p className="text-sm text-muted-foreground">
          Overview of room occupancy and bookings
        </p>
      </div>
    <div>Hey</div>
    </div>):(<EmptyHotelPlaceHolder/>)}
   
    </>
  );
}
