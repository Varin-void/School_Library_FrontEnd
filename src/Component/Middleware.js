import React, { useEffect } from 'react'
import { getCookie } from '../Ultils/Cookie'
import { useLocation, useNavigate } from 'react-router-dom';
import { store } from '../Ultils/Redux/Store';
import API from '../Ultils/API/API';
import { CHECK_LOGIN_URL } from '../Ultils/API/URL';

export default function Middleware() {
    const Navigate = useNavigate();
    const Location = useLocation();
    useEffect(() => {
        const CheckAccess = (RoleName, path) => {
            if (path.includes(RoleName) !== true) {
                Navigate(`/${RoleName}/Home`);
            }
        }
        const token = getCookie();
        if (token !== "") {
            try {

                store.dispatch({ type: "SET-TOKEN", payload: token })
                store.dispatch({ type: "SET-LOADING", payload: true })
                API.POST(CHECK_LOGIN_URL, { apiToken: token })
                    .then(res => {
                        if (res.status === 1) {
                            store.dispatch({ type: "SET-USER", payload: res.data })
                            store.dispatch({ type: "SET-LOADING", payload: false })
                            store.dispatch({ type: "SET-ROLE", payload: res.data.role.name })
                            if (Location.pathname.includes("Librarian")) {
                                CheckAccess(res.data.role.name, Location.pathname);
                            } else if (Location.pathname.includes("Teacher")) {
                                CheckAccess(res.data.role.name, Location.pathname);
                            } else if (Location.pathname.includes("Student")) {
                                CheckAccess(res.data.role.name, Location.pathname);
                            } else if (Location.pathname === "/") {
                                CheckAccess(res.data.role.name, Location.pathname);
                            }
                        } else {
                            if (Location.pathname !== "/") {
                                Navigate('/');
                            }
                        }
                    })
                    .catch(err => {
                        store.dispatch({ type: "SET-LOADING", payload: false })
                        console.log(err)
                    });
            }
            catch {
                store.dispatch({ type: "SET-LOADING", payload: false })
                console.log("Internal Server Error");
            }
        } else {
            if (Location.pathname !== "/") {
                Navigate('/');
            }
        }

    }, [Navigate, Location])

    return (
        <>
        </>
    )
}
