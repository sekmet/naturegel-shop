import PropTypes from "prop-types";
import React from "react";
import ContextProvider from '../../provider/ContextProvider';
import Header from "../../components/header";
import Carousel from "../../components/Carousel";
import Footer from "../../components/footer";
import About from "../../components/about";

function Layout({ children }) {
    return (
        <ContextProvider>
            <Header />

            <Carousel/>

            <section className="bg-white py-8">
                {children}
            </section>

            <About/>

            <Footer/>

        </ContextProvider>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;