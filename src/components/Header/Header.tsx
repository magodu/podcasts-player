import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Loader } from "semantic-ui-react";

import { useSiteContext } from 'src/store/site-context';

import classes from 'src/components/Header/Header.module.scss';

const Header: React.FC = () => {
    const { isLoading } = useSiteContext();

    return (
        <Menu secondary pointing>
            <Menu.Item as={Link} to="/">
                <h1 className="ui blue header">Podcaster</h1>
            </Menu.Item>
            <Menu.Item fitted="vertically" position="right">
                <div className={classes['podcast-spinner']}>
                    <Loader size="small" active={isLoading} className="spinner" />
                </div>
            </Menu.Item>
        </Menu>
    );
};

export default Header;
