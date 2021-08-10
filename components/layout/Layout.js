import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  AiOutlineHome,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import { KoiSVG } from '../utils/styledComponents';

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

const StyledKoiIcon = styled.svg`
  width: 1.3rem;
  height: 1.3rem;
  stroke-width: 110px;
  stroke: ${(props) =>
    props.active == 'true'
      ? props.theme.mainColor
      : props.theme.textColorLight};

  :hover {
  }
`;

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
const Menu = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  border-right: 1px solid #ebebeb;
`;
const IconContainer = styled.div`
  font-size: 1.2rem;
`;

const LinkContainer = styled.div`
  font-weight: ${(props) => (props.active == 'true' ? 400 : 300)};
  padding: 0.8rem;
  color: ${(props) =>
    props.active == 'true'
      ? props.theme.mainColor
      : props.theme.textColorLight};

  :hover {
    color: ${(props) => props.theme.mainColor};

    & > ${StyledKoiIcon} {
      stroke: ${(props) => props.theme.mainColor};
    }
  }
`;
const LinkText = styled.div`
  margin-left: 0.8rem;
`;
const CollapseContainer = styled.div`
  user-select: none;
  :hover {
    cursor: pointer;
  }
`;
const CollapseIconContainer = styled.div`
  width: fit-content;
  margin: auto;
  padding: 0.5rem;
  font-size: 1.5rem;
  border: 1px solid #e8e8e8;
  border-radius: 50px;
  color: ${(props) => props.theme.textColorLight};

  :hover {
    border-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.mainColor};
  }
`;
const CollapseText = styled.div`
  font-size: 0.8rem;
`;

const Content = styled.div`
  padding-left: ${(props) => props.paddingLeft}px;
`;

const LayoutContainer = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [menuWidth, setMenuWidth] = useState('68');
  const router = useRouter();
  useEffect(() => {
    setMenuWidth(document.getElementById('menu').offsetWidth);
  }, [collapsed]);

  return (
    <Container className="cp-c-row">
      <Menu className="cp-c-column cp-c-padding-2" id="menu">
        <div className="cp-i-flex">
          {links.map(({ route, title, icon, routePath }) => (
            <Link key={title} href={route}>
              <a>
                <LinkContainer
                  className="cp-c-row cp-c-align-start-center"
                  active={(route == '/'
                    ? router.asPath == '/'
                    : router.asPath.includes(routePath)
                  ).toString(router.asPath)}
                >
                  {route != '/koi' ? (
                    <IconContainer>{icon}</IconContainer>
                  ) : (
                    <StyledKoiIcon
                      active={(route == '/'
                        ? router.asPath == '/'
                        : router.asPath.includes(routePath)
                      ).toString(router.asPath)}
                    >
                      <KoiIcon />
                    </StyledKoiIcon>
                  )}
                  {!collapsed && <LinkText>{title}</LinkText>}
                </LinkContainer>
              </a>
            </Link>
          ))}
        </div>
        <CollapseContainer onClick={() => setCollapsed(!collapsed)}>
          <CollapseIconContainer>
            {collapsed ? (
              <BsArrowBarRight />
            ) : (
              <div className="cp-c-row cp-c-align-start-center">
                <BsArrowBarLeft /> <CollapseText>Collapse</CollapseText>
              </div>
            )}
          </CollapseIconContainer>
        </CollapseContainer>
      </Menu>
      <Content className="cp-i-flex" paddingLeft={menuWidth}>
        {props.children}
      </Content>
    </Container>
  );
};
export default LayoutContainer;
