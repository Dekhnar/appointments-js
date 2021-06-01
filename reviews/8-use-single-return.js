/**
 * (8) you can use a single return here,
 * for a better clarity
 */
// function getUserSettings(user) {
//   if (user) {
//     const project = getProject(user.id);
//     if (project) {
//       const settings = getSettings(project.id);
//       if (settings) {
//         return settings;
//       }
//     }
//   }
//   return {};
// }

// my implementation
// function getUserSettings(user) {
//   let settings = {};
//   if (user) {
//     const project = getProject(user.id);
//     if (project) settings = getSettings(project.id);
//   }
//   return settings;
// }
