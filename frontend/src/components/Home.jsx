import React from 'react';




import FeaturedProduct from './common/FeaturedProduct';
import Footer from './common/Footer';
import Header from './common/Header';
import Hero from './common/Hero';
import LatestProduct from './common/LatestProduct';


const Home = () => {
    return (
        <>
            <Header />

            <Hero />

            <LatestProduct />

            <FeaturedProduct />

            <Footer />


        </>
    )
}

export default Home
