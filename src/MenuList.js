import React from 'react';
import {Menu, Icon, Tooltip} from 'antd';
const MenuItemGroup = Menu.ItemGroup;

import {menuMsg}from '../data';

export default class MenuList extends React.Component {

    static propTypes = {
        onSelectHandle: React.PropTypes.func.isRequired,
    }

    render() {
        return <Menu style={{border: 'none'}} defaultSelectedKeys={['Segmentfault']}
                     onClick={({item, key, selectedKeys}) => this.props.onSelectHandle(key)}>
            {menuMsg.map(msg => <Menu.Item key={msg.key}><Icon
                type={msg.icon}/><span className="nav-text">{msg.text}</span></Menu.Item>)}
        </Menu>
    }
}