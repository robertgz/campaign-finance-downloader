// const cjs = require("../dist/cjs/")

const { eRetrieval } = require("../dist/cjs/")
const { scraper } = eRetrieval;
const { Agency } = scraper;

;(async () => {
  const urlPrefix = Agency.generatePathPrefix('https://campaigndocs.co.fresno.ca.us/CampaignDocsWebRetrieval/Search/SearchByElection.aspx')

  const agency = await new Agency(urlPrefix);
  console.log({ agency: agency.urlPrefix })


  // const dates = await eRetrieval.searchBy.election.getElectionDates(urlPrefix);
  // console.log({ dates: agency.electionDates });
  
  // const dates = await agency.getElectionDates();
  // console.log({ dates })
  
  // const years = await agency.getElectionYears();
  // console.log({ years })

  // const jurisdictions = await agency.getJurisdictions('2022');
  // console.log({ jurisdictions })

  // const ballotItems = await agency.getBallotItems('11/8/2022', 'Washington Colony Elementary School District');
  // console.log({ ballotItems })

  // const filers = await agency.getFilers('All', 'All');
  // console.log({ filers })
  const filers = await agency.getFilers('2022', 'Washington Colony Elementary School District');
  console.log({ filers })

  // const filers2 = await agency.getCandidates('2022', 'Washington Colony Elementary School District');
  // console.log({ filers2 })

})();

// ts-node ./test/run.ts 
