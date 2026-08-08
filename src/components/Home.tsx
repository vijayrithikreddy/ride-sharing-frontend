import DashBoard from "./RiderDashBoard";
import PassengerHome from "./PassengerHome";
import RiderHome from "./RiderHome";

function Home() {

    const userType = localStorage.getItem("userType");

    if (userType === "RIDER") {
        return <RiderHome />;
    } else{
    return <PassengerHome />;
    }
}

export default Home;