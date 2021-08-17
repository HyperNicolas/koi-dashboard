import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Card, media } from '../utils/styledComponents';
import { urlFor } from '../../lib/sanity';
import { ImageContainer } from '../../components/detailPage/Evolution';
import { getCurrentAgeTextCard } from '../utils/ageCalculator';

const Container = styled.div`
  ${media.xxl} {
    max-width: 10% !important;
  }
`;
const StyledCard = styled(Card)`
  padding: 0.5rem;
  padding-bottom: 1rem;
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
const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VerticalCard = ({ kois }) =>
  kois.map(({ id, sex, updates, bloodline, birthDate, breeder }) => (
    <Container
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
                <Text>{`${getCurrentAgeTextCard(birthDate)} ${breeder}`}</Text>
                <Text>{`${bloodline ? bloodline : ''} ${sex}`}</Text>
              </CardText>
            </div>
          </StyledCard>
        </a>
      </Link>
    </Container>
  ));

export default VerticalCard;
