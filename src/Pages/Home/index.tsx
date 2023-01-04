import { Input } from '@tablecheck/tablekit-input';
import { Spinner, SpinnerSize } from '@tablecheck/tablekit-spinner';
import { Size } from '@tablecheck/tablekit-theme';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import { useDebounce } from 'Hooks/useDebounce';
import { ResultsData } from 'Interfaces/results.interface';
import { Locations } from 'Pages/Shops';

import { HomeHeadline, HomeWrapper } from './styles';

export function Form(): JSX.Element {
  const baseUrl = 'https://staging-snap.tablecheck.com/v2/autocomplete';
  const locale = 'en';
  const shopUniverseId = '57e0b91744aea12988000001';
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const termQuery = query.get('term');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [results, setResults] = React.useState<ResultsData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedSearch = useDebounce(searchValue, 500);

  // Debounce search for locations
  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl}?locale=${locale}&shop_universe_id=${shopUniverseId}&text=${debouncedSearch}`
        );
        const data = await response.json();
        setResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (debouncedSearch) {
      fetchResults();
    }
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (termQuery) {
      const fetchResults = async () => {
        try {
          const response = await fetch(
            `${baseUrl}?locale=${locale}&shop_universe_id=${shopUniverseId}&text=${termQuery}`
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchResults();
    }
  }, [termQuery]);

  return (
    <>
      <Input
        label="Where would you like to search?"
        type="search"
        width={Size.Large}
        id="input"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        shouldFitContainer
      />
      {isLoading && <Spinner size={SpinnerSize.Regular} />}
      {results ? (
        <Locations
          locations={results.locations}
          cuisines={results.cuisines}
          shops={results.shops}
        />
      ) : null}
      {/* {JSON.stringify(results)} */}
    </>
  );
}

export function Home(): JSX.Element {
  const [t, { language }] = useTranslation();

  return (
    <HomeWrapper>
      {/* <HomeHeadline>{t('attributes.titles.headline')}</HomeHeadline> */}
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
