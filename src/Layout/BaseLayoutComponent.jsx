import {Outlet} from "react-router-dom";
import {Col, Layout, Row} from "antd";
import React, {useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

const {Header, Footer, Sider, Content} = Layout;
const LomSideBar = React.lazy(() => import("./SidebarComponent"));

const LomBaseLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div>
            <Layout>
                <Sider
                    className="site-background"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}>
                    <div className="logo" />
                    <LomSideBar/>
                </Sider>

                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0
                        }}>
                        <div className="site-layout-menubox">
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        </div>
                    </Header>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}>
                        <Row>
                            <Col span={20} offset={2}>
                                <Outlet/>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
            <Layout>
                <Footer
                    className="footer"
                >Footer</Footer>
            </Layout>
        </div>
    );
}

export default LomBaseLayout;
