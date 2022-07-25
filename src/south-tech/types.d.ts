
/**
 * First portion the URL used to access a CampaignDocs eRetrieval website.
 * @example 
 * URL:'https://www.southtechhosting.com/SanDiegoCounty/CampaignDocsWebRetrieval/'
 * urlPathPrefix 'www.southtechhosting.com/SanDiegoCounty'
 * @example 
 * URL:'https://campaigndocs.co.fresno.ca.us/CampaignDocsWebRetrieval/'
 * urlPathPrefix 'campaigndocs.co.fresno.ca.us'
 */
export type UrlPrefixType = string;

/**
 * @examples 'Primary', 'General', 'Special', 'Recall'
 */
export type ElectionType = string;

/**
 * @format m/d/yyyy
 * @examples '11/8/2022', '11/6/2018'
 */
export type ElectionDate = string;

export interface UrlPathPrefix {
  /**
   * First portion the URL used to access a CampaignDocs eRetrieval website.
   * @example 
   * URL:'https://www.southtechhosting.com/SanDiegoCounty/CampaignDocsWebRetrieval/'
   * urlPathPrefix 'www.southtechhosting.com/SanDiegoCounty'
   * @example 
   * URL:'https://campaigndocs.co.fresno.ca.us/CampaignDocsWebRetrieval/'
   * urlPathPrefix 'campaigndocs.co.fresno.ca.us'
   */  
  urlPathPrefix: string
}

export interface PageSuffix {
  /**
   * The last part of the URL that indicates a specific page on the site.
   * @example
   * URL:'https://www.southtechhosting.com/SanDiegoCounty/CampaignDocsWebRetrieval/Search/SearchByFilerName.aspx'
   * pageSuffix 'Search/SearchByFilerName.aspx'
   */  
  pageSuffix: string
} 
