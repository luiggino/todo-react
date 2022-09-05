import React from "react";
import {MailOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link} from "react-router-dom";

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(<Link to="/">Home</Link>, 'sub1', <MailOutlined/>),
    getItem('TODO', 'sub2', <MailOutlined/>, [
        getItem(<Link to="/list">List</Link>, '1'),
        getItem(<Link to="/add">Add</Link>, '2'),
        getItem(<Link to="/edit">Edit</Link>, '3'),
        getItem(<Link to="/delete">Delete</Link>, '4'),
    ]),
];

const LomSideBar = () => {
    return (
        <Menu
            defaultSelectedKeys={['sub1']}
            defaultOpenKeys={['sub2']}
            mode="inline"
            items={items}
        />
    );
}

export default LomSideBar;
