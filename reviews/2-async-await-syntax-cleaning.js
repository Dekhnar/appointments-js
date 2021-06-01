/**
 * (2) rewrite properly promise with async await
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#rewriting_a_promise_chain_with_an_async_function
 */
// async function getIndexes() {
//   return await fetch('https://api.coingecko.com/api/v3/indexes').then((res) => res.json());
// }

// async function analyzeIndexes() {
//   const indexes = await getIndexes().catch((_) => {
//     throw new Error('Unable to fetch indexes');
//   });
//   return indexes;
// }

// my implementation
// async function getIndexes() {
//   const res = await fetch('https://api.coingecko.com/api/v3/indexes');
//   return res.json();
// }

// async function analyzeIndexes() {
//   try {
//     const indexes = await getIndexes();
//     return indexes;
//   } catch (e) {
//     throw new Error('Unable to fetch indexes');
//   }
// }
