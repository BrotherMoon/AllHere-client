import React from 'react';
import {Table, Icon, Badge} from 'antd';
const columns = [{
    title: ' ',
    dataIndex: 'key',
    key: 'key',
    width: 'auto',
    render: (text, record, index) => {
        if (index < 3)  return <Badge status="error"/>
        if (index < 6)  return <Badge status="warning"/>
        return <Badge status="success"/>
    }
}, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
}, {
    title: '访问地址',
    dataIndex: 'href',
    key: 'href',
    render: text => <a href={text} target="_blank">{text}</a>
}];

export default class DataList extends React.Component {

    static propTypes = {
        data: React.PropTypes.array.isRequired,
        loading: React.PropTypes.bool.isRequired
    }

    render = () => <Table pagination={false} columns={columns}
                          dataSource={this.props.data}
                          loading={this.props.loading}/>
}