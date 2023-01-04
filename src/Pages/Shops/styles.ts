import styled from '@emotion/styled';

import { PageWrapper, pageTransitionEasing, slideUp } from 'styles';

export const ShopsWrapper = styled(PageWrapper)`
  max-width: initial;
  animation: ${slideUp} ${pageTransitionEasing} 0.5s;
`;
