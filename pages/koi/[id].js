import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { SRLWrapper } from 'simple-react-lightbox';
import { getKoiById, getAllKoisWithSlug, getAllVarieties } from '../../lib/api';
import { urlFor } from '../../lib/sanity';
import { Title, Card, SubTitle } from '../../components/utils/styledComponents';
import {
  getAgeDifferenceDate,
  getCurrentAgeText,
  getFormattedDate,
} from '../../components/utils/ageCalculator';

const PictureEvolution = styled.div`
  padding: 0 2rem;
`;
export const ImageContainer = styled.div`
  position: relative;
  padding-top: 160%;

  :hover {
    cursor: pointer;
  }
`;
const Date = styled.div`
  padding-top: 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  font-weight: 300;
  color: ${(props) => props.theme.textColor};
`;
const Size = styled.div`
  font-size: 1.3rem;
  text-align: center;
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
  padding-right: 0.4rem;
`;
const Age = styled.div`
  font-size: 1.3rem;
  text-align: center;
  color: ${(props) => props.theme.mainColor};
`;
const IframeContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  border-radius: 20px;
`;
const StyledReactPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  z-index: 2;
`;

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const DetailPage = ({ koi }) => {
  const getImages = (koi) => {
    let images = [];
    koi.updates.map(({ image }) => (images = [...images, urlFor(image)]));
    return images;
  };
  const getData = (koi) => {
    let data = [];
    koi.updates.map(
      ({ date, length }) =>
        (data = [
          ...data,
          {
            x: `${getAgeDifferenceDate(koi.birthDate, date)} months`,
            y: length,
          },
        ])
    );
    return data;
  };

  const data = {
    datasets: [
      {
        label: 'Size (cm)',
        data: getData(koi),
        borderColor: '#3A3878',
        backgroundColor: '#3A3878',
        tension: 0.4,
      },
    ],
  };
  return (
    <SRLWrapper elements={getImages(koi)}>
      <Title>
        {koi.breeder} {koi.bloodline} {koi.variety}
      </Title>
      <PictureEvolution>
        <Card>
          <SubTitle>Picture evolution</SubTitle>
          <div className="cp-c-row cp-c-align-center-center">
            {koi.updates.map(({ length, date, image }, index) => (
              <div className="cp-i-15" key={index}>
                <ImageContainer>
                  <Image
                    src={urlFor(image)}
                    layout="fill"
                    objectFit="contain"
                    alt="age"
                    priority
                  />
                </ImageContainer>
                <Date>{getFormattedDate(date)}</Date>
                <div className="cp-c-row cp-c-align-center-center">
                  <Size>{length}cm</Size>
                  <Age>{getCurrentAgeText(koi.birthDate)}</Age>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </PictureEvolution>

      <div className="cp-c-row cp-c-padding-3">
        <div className="cp-i-50">
          <Card padding="0">
            <IframeContainer>
              <StyledReactPlayer
                type="text/html"
                width="100%"
                height="100%"
                src={koi.youtube}
                frameBorder="0"
              />
            </IframeContainer>
          </Card>
        </div>
        <div className="cp-i-50">
          <Card>
            <SubTitle>Size evolution</SubTitle>
            <Line data={data} width={null} height={null} options={options} />
          </Card>
        </div>
      </div>
    </SRLWrapper>
  );
};

export default DetailPage;

export async function getStaticProps({ params, preview = false }) {
  const koi = await getKoiById(params.id, preview);
  const variety = await getAllVarieties();
  return {
    props: {
      preview,
      koi,
      variety,
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
