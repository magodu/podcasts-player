import React from 'react';

import Header from 'src/components/Header/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {

    return (
        <div className="ui container">
            <Header />
            <div>{props.children}</div>
        </div>
    );
};

export default Layout;
