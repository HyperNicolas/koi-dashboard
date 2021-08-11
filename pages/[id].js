import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { Title, slugify, media } from '../components/utils/styledComponents';
import { getAllVarietyKoi, getAllVarieties } from '../lib/api';
import VerticalCard from '../components/card/VerticalCard';

const types = {
  asagi: '4368c1a8-e441-4b01-9b9c-fee00b0d837b',
  benigoi: '5a596a60-bdaa-4ad1-ab44-2c2ac4534563',
  showa: '9e928318-a9eb-4f10-8b4a-12802d4e321f',
  sanke: '2d61ee2f-9825-4a14-8679-ccd27b346247',
  kohaku: '60515e1b-6217-44ae-a3bd-f9bba150f1e9',
  goromo: '61ac1048-7600-47f7-9ee4-6b2d63a4bbfb',
  goshiki: 'f1eef384-0c11-4a35-a5af-c74644d15a5c',
  'shiro-utsuri': 'a5743e8c-7ad9-4ca0-895f-39713be84f59',
  ochiba: '832acd00-97a3-43c8-a8d6-238a5a1689c7',
  soragoi: '1084bb07-9215-4c1d-a789-466484050876',
  chagoi: 'a0c7a1d1-80b5-4ea1-bce8-fd79733ea78e',
  karashigoi: '903ad98a-e3b6-41ae-84bd-111e971fd07e',
  shusui: '0d5aa345-3966-4d89-81d9-99a74e6125be',
  'mukashi-ogon': 'c0045edf-9286-4dc8-8104-8832234c3d5e',
  'yamabuki-ogon': 'eca1f98d-a23f-4334-a9f0-b2349d288d2a',
};

export const StyledTitle = styled(Title)`
  padding-top: 0;
  ${media.md} {
    padding-bottom: 0;
  }
`;

const VarietyPage = ({ kois }) => {
  return kois && kois[0] ? (
    <section>
      <Breadcrumbs links={[]} currentBreadcrumbText={kois[0].variety} />
      <StyledTitle>All your {kois[0].variety}s</StyledTitle>
      <div className="cp-c-row cp-c-align-start-start cp-c-padding-1 cp-c-md-padding-2 cp-c-lg-padding-3 cp-c-wrap">
        <VerticalCard kois={kois} />
      </div>
    </section>
  ) : (
    <div />
  );
};
export default VarietyPage;

export async function getStaticProps({ params, preview = false }) {
  const kois = await getAllVarietyKoi(types[params.id], preview);
  return {
    props: {
      kois,
      preview,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const varieties = await getAllVarieties();
  return {
    paths:
      varieties?.map((variety) => ({
        params: {
          id: slugify(variety.title),
        },
      })) || [],
    fallback: true,
  };
}
