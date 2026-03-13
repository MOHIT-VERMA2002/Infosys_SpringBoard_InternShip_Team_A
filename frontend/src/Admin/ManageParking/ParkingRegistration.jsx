import React, { useState } from "react";
import {
  Building2, MapPin, IndianRupee, Clock3,
  Layers, Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger, DialogClose
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import Input from "@/components/ui/Input";

export default function ParkingRegistrationForm() {

  const [parkingType, setParkingType] = useState("NORMAL");
  const [floors, setFloors] = useState(0);
  const [evEnabled, setEvEnabled] = useState(false);

  const [formData, setFormData] = useState({
    parkingName: "",
    address: "",
    city: "",
    pincode: "",
    price: "",
    openTime: "",
    closeTime: "",
    evPrice: ""
  });

  const [normalSlots, setNormalSlots] = useState({
    prefix: "",
    total: "",
    occupied: 0,
    evStations: ""
  });

  const [floorData, setFloorData] = useState([]);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));


  const handleFloorCount = (count) => {
    const num = Number(count);
    setFloors(num);

    setFloorData(
      Array.from({ length: num }, () => ({
        floorName: "",
        prefix: "",
        total: "",
        occupied: 0,
        evStations: ""
      }))
    );
  };


  const updateFloor = (index, field, value) => {
    const updated = [...floorData];
    updated[index][field] = value;
    setFloorData(updated);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      evEnabled,
      parkingType,
      normalSlots,
      floors: floorData
    };

    console.log(payload);
  };

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-xl shadow-lg">
          + New Parking
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-5xl bg-slate-100 rounded-3xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">
            Register Parking
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">

          <Card title="Basic Details">

            <PremiumInput icon={Building2} label="Parking Name" name="parkingName" onChange={handleChange} />
            <PremiumInput icon={MapPin} label="Address" name="address" onChange={handleChange} />

            <Grid2>
              <PremiumInput label="City" name="city" onChange={handleChange} />
              <PremiumInput label="Pincode" name="pincode" onChange={handleChange} />
            </Grid2>

            <Grid2>
              <PremiumInput icon={IndianRupee} label="Parking Price / hour" name="price" onChange={handleChange} />
              <PremiumInput icon={Clock3} label="Open Time" type="time" name="openTime" onChange={handleChange} />
            </Grid2>

            <PremiumInput icon={Clock3} label="Close Time" type="time" name="closeTime" onChange={handleChange} />

          </Card>

          <Card title="Parking Configuration">

            <select
              className="w-full h-12 border rounded-xl px-4 bg-white"
              value={parkingType}
              onChange={(e) => setParkingType(e.target.value)}
            >
              <option value="NORMAL">Normal Parking</option>
              <option value="MULTI">Multi Floor Parking</option>
            </select>

            <div className="flex gap-3 mt-4 items-center">
              <input type="checkbox" onChange={() => setEvEnabled(!evEnabled)} />
              <Label>EV Charging Available</Label>
            </div>

            {evEnabled && (
              <PremiumInput
                icon={IndianRupee}
                label="EV Charging Price"
                name="evPrice"
                onChange={handleChange}
              />
            )}

          </Card>


          {parkingType === "NORMAL" && (
            <Card title="Slot Details">

              <PremiumInput
                label="Slot Prefix"
                onChange={(e) => setNormalSlots(prev => ({ ...prev, prefix: e.target.value }))}
              />

              <PremiumInput
                label="Total Slots"
                onChange={(e) => setNormalSlots(prev => ({ ...prev, total: e.target.value }))}
              />

              <p className="text-sm text-green-600">
                Available Slots: {normalSlots.total || 0}
              </p>

              {evEnabled && (
                <PremiumInput
                  icon={Zap}
                  label="EV Charging Stations"
                  onChange={(e) => setNormalSlots(prev => ({ ...prev, evStations: e.target.value }))}
                />
              )}

            </Card>
          )}


          {parkingType === "MULTI" && (
            <Card title="Floor Details">

              <PremiumInput
                icon={Layers}
                label="Number of Floors"
                type="number"
                onChange={(e) => handleFloorCount(e.target.value)}
              />

              {floorData.map((floor, index) => (

                <div key={index} className="bg-white p-6 rounded-xl space-y-4">

                  <h3 className="text-lg font-semibold text-indigo-600">
                    Floor {index + 1}
                  </h3>

                  <PremiumInput
                    label="Floor Name"
                    onChange={(e) => updateFloor(index, "floorName", e.target.value)}
                  />

                  <PremiumInput
                    label="Slot Prefix"
                    onChange={(e) => updateFloor(index, "prefix", e.target.value)}
                  />

                  <PremiumInput
                    label="Total Slots"
                    onChange={(e) => updateFloor(index, "total", e.target.value)}
                  />

                  <p className="text-sm text-green-600">
                    Available: {floor.total || 0}
                  </p>

                  {evEnabled && (
                    <PremiumInput
                      icon={Zap}
                      label="EV Charging Stations"
                      onChange={(e) => updateFloor(index, "evStations", e.target.value)}
                    />
                  )}

                </div>

              ))}

            </Card>
          )}

          <DialogFooter>

            <DialogClose asChild>
              <Button variant="secondary">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" className="bg-indigo-600 text-white">
              Save Parking
            </Button>

          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}


const Card = ({ title, children }) => (
  <div className="bg-white p-8 rounded-2xl space-y-6 shadow-sm">
    <h2 className="text-xl font-bold">{title}</h2>
    {children}
  </div>
);


const Grid2 = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);


const PremiumInput = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-2">
    <Label>{label}</Label>

    <div className="flex items-center border rounded-xl px-3 h-12 bg-white">

      {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}

      <Input
        className="w-full border-none bg-transparent focus-visible:ring-0"
        {...props}
      />

    </div>
  </div>
);