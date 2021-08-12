import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { Title, media } from '../components/utils/styledComponents';
import { getAllKoi } from '../lib/api';
import VerticalCard from '../components/card/VerticalCard';
import { StyledTitle } from './[id]';

const VarietyPage = ({ kois }) =>
  kois ? (
    <section>
      <Breadcrumbs links={[]} currentBreadcrumbText="All your koi" />
      <StyledTitle>All your koi</StyledTitle>
      <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
        <VerticalCard kois={kois} />
      </div>
    </section>
  ) : (
    <div />
  );

export default VarietyPage;

export async function getStaticProps({ preview = false }) {
  const kois = await getAllKoi(preview);
  return {
    props: {
      kois,
      preview,
    },
    revalidate: 1,
  };
}
