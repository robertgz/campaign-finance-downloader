import { getElections } from './src/elections'

;(async () => {
  const list = await getElections('CCV');
  console.log({ list });
})()

module.exports = {
  getElections,
};
