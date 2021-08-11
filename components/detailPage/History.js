import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { orderBy } from 'lodash';
import { Timeline } from 'antd';
import { urlFor } from '../../lib/sanity';
import {
  getHistoryFormattedDate,
  getAgeDifferenceDate,
  getFormattedDate,
} from '../utils/ageCalculator';
import { Card, SubTitle } from '../utils/styledComponents';

import 'antd/dist/antd.css';

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

const TimeLineContainer = styled.div`
  padding: 1rem;

  & > .antd & .ant-timeline-item-head-blue {
    color: ${(props) => props.theme.mainColor};
    border-color: ${(props) => props.theme.mainColor};
  }
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
    <>
      <div className="cp-c-padding-1 cp-c-md-padding-2 cp-c-lg-padding-3 cp-c-row cp-c-wrap">
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
                              {koiDate[index].length -
                                koiDate[index + 1].length}
                              cm
                            </b>{' '}
                            in a span of{' '}
                            <b>
                              {koiDate[index].age - koiDate[index + 1].age}{' '}
                              months
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
                    <Timeline.Item color="#3A3878" key={index}>
                      {`${getFormattedDate(
                        date
                      )} - ${length}cm - ${age} months`}
                    </Timeline.Item>
                  )
                )}
              </Timeline>
            </TimeLineContainer>
          </Card>
        </div>
      </div>
    </>
  );
};

export default History;
