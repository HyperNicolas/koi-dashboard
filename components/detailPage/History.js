import React from 'react';
import { Card, SubTitle } from '../utils/styledComponents';
import { CardContainer } from './Evolution';
const History = ({ koi }) => {
  return (
    <>
      <div className="cp-c-padding-1 cp-c-md-padding-2 cp-c-lg-padding-3 cp-c-row cp-c-wrap">
        <div className="cp-i-100 cp-i-md-50">
          <Card>
            <SubTitle>History overview</SubTitle>
            {koi.updates.map(({ length, date, image }, index) => (
              <div key={index} className="cp-c-row">
                <div>{date}</div>
                <div>{length}cm</div>
              </div>
            ))}
          </Card>
        </div>
        <div className="cp-i-100 cp-i-md-50">
          <Card>
            <SubTitle>History summary</SubTitle>
            {koi.updates.map(({ length, date, image }, index) => (
              <div key={index} className="cp-c-row">
                <div>{date} </div>
                <div>{length} cm</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
};

export default History;
