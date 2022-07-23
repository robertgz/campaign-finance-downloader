const cjs = require("../dist/cjs/")


;(async () => {
  const results = await cjs.SouthTech.searchBy.election.getElectionDates('southtechhosting.com/SanDiegoCounty')

  console.log({ results })
})()