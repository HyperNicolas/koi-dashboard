import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { KoiSVG } from '../utils/styledComponents';
import { useWindowSize, media } from '../utils/styledComponents';

const KoiIcon = (props) => <KoiSVG {...props} />;
const links = [
  { route: '/', title: 'Varieties', icon: <AiOutlineHome />, routePath: '/' },
  {
    route: '/koi',
    title: 'All koi',
    icon: <KoiIcon />,
    routePath: '/koi',
  },
];

const Container = styled.section`
  position: relative;
  display: block !important;
  min-height: 100vh;
  background: linear-gradient(
    125.83deg,
    #fafbff 10%,
    #fafbff 86.47%
  ) !important;
`;
const Content = styled.div`
  padding-bottom: 5rem;

  ${media.sm} {
    padding-left: ${(props) => props.paddingLeft}px;
    padding-bottom: 0;
  }
`;
const MobileContainer = styled.div`
  ${media.sm} {
    display: none;
  }
`;
const DesktopContainer = styled.div`
  display: none;
  ${media.sm} {
    display: block;
  }
`;

const LayoutContainer = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [menuWidth, setMenuWidth] = useState('68');
  const router = useRouter();
  const width = useWindowSize();
  const isMobile = width < 768;

  useEffect(() => {
    document.getElementById('menu') &&
      setMenuWidth(document.getElementById('menu').offsetWidth);
  }, [collapsed]);
  useEffect(() => {
    document.getElementById('menu') &&
      setMenuWidth(document.getElementById('menu').offsetWidth);
  }, [width]);

  return (
    <Container className="cp-c-row">
      <MobileContainer>
        <MobileNavigation links={links} />
      </MobileContainer>
      <DesktopContainer>
        <DesktopNavigation
          id="menu"
          links={links}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </DesktopContainer>
      <Content className="cp-i-flex" paddingLeft={menuWidth}>
        {props.children}
      </Content>
    </Container>
  );
};
export default LayoutContainer;
