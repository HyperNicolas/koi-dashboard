import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { uniq } from 'lodash';
import { getAllKoi } from '../lib/api';
import { Title, slugify, Card } from '../components/utils/styledComponents';

export const getKois = (kois) => {
  let varieties = [];
  kois.map(({ variety }) => (varieties = [...varieties, variety]));
  return uniq(varieties);
};

const Text = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainColor};
`;
const StyledTitle = styled(Title)`
  padding-bottom: 0;
`;
const StyledCard = styled(Card)`
  height: 15rem;
  :hover {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;

const Home = ({ kois }) => {
  const varieties = getKois(kois);

  return (
    <>
      <StyledTitle>All varieties</StyledTitle>
      <div className="cp-c-padding-3 cp-c-row">
        {varieties.map((variety) => (
          <div className="cp-i-25" key={variety}>
            <Link href="/[id]" as={`/${slugify(variety)}`}>
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
