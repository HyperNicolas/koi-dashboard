import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Container = styled.section`
  height: 100vh;
`;
const StyledLayout = styled(Layout)`
  background: linear-gradient(
    125.83deg,
    #fafbff 10%,
    #fafbff 86.47%
  ) !important;
  width: 100% !important;
`;

const LayoutContainer = (props) => {
  const router = useRouter();
  const route = router.route;
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Container>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            left: 0,
            background: '#fff',
            borderRight: '1px solid #EBEBEB',
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div />
          <Menu
            style={{ borderRight: '0' }}
            mode="inline"
            selectedKeys={[route == '/' ? '1' : '2']}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link href="/">
                <a>Overview varieties</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link href="/koi">
                <a>All koi</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <StyledLayout>
          <div>{props.children}</div>
        </StyledLayout>
      </Layout>
    </Container>
  );
};
export default LayoutContainer;
