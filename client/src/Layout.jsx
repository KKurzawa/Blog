/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

const Layout = ({ props: { loggedIn, setLoggedIn, username } }) => {
    return (
        <>
            <Header
                props={{
                    loggedIn,
                    setLoggedIn,
                    username
                }} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout