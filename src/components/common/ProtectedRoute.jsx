import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {

    const [isAuth, setIsAuth] = useState(null); // null = loading
    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function checkAuth() {
        try {
            const res = await fetch(`${BASE_URL}/editor/blog`, {
            credentials: "include", // send cookies
            });
            console.log(res)
            if (res.ok) {
            setIsAuth(true);
            } else {
            setIsAuth(false);
            }
        } catch (err) {
            setIsAuth(false);
        }
        }
        checkAuth();
    }, []);

    if (isAuth === null) return <div>Loading...</div>; // or spinner
    if (!isAuth) return <Navigate to="/login" />;

    return children;
}
