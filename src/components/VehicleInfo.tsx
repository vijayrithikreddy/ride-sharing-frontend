import type { Vehicle } from "../interfaces/Vehicle";

interface VehicleInfoCardProps {

    vehicle: Vehicle;

    editing: boolean;

    setVehicle: React.Dispatch<
        React.SetStateAction<Vehicle | null>
    >;

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
        readOnly = false,
    }: {
        label: string;
        field: keyof Vehicle;
        value: string | undefined;
        readOnly?: boolean;
    }) => (

        <div className="flex justify-between items-center py-3 border-b last:border-b-0">

            <span className="font-medium text-gray-600 w-40">
                {label}
            </span>

            {editing && !readOnly ? (

                <input
                    value={value ?? ""}
                    onChange={(e) =>
                        setVehicle(prev => ({
                            ...prev!,
                            [field]: e.target.value,
                        }))
                    }
                    className="border rounded-lg px-3 py-2 w-72 text-right"
                />

            ) : (

                <span className="font-semibold text-gray-900">
                    {value || "-"}
                </span>

            )}

        </div>

    );

    return (

        <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">

                Vehicle Information

            </h2>

            <EditableItem
                label="Vehicle Number"
                field="vehicleNumber"
                value={vehicle.vehicleNumber}
            />

            <EditableItem
                label="Vehicle Type"
                field="vehicleType"
                value={vehicle.vehicleType}
                readOnly
            />

            <EditableItem
                label="Brand"
                field="brand"
                value={vehicle.brand}
            />

            <EditableItem
                label="Model"
                field="model"
                value={vehicle.model}
            />

            <EditableItem
                label="Color"
                field="color"
                value={vehicle.color}
            />

        </div>

    );

}

export default VehicleInfoCard;