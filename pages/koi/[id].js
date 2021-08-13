import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import styled from 'styled-components';
import { AiOutlineDown } from '@react-icons/all-files/ai/AiOutlineDown';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { getKoiById, getAllKoisWithSlug } from '../../lib/api';
import {
  Title,
  slugify,
  media,
  useWindowSize,
} from '../../components/utils/styledComponents';
import History from '../../components/detailPage/History';
import Evolution from '../../components/detailPage/Evolution';

const PopoverContainer = styled.div`
  font-size: 1.1rem;
  padding: 0 1rem;
  padding-top: 0.5rem;

  ${media.sm} {
    padding: 0;
    padding-right: 1rem;
  }
  ${media.md} {
    padding-right: 1.5rem;
  }
  ${media.lg} {
    padding-right: 2rem;
  }
  :hover {
    cursor: pointer;
  }
`;
const Filter = styled.span`
  background: #fff;
  padding: 1rem;
  box-shadow: 10px 11px 40px rgba(20, 61, 123, 0.05);
  border-radius: 10px;
  min-width: 3rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.mainColor};

  ${media.sm} {
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
  }
  ${media.md} {
    padding-left: 1.5rem;
  }
`;
const StyledPopover = styled(Popover)`
  line-height: 1rem;
`;
const ContainerStyleDesktop = {
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: '101',
};
const ContainerStyleMobile = {
  left: '1rem',
  right: '1rem',
  borderRadius: '10px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: '101',
  width: '92%',
};
const FilterOption = styled.div`
  text-align: center;
  padding: 0.5rem 1.5rem;
  background: ${(props) =>
    props.active && `${props.theme.mainColor} !important`};
  color: ${(props) => props.active && '#fff !important'};
  margin: 1px 0;

  :hover {
    background: ${(props) => !props.active && '#f3f1f1'};
    cursor: pointer;
  }

  ${media.md} {
    background: #fff;
    color: ${(props) => props.theme.textColor};
  }
`;
export const StyledIcon = styled(AiOutlineDown)`
  font-size: 1rem;
  margin: 0 0.3em;
`;
const TitleContainer = styled.div`
  padding-bottom: ${(props) => (props.history ? '0.25rem' : '0.75rem')};

  ${media.lg} {
    padding-bottom: ${(props) => (props.history ? '1rem' : '2rem')};
  }
`;
const StyledTitle = styled(Title)`
  padding-bottom: 0;
  padding-top: 0;
`;

const filterOptions = [{ title: 'Evolution' }, { title: 'History' }];

const DetailPage = ({ koi }) => {
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState('Evolution');
  const width = useWindowSize();
  const isMobile = width < 568;

  return koi ? (
    <>
      <Breadcrumbs
        links={[{ to: `/${slugify(koi.variety)}`, text: koi.variety }]}
        currentBreadcrumbText={`${koi.breeder} ${
          koi.bloodline ? koi.bloodline : ''
        } ${koi.variety}`}
      />
      <TitleContainer
        history={dropdown == 'History'}
        className="cp-c-sm-row cp-c-align-spacebetween-center cp-c-lg-align-spacebetween-center cp-c-wrap"
      >
        <StyledTitle>
          {koi.breeder} {koi.bloodline} {koi.variety}
        </StyledTitle>
        <PopoverContainer
          history={dropdown == 'History'}
          onClick={() => setVisible(!visible)}
        >
          <StyledPopover
            isOpen={visible}
            onClickOutside={() => setVisible(false)}
            position="bottom"
            align="end"
            containerStyle={
              isMobile ? ContainerStyleMobile : ContainerStyleDesktop
            }
            content={filterOptions.map(({ title }) => (
              <FilterOption
                key={title}
                onClick={() => setDropdown(title)}
                active={title == dropdown}
              >
                {title}
              </FilterOption>
            ))}
          >
            <Filter className="cp-c-row cp-c-align-spacebetween-center">
              <span>{dropdown}</span>
              <StyledIcon />
            </Filter>
          </StyledPopover>
        </PopoverContainer>
      </TitleContainer>

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
