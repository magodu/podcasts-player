import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from 'src/components/Layout/Layout';

import SiteContextProvider from 'src/store/site-context';

import AppRoutes from 'src/AppRoutes';

function App() {

    return (
        <BrowserRouter>
            <SiteContextProvider>
                <Layout>
                    <AppRoutes />
                </Layout>
            </SiteContextProvider>
        </BrowserRouter>
    );
}

export default App;
