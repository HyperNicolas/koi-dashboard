import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../utils/styledComponents';
import { urlFor } from '../../lib/sanity';
import { ImageContainer } from '../../pages/koi/[id]';

const StyledCard = styled(Card)`
  :hover {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;
const CardText = styled.div`
  height: 2.5rem;
  padding-top: 0.5rem;
  line-height: 1.1rem;
  text-align: center;
  color: ${(props) => props.theme.mainColor};
`;

const VerticalCard = ({ kois }) =>
  kois.map(({ id, updates, bloodline, breeder }) => (
    <div
      className="cp-i-50 cp-i-sm-33 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
      key={id}
    >
      <Link href={`/koi/${id}`}>
        <a>
          <StyledCard>
            <div>
              <ImageContainer>
                <Image
                  src={urlFor(updates[updates.length - 1].image)}
                  layout="fill"
                  objectFit="contain"
                  alt="age"
                  priority
                />
              </ImageContainer>
              <CardText>
                <div>{breeder}</div>
                <div>{bloodline}</div>
              </CardText>
            </div>
          </StyledCard>
        </a>
      </Link>
    </div>
  ));

export default VerticalCard;
