
import { getAgencyName } from "../agency-name";
import { BallotItem, ByJurisdiction, SearchResponse } from "../pages/types-output";
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
    const results = await searchBy.election.getElectionDates(this.urlPrefix, {}) as string[];
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
      .getBallotItems(this.urlPrefix, {electionDate}) as BallotItem[];

    if (jurisdictionFilter) {
      const filter = jurisdictionFilter.toLocaleUpperCase();

      results = results.filter((result) => 
        result.jurisdiction.toLocaleUpperCase() === filter);
    } else {
      results = results.filter((result) => result.jurisdiction !== 'All');
    }

    return results;
  }

  async getFilers(filingYear: string): Promise<ByJurisdiction[]>  {

    const response = await searchBy
      .jurisdiction.search(this.urlPrefix, {filingYear}) as SearchResponse<ByJurisdiction[]>;

    const allFilers: ByJurisdiction[] = [];
  
    if (response.status === 'Complete' && response.results.data) {
      allFilers.push(...response.results.data);
      console.log('Complete')
    } else {
      console.log('NOT Complete')

      const jurisdictions = await (await this.getJurisdictions(filingYear)).slice(0, 10);

      for await (const jurisdiction of jurisdictions) {
        const jurisdictionResponse = await searchBy
          .jurisdiction.search(this.urlPrefix, {filingYear, jurisdiction}) as SearchResponse<ByJurisdiction[]>;
        if (jurisdictionResponse.results.data) {
          console.log({'jurisdictionResponse.results.returned': jurisdictionResponse.results.returned})

          allFilers.push(...jurisdictionResponse.results.data)
        }
      console.log({'allFilers.length': allFilers.length})

      }
    }
    return allFilers;
  }

  async getCandidates(filingYear: string): Promise<ByJurisdiction[]>  {
    let filers = await this.getFilers(filingYear);
    const candidates = filers.filter((filer) => filer.candidate_last_name !== '');

    return candidates;
  }

  async getCommittees(filingYear: string): Promise<ByJurisdiction[]>  {
    let filers = await this.getFilers(filingYear);
    const committees = filers.filter((filer) => filer.candidate_last_name === '');

    return committees;
  }

  async getFilings(filerName: string) {}

  static generatePathPrefix(url: string): UrlPrefixType {
    const endPosition = url.indexOf('/CampaignDocsWebRetrieval');
    const baseUrl = url.slice(0, endPosition);

    const minimalSite = baseUrl.replace('https://', '');
    
    return minimalSite;
  }

}
