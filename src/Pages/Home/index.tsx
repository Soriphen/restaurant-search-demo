import { Global, css } from '@emotion/react';
import { Input } from '@tablecheck/tablekit-input';
import { ItemGroup, Item } from '@tablecheck/tablekit-item';
import { ModalDialog } from '@tablecheck/tablekit-modal-dialog';
import { Spinner, SpinnerSize } from '@tablecheck/tablekit-spinner';
import { Size } from '@tablecheck/tablekit-theme';
import {
  desktopTypographyStyles,
  mobileTypographyStyles,
  commonTypographyStyles
} from '@tablecheck/tablekit-typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { useShopSearch } from 'Hooks/useShopSearch';
import {
  ResultsAndSearchProps,
  ResultsAndSearchShopProps
} from 'Interfaces/results.interface';
import { Results } from 'Pages/Listing';

import { HomeWrapper, HomeHeadline, ListingImage } from './styles';

function ResultsAndSearchShop({
  shop
}: ResultsAndSearchShopProps): JSX.Element | null {
  const [isShopOpen, setIsShopOpen] = React.useState(false);
  const { i18n } = useTranslation();
  return (
    <>
      <Item
        customStyles="border: 1px solid grey; text-align: left; height: 200px"
        elemBefore={
          <ListingImage
            src={shop.search_image}
            alt={shop.name[1] || shop.name[0]}
          />
        }
        onClick={() => {
          setIsShopOpen(true);
        }}
      >
        <h4 style={{ fontWeight: 700, fontSize: 18 }}>
          {shop.name[1] || shop.name[0]}
        </h4>
        <div style={{ display: 'flex', textTransform: 'capitalize' }}>
          {shop.cuisines.join(', ')}
        </div>

        {shop.content_title_translations.map((title) => {
          if (title.locale === i18n.language) {
            return <h5 key={title.locale}>{title.translation}</h5>;
          }
          return null;
        })}
      </Item>
      <ModalDialog
        hasCloseIcon
        headerContent=""
        footerContent=""
        data-testid="Shop Modal"
        isOpen={isShopOpen}
        onOpenChange={(changedState) => {
          setIsShopOpen(changedState);
        }}
        width={1000}
      >
        <h1>{shop.name[1] || shop.name[0]}</h1>
        <>
          {shop.content_body_translations.map((body) => {
            if (body.locale === i18n.language) {
              return <p key={body.translation}>{body.translation}</p>;
            }
            return null;
          })}
        </>
      </ModalDialog>
    </>
  );
}

// The results that will show after a regular search or query search
function ResultsAndSearch({
  shopSearchData
}: ResultsAndSearchProps): JSX.Element | null {
  if (shopSearchData) {
    return (
      <>
        {shopSearchData?.shops.map((shop) => (
          <ResultsAndSearchShop key={shop._id} shop={shop} />
        ))}
      </>
    );
  }

  return null;
}

export function Form(): JSX.Element {
  const {
    isLoading,
    setShopSearchData,
    shopSearchData,
    searchValue,
    setSearchValue,
    results,
    termQuery
  } = useShopSearch();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Global
        styles={css`
          ${commonTypographyStyles};
          ${mobileTypographyStyles};

          @media (min-width: 1024px) {
            ${desktopTypographyStyles};
          }
        `}
      />
      <Input
        type="search"
        width={Size.Large}
        placeholder="Where would you like to search?"
        id="input"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onClick={() => {
          setIsOpen(true);
        }}
        shouldFitContainer
      />
      <ModalDialog
        hasCloseIcon
        headerContent=""
        footerContent=""
        data-testid="Search Modal"
        isOpen={isOpen}
        onOpenChange={(changedState) => {
          setIsOpen(changedState);
        }}
        width="500px"
      >
        <>
          <Input
            type="search"
            width={Size.Large}
            placeholder="Where would you like to search?"
            id="input"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            shouldFitContainer
          />
          {isLoading && <Spinner size={SpinnerSize.Regular} />}
          {results ? (
            <Results
              locations={results.locations}
              cuisines={results.cuisines}
              shops={results.shops}
              shopSearchData={shopSearchData}
              setShopSearchData={setShopSearchData}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          ) : null}
        </>
      </ModalDialog>
      <ItemGroup hasIndent>
        <ResultsAndSearch
          shopSearchData={shopSearchData}
          termQuery={termQuery}
          results={results}
        />
      </ItemGroup>
    </>
  );
}

export function Home(): JSX.Element {
  const [t, { language }] = useTranslation();

  return (
    <HomeWrapper>
      <HomeHeadline>
        <Form />
      </HomeHeadline>
      <Outlet />
      <Helmet>
        <title lang={language}>{`${t('attributes.titles.headline')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
    </HomeWrapper>
  );
}
