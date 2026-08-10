import RiderDashBoard from "./RiderDashBoard";
import PassengerDashBoard from "./PassengerDashBoard";
import NavBar from "./NavBar";

function Dashboard() {

    const userType = localStorage.getItem("userType");

    if (userType === "RIDER") {
        return <>
        <NavBar></NavBar>
        <RiderDashBoard />
        </>;
    }

    return <>
    <NavBar></NavBar>
    <PassengerDashBoard />
    </>;
}

export default Dashboard;