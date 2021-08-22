import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { getKoiById, getAllKoisWithSlug } from '../../lib/api';
import { slugify } from '../../components/utils/styledComponents';
import PopoverComponent from '../../components/utils/Popover';
import History from '../../components/detailPage/History';
import Evolution from '../../components/detailPage/Evolution';

const filterOptions = [{ title: 'Evolution' }, { title: 'History' }];

const DetailPage = ({ koi }) => {
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState('Evolution');

  return koi ? (
    <>
      <Breadcrumbs
        links={[{ to: `/${slugify(koi.variety)}`, text: koi.variety }]}
        currentBreadcrumbText={`${koi.breeder} ${
          koi.bloodline ? koi.bloodline : ''
        } ${koi.variety}`}
      />
      <PopoverComponent
        filterOptions={filterOptions}
        title={`${koi.breeder} ${koi.bloodline} ${koi.variety}`}
        dropdown={dropdown}
        setDropdown={setDropdown}
        visible={visible}
        setVisible={setVisible}
      />

      {dropdown == 'Evolution' ? (
        <Evolution koi={koi} />
      ) : (
        <History koi={koi} />
      )}
    </>
  ) : (
    <div />
  );
};

export default DetailPage;

export async function getStaticProps({ params, preview = false }) {
  const koi = await getKoiById(params.id, preview);
  return {
    props: {
      preview,
      koi,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const kois = await getAllKoisWithSlug();
  return {
    paths:
      kois?.map((koi) => ({
        params: {
          id: koi.id,
        },
      })) || [],
    fallback: true,
  };
}
