import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from "../components/application/navigation";
import DashboardLinks from '../components/dashboard/dashboardLinks';
import DashboardControllerMonth from '../components/dashboard/dashboardControllerMonth';

/**
 * The dashboard screen of the application, where the logged in user can interact
 * @returns The dashboard screen, or navigates to homepage if no user is logged in
 */
export default function Dashboard() {
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const setUserAPI = (userData) => {
        setUser(userData);
        setLoaded(true);
    }

    useEffect(() => {
        loaded
            ? document.title = user.firstName.toLowerCase() + "'s " + "sked."
            : axios.get("http://localhost:8000/api/user/current", { withCredentials: true })
                .then(res => setUserAPI(res.data))
                .catch(err => navigate("/"))
    }, [loaded])

    return(
        <div className="dashboard">
            <Navigation loggedIn={true} user={user} />
            <div className="dashboard-content">
                <DashboardLinks user={user}/>
                <DashboardControllerMonth user={user} />
            </div>
        </div>
    )
}