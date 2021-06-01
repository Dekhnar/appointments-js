/**
 * (4) remove usage of global context `window`
 * and pass url as a parameter for having a function without external dependencies.
 * manage the case when url is not matching
 */
// function getQueryProvider(url) {
//   const url = window.location.href;
//   const [_, provider] = url.match(/provider=([^&]*)/);
//   if (provider) {
//     return provider;
//   }
//   return;
// }

// my implementation
// function getQueryProvider(url = 'http://example.com/provider=toto') {
//   let queryProvider = '';
//   try {
//     const [, provider] = url.match(/provider=([^&]*)/);
//     queryProvider = provider;
//     return queryProvider;
//   } catch (_) {
//     return queryProvider;
//   }
// }
