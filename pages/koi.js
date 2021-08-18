import React, { useState } from 'react';
import { orderBy } from 'lodash';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import PopoverComponent from '../components/utils/Popover';
import { getAllKoi } from '../lib/api';
import VerticalCard from '../components/card/VerticalCard';

export const getSortedKois = (kois, order) => {
  if (order == 'Most recent') {
    return orderBy(kois, ({ createdAt }) => +createdAt);
  } else {
    return orderBy(kois, ['variety'], ['desc']);
  }
};

const filterOptions = [{ title: 'Most recent' }, { title: 'Variety' }];

const VarietyPage = ({ kois }) => {
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState('Most recent');

  return kois ? (
    <section>
      <Breadcrumbs links={[]} currentBreadcrumbText="All your koi" />
      <PopoverComponent
        filterOptions={filterOptions}
        title={`All your ${kois.length}`}
        dropdown={dropdown}
        setDropdown={setDropdown}
        visible={visible}
        setVisible={setVisible}
      />
      <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
        <VerticalCard kois={getSortedKois(kois, dropdown)} />
      </div>
    </section>
  ) : (
    <div />
  );
};

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
