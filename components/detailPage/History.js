import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { orderBy } from 'lodash';
import { urlFor } from '../../lib/sanity';
import {
  getHistoryFormattedDate,
  getAgeDifferenceDate,
  getFormattedDate,
} from '../utils/ageCalculator';
import { Card, SubTitle } from '../utils/styledComponents';

const ImageContainer = styled.div`
  position: relative;
  height: 9rem;
  padding-top: 2rem;
`;
const Date = styled.div`
  color: ${(props) => props.theme.textColorLight};
  font-weight: 300;
  font-size: 1.2rem;
`;
const OverviewContainer = styled.div`
  padding-top: 1.5rem;
`;
const Divider = styled.div`
  padding-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e8e8e8;
`;

const TimeLineContainer = styled.ul`
  padding: 1rem;
  padding-top: 1.5rem;
`;
const Timeline = styled.ul`
  box-sizing: border-box;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: 'tnum';
  margin: 0;
  padding: 0;
  list-style: none;
`;
const TimelineItem = styled.li`
  position: relative;
  margin: 0;
  padding-bottom: 20px;
  font-size: 14px;
  list-style: none;
`;
const Trail = styled.div`
  position: absolute;
  top: 10px;
  left: 4px;
  height: calc(100% - 10px);
  border-left: 2px solid #f0f0f0;
`;
const Dot = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 100px;
  color: ${(props) => props.theme.mainColor};
  border-color: ${(props) => props.theme.mainColor};
`;
const TimelineContent = styled.div`
  position: relative;
  top: -7.001px;
  margin: 0 0 0 26px;
  word-break: break-word;
`;

const getNewKoi = (koi) => {
  let newUpdates = [];
  koi.updates.map(
    (update) =>
      (newUpdates = [
        ...newUpdates,
        { ...update, age: getAgeDifferenceDate(koi.birthDate, update.date) },
      ])
  );
  return { ...koi, updates: newUpdates };
};

const getKoiData = (koi) => {
  let ages = [];
  orderBy(koi.updates, ['date'], ['desc']).map(
    ({ age, length }) => (ages = [...ages, { age, length }])
  );
  return ages;
};

export const priceStyling = (value, precision) =>
  value.toLocaleString('NL', {
    style: 'currency',
    currency: 'eur',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

const History = ({ koi }) => {
  const [koiDate, setKoiData] = useState([]);
  const newKoi = getNewKoi(koi);

  useEffect(() => {
    setKoiData(getKoiData(newKoi));
  }, []);
  return (
    <div className="cp-c-padding-2 cp-c-lg-padding-3 cp-c-row cp-c-wrap">
      <div className="cp-i-100 cp-i-md-60">
        <Card>
          <SubTitle>Overview</SubTitle>
          {orderBy(newKoi.updates, ['date'], ['desc']).map(
            ({ length, date, image, age }, index) => (
              <OverviewContainer
                key={index}
                className="cp-c-row cp-c-align-start-center"
              >
                <ImageContainer className="cp-i-15">
                  <Image
                    src={urlFor(image)}
                    layout="fill"
                    objectFit="contain"
                    alt="age"
                    priority
                  />
                </ImageContainer>
                <div key={index} className="cp-i-flex cp-c-column">
                  <Date>{getHistoryFormattedDate(date)}</Date>
                  <Divider />
                  {index == koi.updates.length - 1 ? (
                    <div>
                      Started at an age of <b>{age} months</b> with a size of{' '}
                      <b>{length}cm</b>
                    </div>
                  ) : (
                    koiDate.length != 0 && (
                      <div>
                        <div>
                          Grew{' '}
                          <b>
                            {koiDate[index].length - koiDate[index + 1].length}
                            cm
                          </b>{' '}
                          in a span of{' '}
                          <b>
                            {koiDate[index].age - koiDate[index + 1].age} months
                          </b>
                          .
                        </div>
                        <div>
                          This is an average of{' '}
                          <b>
                            {(
                              (koiDate[index].length -
                                koiDate[index + 1].length) /
                              (koiDate[index].age - koiDate[index + 1].age)
                            ).toFixed(2)}
                            cm/month
                          </b>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </OverviewContainer>
            )
          )}
        </Card>
      </div>
      <div className="cp-i-100 cp-i-md-40">
        <Card>
          <SubTitle>Summary</SubTitle>
          <TimeLineContainer>
            <Timeline>
              {orderBy(newKoi.updates, ['date'], ['desc']).map(
                ({ length, date, age }, index) => (
                  <TimelineItem color="#3A3878" key={index}>
                    {newKoi.updates.length != index + 1 && <Trail />}
                    <Dot />
                    <TimelineContent>
                      {`${getFormattedDate(
                        date
                      )} - ${length}cm - ${age} months`}
                    </TimelineContent>
                  </TimelineItem>
                )
              )}
            </Timeline>
          </TimeLineContainer>
        </Card>
      </div>
    </div>
  );
};

export default History;
