/**
 * (3) manage state default values in a better way
 * to prevent having both undefined or null as default value
 */
// let state;
// const user = getUser();
// if (user) {
//   const project = getProject(user.id);
//   state = {
//     user,
//     project,
//   };
// } else {
//   state = {
//     user: null,
//     project: null,
//   };
// }
// ctx.body = state;

// my implementation
// let state = {};
// const user = getUser();
// if (user) {
//   const project = getProject(user.id);
//   state = {
//     user,
//     project,
//   };
// }
// ctx.body = state;
