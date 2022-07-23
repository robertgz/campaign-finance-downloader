import { Page, Browser } from 'playwright';
import { SearchByPagePaths } from './constants/search-by-page-paths.js';
import { getPage } from './pages/get-page.js';

export const Paths = SearchByPagePaths;

export const getWelcomePage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: ''
  });
}

export const getHomePage = getWelcomePage;

export const getSearchFilersNamePage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: Paths.FilerName,
  });
}

export const getSearchCandidatesLastNamePage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: Paths.CandidateLastName,
  });
}

export const getSearchByBallotItemPage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: Paths.BallotItem,
  });
}

export const getSearchElectionPage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: Paths.Election,
  });
}

export const getSearchByJurisdictionPage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: Paths.Jurisdiction,
  });
}

export const getSearchByDistrictPage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: Paths.District,
  });
}

export const getSearchByFiledFormPage = async (browser: Browser, urlPathPrefix: string): Promise<Page> => {
  return await getPage({
    browser,
    urlPathPrefix,
    urlPathSuffix: Paths.FiledForm,
  });
}
