import { constants } from './constants';

const {
  smallScreenWidth,
  mediumScreenWidth,
  maxFirstShowCardsOnMobile,
  maxFirstShowCardsOnNotebook,
  maxFirstShowCardsOnDesctop,
  numberAddForMoreButtonOnMobile,
  numberAddForMoreButtonOnDesctop,
} = constants;

export const getDisplayCardsAmount = () => {
  const screenWidth = window.screen.width;
  if (screenWidth < smallScreenWidth) {
    return {
      maxFirstShowCards: maxFirstShowCardsOnMobile,
      numberAdd: numberAddForMoreButtonOnMobile,
    };
  } else if (screenWidth < mediumScreenWidth) {
    return {
      maxFirstShowCards: maxFirstShowCardsOnNotebook,
      numberAdd: numberAddForMoreButtonOnMobile,
    };
  } else {
    return {
      maxFirstShowCards: maxFirstShowCardsOnDesctop,
      numberAdd: numberAddForMoreButtonOnDesctop,
    };
  }
};
