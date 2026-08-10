import NavBar from "./NavBar";
import PassengerRideHistory from "./PassengerRideHistory";
import RideHistory from "./RideHistory";

function MyRides() {

    const userType = localStorage.getItem("userType");

    if (userType === "RIDER") {
        return <>
        <NavBar></NavBar>
        <RideHistory />
        </>;
    }

    return <>
    <NavBar></NavBar>
    <PassengerRideHistory />
    </>;
}

export default MyRides;