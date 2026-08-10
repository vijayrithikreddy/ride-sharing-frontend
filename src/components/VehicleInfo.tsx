import React from "react";
import type { Vehicle } from "../interfaces/Vehicle";
import { FaMotorcycle, FaHashtag, FaTag, FaPalette, FaShieldAlt } from "react-icons/fa";

interface VehicleInfoCardProps {
  vehicle: Vehicle;
  editing: boolean;
  setVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}

function VehicleInfoCard({
  vehicle,
  editing,
  setVehicle,
}: VehicleInfoCardProps) {
  const EditableItem = ({
    label,
    field,
    value,
    icon,
    readOnly = false,
  }: {
    label: string;
    field: keyof Vehicle;
    value: string | undefined;
    icon?: React.ReactNode;
    readOnly?: boolean;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0 gap-2">
      <span className="font-semibold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2 w-48">
        {icon}
        {label}
      </span>

      {editing && !readOnly ? (
        <input
          value={value ?? ""}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev!,
              [field]: e.target.value,
            }))
          }
          className="border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80 transition-all"
        />
      ) : (
        <span className="font-bold text-sm text-gray-900">{value || "-"}</span>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
        <FaMotorcycle className="text-blue-600 text-base" /> Vehicle Information
      </h2>

      <div className="divide-y divide-gray-100">
        <EditableItem
          label="Vehicle Number"
          field="vehicleNumber"
          value={vehicle.vehicleNumber}
          icon={<FaHashtag className="text-gray-400 text-xs" />}
        />

        <EditableItem
          label="Vehicle Type"
          field="vehicleType"
          value={vehicle.vehicleType}
          icon={<FaMotorcycle className="text-gray-400 text-xs" />}
          readOnly
        />

        <EditableItem
          label="Brand"
          field="brand"
          value={vehicle.brand}
          icon={<FaTag className="text-gray-400 text-xs" />}
        />

        <EditableItem
          label="Model"
          field="model"
          value={vehicle.model}
          icon={<FaShieldAlt className="text-gray-400 text-xs" />}
        />

        <EditableItem
          label="Color"
          field="color"
          value={vehicle.color}
          icon={<FaPalette className="text-gray-400 text-xs" />}
        />
      </div>
    </div>
  );
}

export default VehicleInfoCard;