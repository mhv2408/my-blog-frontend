import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {

    const [isAuth, setIsAuth] = useState(null); // null = loading

    useEffect(() => {
        async function checkAuth() {
        try {
            const res = await fetch("https://my-blog-568257561535.us-central1.run.app/editor/blog", {
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
