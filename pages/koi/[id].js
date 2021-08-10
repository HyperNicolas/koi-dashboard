import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { getKoiById, getAllKoisWithSlug } from '../../lib/api';
import { Title, slugify, media } from '../../components/utils/styledComponents';
import History from '../../components/detailPage/History';
import Evolution from '../../components/detailPage/Evolution';

const PopoverContainer = styled.div`
  padding-right: 0.5rem;
  font-size: 1rem;

  ${media.md} {
    padding-right: 1rem;
    font-size: 1.2rem;
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
  border-radius: 5px;
  min-width: 3rem;

  ${media.sm} {
    color: ${(props) => props.theme.mainColor};
  }
  ${media.md} {
    padding-left: 1.5rem;
  }
`;
const StyledPopover = styled(Popover)`
  line-height: 1rem;
`;
const ContainerSyle = {
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: '101',
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

  ${media.sm} {
    margin: 0 0.3em;
  }
`;
const TitleContainer = styled.div`
  padding-bottom: 1rem;

  ${media.lg} {
    padding-bottom: ${(props) => props.history && '0'};
  }
`;
const StyledTitle = styled(Title)`
  padding-bottom: 0;
`;

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
      <TitleContainer
        history={dropdown == 'History'}
        className="cp-c-row cp-c-align-spacebetween-end cp-c-lg-align-spacebetween-center"
      >
        <StyledTitle>
          {koi.breeder} {koi.bloodline} {koi.variety}
        </StyledTitle>
        <PopoverContainer onClick={() => setVisible(!visible)}>
          <StyledPopover
            isOpen={visible}
            onClickOutside={() => setVisible(false)}
            position="bottom"
            align="end"
            containerStyle={ContainerSyle}
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
            <Filter className="cp-c-row cp-c-align-start-center">
              <span className="cp-hide cp-md-show-block">{dropdown}</span>
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
