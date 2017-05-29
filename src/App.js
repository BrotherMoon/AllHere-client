import React from 'react';
import {Button, Icon, Layout, Switch, message, Affix, Tooltip} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
import {connect} from 'react-redux';
import {toggleSilder, fetchNews, toggleMessageForm} from './redux/actions';
import {request}from '../utils';
import 'antd/dist/antd.css';
import './App.css';
import MenuList from './MenuList';
import DataList from './DataList';
import config from '../config';
import MessageForm from './MessageForm';

class App extends React.Component {
    componentDidMount = () => {
        this.props.fetchNews('segmentfault');
    }

    onSubmitMessage = (visitor) => {
        const {toggleMessageForm} = this.props;
        request(`http://${config.serverAddress}/api/message`, 'post', {
            name: visitor.name,
            content: visitor.content,
            from: 'allhere'
        }).then(json => {
            console.log(json);
            message.success('留言成功');
            toggleMessageForm();
        }).catch(ex => {
            console.error('parsing failed', ex);
            message.error('留言失败，请重新再试');
        });
    }

    render() {
        const {collapsed, toggleSilder, fetchNews, news, loading, messageFormShow, toggleMessageForm} = this.props;
        return <Layout>
            <Header><Button type="primary" ghost icon={collapsed ? "menu-unfold" : "menu-fold"}
                            onClick={toggleSilder}>{collapsed ? "more" : "close"}</Button><span>allHere</span></Header>
            <Layout>
                <Sider collapsible trigger={null} collapsed={collapsed} defaultCollapsed={true} collapsedWidth={0}>
                    <MenuList onSelectHandle={type => {
                        fetchNews(type);
                        !collapsed && toggleSilder();
                    }}/>
                </Sider>
                <Content><DataList data={news} loading={loading}/></Content>
            </Layout>
            <MessageForm onSubmit={this.onSubmitMessage} toggleVisible={toggleMessageForm} visible={messageFormShow}/>
            <Footer>By <a href="https://github.com/BrotherMoon">徐文超</a><Icon type="github"/>
                <Tooltip placement="topLeft" title="给我留言">
                    <Button type="primary" ghost icon="smile-o" onClick={toggleMessageForm}/>
                </Tooltip>
            </Footer>
        </Layout>
    }
}
export default connect(
    state => ({
        collapsed: state.ui.collapsed,
        messageFormShow: state.ui.messageFormShow,
        news: state.async.news || [],
        loading: state.async.loadState.news ? state.async.loadState.news.loading : true
    }),
    dispatch => ({
        toggleSilder: () => dispatch(toggleSilder()),
        toggleMessageForm: () => dispatch(toggleMessageForm()),
        fetchNews: (what) => dispatch(fetchNews(what))
    })
)(App);