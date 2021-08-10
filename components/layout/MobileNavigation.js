import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { KoiSVG } from '../utils/styledComponents';

const KoiIcon = (props) => <KoiSVG {...props} />;

const StyledKoiIcon = styled.svg`
  width: 2rem;
  height: 2rem;
  stroke-width: 130px;
  stroke: ${(props) =>
    props.active == 'true' ? props.theme.mainColor : props.theme.textColor};

  :hover {
  }
`;
const LinkContainer = styled.div`
  padding: 1.5rem;
  border-left: 1px solid #e8e8e8;
  color: ${(props) =>
    props.active == 'true' ? props.theme.mainColor : props.theme.textColor};
`;
const IconContainer = styled.div`
  font-size: 2rem;
`;

const Container = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0px 2px 10px 4px rgb(0 0 0 / 15%);
  z-index: 1000;
`;
const MobileNavigation = ({ links }) => {
  const router = useRouter();
  return (
    <Container className="cp-c-row cp-c-align-end-center">
      {links.map(({ route, title, icon, routePath }) => (
        <Link key={title} href={route}>
          <a>
            <LinkContainer
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
            </LinkContainer>
          </a>
        </Link>
      ))}
    </Container>
  );
};

export default MobileNavigation;
