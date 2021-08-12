import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { getAllKoi } from '../lib/api';
import {
  Title,
  slugify,
  Card,
  media,
} from '../components/utils/styledComponents';

const getKois = (kois) => {
  let varieties = [];
  kois.map(({ variety }) => (varieties = [...varieties, variety]));
  return varieties.filter((v, i, a) => a.indexOf(v) === i);
};

const Text = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainColor};
`;

const StyledTitle = styled(Title)`
  padding-top: 1rem;
  padding-bottom: 0;

  ${media.md} {
    padding-top: 1.5rem;
  }
  ${media.lg} {
    padding-top: 2rem;
  }
`;
const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding-top: 65%;
  :hover {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;

const Home = ({ kois }) => {
  const varieties = getKois(kois);

  return kois ? (
    <>
      <StyledTitle>All varieties</StyledTitle>
      <div className="cp-c-padding-2 cp-c-lg-padding-3  cp-c-row cp-c-wrap">
        {varieties.map((variety) => (
          <div
            className="cp-i-100 cp-i-sm-50 cp-i-md-33 cp-i-lg-25 cp-i-xl-20"
            key={variety}
          >
            <Link href={`/${slugify(variety)}`}>
              <a>
                <StyledCard className="cp-c-column cp-c-align-center-center">
                  <Text>{variety}</Text>
                </StyledCard>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div />
  );
};

export default Home;

export async function getStaticProps({ preview = false }) {
  const kois = await getAllKoi();
  return {
    props: { kois, preview },
    revalidate: 1,
  };
}
