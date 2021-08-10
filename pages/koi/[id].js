import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import Lightbox from 'react-image-lightbox';
import { getKoiById, getAllKoisWithSlug } from '../../lib/api';
import { urlFor } from '../../lib/sanity';
import {
  Title,
  Card,
  SubTitle,
  media,
} from '../../components/utils/styledComponents';
import {
  getAgeDifferenceDate,
  getCurrentAgeText,
  getFormattedDate,
} from '../../components/utils/ageCalculator';

import 'react-image-lightbox/style.css';

const PictureEvolution = styled.div`
  padding: 0 0.5rem;
  margin-top: 1rem;

  ${media.md} {
    padding: 0 1rem;
  }
  ${media.lg} {
    padding: 0 2rem;
  } ;
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
const ImagesContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`;
const Test = styled.div`
  display: inline-block !important;
  min-width: 150px;

  ${media.xxl} {
    max-width: 12% !important;
  }
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
const getImages = (koi) => {
  let images = [];
  koi.updates.map(({ image }) => (images = [...images, urlFor(image)]));
  return images;
};

const DetailPage = ({ koi }) => {
  const [visible, setVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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
        data: koi && getData(koi),
        borderColor: '#3A3878',
        backgroundColor: '#3A3878',
        tension: 0.4,
      },
    ],
  };
  const images = koi && getImages(koi);

  return koi ? (
    <>
      <Title>
        {koi.breeder} {koi.bloodline} {koi.variety}
      </Title>
      <PictureEvolution>
        <Card>
          <SubTitle>Picture evolution</SubTitle>
          <ImagesContainer>
            <div className="cp-c-row cp-c-align-start-start cp-c-md-align-center-center">
              {koi.updates.map(({ length, date, image }, index) => (
                <Test
                  className="cp-i-100 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
                  key={index}
                  onClick={() => setPhotoIndex(index)}
                >
                  <div onClick={() => setVisible(true)}>
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
                </Test>
              ))}
            </div>
          </ImagesContainer>
        </Card>
      </PictureEvolution>
      <div className="cp-c-row cp-c-padding-1 cp-c-md-padding-2 cp-c-lg-padding-3 cp-c-wrap">
        <div className="cp-i-100 cp-i-md-50">
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
        <div className="cp-i-100 cp-i-md-50">
          <Card>
            <SubTitle>Size evolution</SubTitle>
            <Line data={data} width={null} height={null} options={options} />
          </Card>
        </div>
      </div>

      {visible && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setVisible(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
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
