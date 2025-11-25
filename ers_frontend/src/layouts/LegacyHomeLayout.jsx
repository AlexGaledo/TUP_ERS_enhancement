import React from 'react';
import Layout from './Layout';
import HomeNavigation from './HomeNavigation';

const HomeLayout = ({ children }) => {
    return (
        <Layout>
            <HomeNavigation />
            {children}
        </Layout>
    );
};

export default HomeLayout;