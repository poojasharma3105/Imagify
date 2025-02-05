import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(0);  // Default credit to 0

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // Function to load credits and user info
    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: { token },
            });

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);  // Assuming user data contains all user information
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to load credits");
        }
    };

    // Function to generate image
    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/image/generate-image`, 
                { prompt }, 
                { headers: { token } }
            );
    
            if (data.success) {
                loadCreditsData();
                return data.resultImage;
            } else {
                toast.error(data.message);
                await loadCreditsData();
    
                // If credit is 0 after refresh, navigate to buy credits
                if (credit === 0) {
                    setTimeout(() => navigate('/buy-credit'), 0);
                }
            }
        } catch (err) {
            console.error("Error in generateImage:", err);
            toast.error(err.response?.data?.message || "Error generating image");
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setCredit(0);  // Reset credit on logout
    };

    // Load user data and credits if token is available
    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    // Context value to be passed down
    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
