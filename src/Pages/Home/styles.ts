import styled from '@emotion/styled';

import { Headline, PageWrapper, pageTransitionEasing, slideUp } from 'styles';

export const HomeWrapper = styled(PageWrapper)`
  animation: ${slideUp} ${pageTransitionEasing} 0.5s;
`;

export const HomeHeadline = styled(Headline)`
  text-align: center;
`;

export const ListingImage = styled.img`
  max-height: 130px;
  border-radius: 3px;
`;
