import PropTypes from "prop-types";
import React from "react";
import ContextProvider from '../../provider/ContextProvider';
import Header from "../../components/header";
import Footer from "../../components/footer";
import ShopHeader from "../utils/ShopHeader";

function Layout({ children }) {
    return (
        <ContextProvider>
            <Header />

            <ShopHeader/>

            <section className="bg-white py-1">
                {children}
            </section>

            <Footer/>

        </ContextProvider>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;