
import { getAgencyName } from "../agency-name";
import { BallotItem, ByJurisdiction } from "../search-by/output-types";
import { searchBy } from "../search-by";
import type { UrlPrefixType } from "../types";

export class Agency {
  urlPrefix: UrlPrefixType;
  electionDates: string[] = [];

  constructor(urlPrefix: UrlPrefixType) {
    this.urlPrefix = urlPrefix;
  }

  async getAgencyName() {
    return await getAgencyName(this.urlPrefix);
  }

  async updateElectionDates() {
    const results = await searchBy.election.getElectionDates({urlPathPrefix: this.urlPrefix});
    this.electionDates = results.filter((item) => !isNaN(Date.parse(item)));
  }

  async getElectionDates() {
    if (this.electionDates.length < 1) {
      await this.updateElectionDates();
    }

    return this.electionDates;
  }

  async getElectionYears(): Promise<string[]> {
    const dates = await this.getElectionDates();
    const years = dates.map((date) => new Date(date).getFullYear().toString());
    return years;
  }

  async getJurisdictions(filingYear: string) {
    const results = await searchBy.jurisdiction
      .getJurisdictions(this.urlPrefix, {filingYear});
    return results.filter((result) => result !== 'All')
  }

  async getBallotItems(electionDate: string, jurisdictionFilter?: string) {
    let results: BallotItem[] = await searchBy.ballotItem
      .getBallotItems(this.urlPrefix, {electionDate});

    if (jurisdictionFilter) {
      const filter = jurisdictionFilter.toLocaleUpperCase();

      results = results.filter((result) => 
        result.jurisdiction.toLocaleUpperCase() === filter);
    } else {
      results = results.filter((result) => result.jurisdiction !== 'All');
    }

    return results;
  }

  // async getFilers(electionDate: string, ballotItem: string) {
  //   return await searchBy.ballotItem.search(this.urlPrefix, {electionDate, ballotItem});
  // }
  async getFilers(filingYear: string, jurisdiction: string): Promise<ByJurisdiction[]>  {
    // on some years this may not return all of the filers if the amount is > 400
    // 1 get the count for a year but no a jurisdiction
    // if results are < 400 the return them
    // else get them one jurisdiction at a time
    const response = await searchBy.jurisdiction.search(this.urlPrefix, {filingYear}) as ByJurisdiction[];

    let allFilers: ByJurisdiction[] | null = null;
    // if (response.length < 400) {
    //   return response;
    // } else {
    //   allFilers = response;
    //   return allFilers;
    // }
    return response;

  }

  async getCandidates(filingYear: string, jurisdiction: string): Promise<ByJurisdiction[]>  {
    let filers = await this.getFilers(filingYear, jurisdiction);
    filers = filers.filter((filer) => filer.candidate_last_name !== '');

    return filers;
  }

// getCandidates will group the filers by same last name and each candidate can have 1 or more filers

  async getFilings(filerName: string) {}



  static generatePathPrefix(url: string): UrlPrefixType {
    const endPosition = url.indexOf('/CampaignDocsWebRetrieval');
    const baseUrl = url.slice(0, endPosition);

    const minimalSite = baseUrl.replace('https://', '');
    
    return minimalSite;
  }

}
