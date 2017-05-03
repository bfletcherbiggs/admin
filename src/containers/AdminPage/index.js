//PACKAGES
import React from 'react';
//COMPONENTS
import NavBarTop from '../../components/Nav/index';
import AdminMain from '../AdminMain/index';
//CSS
import './admin.css';

export default function AdminPage () {
    return (
        <div className="AdminPage-main">
            <NavBarTop/>
            <AdminMain/>
        </div>
    )
}
