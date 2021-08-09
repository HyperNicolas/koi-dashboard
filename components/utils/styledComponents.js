// @flow

import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

export const theme = {
  textColor: '#565656',
  textColorLight: '#8c8a8a',
  textColorDark: '#404040',
  mainColor: '#3A3878',
  mainColorHighlight: '#0C4184',
  secondaryColor: '#123e78',
  lightColor: '#e7f5fe',
  thinBorder: '1px solid #dcdcdc',
  borderRadius: '10px',
  boxShadowHover: '0px 11px 20px rgba(20, 61, 123, 0.15)',
};

export const sizes = {
  sm: 568,
  md: 768,
  lg: 1024,
  wrapper: 1120,
  xl: 1280,
  xxl: 1500,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = `@media screen and (min-width: ${sizes[label] / 16}em)`;
  return acc;
}, {});

export const Wrapper = styled('div')`
  padding: ${(props) => props.padding && '0.5rem'};
  box-sizing: border-box;
  max-width: 1120px;
  margin: 0 auto;
`;

export const useWindowSize = () => {
  const [width, setWindowSize] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

export const Title = styled.div`
  padding: 2rem;
  font-size: 2rem;
  color: ${(props) => props.theme.mainColor};
  padding-bottom: 1rem;
`;
export const SubTitle = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainColor};
`;

export const Card = styled.div`
  transition: all 0.2s;
  width: 100%;
  padding: ${(props) => (props.padding ? props.padding : '1rem')};
  background: #ffffff;
  box-shadow: 10px 11px 40px rgba(20, 61, 123, 0.05);
  border-radius: 20px;
`;

export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str.toLowerCase();
}
