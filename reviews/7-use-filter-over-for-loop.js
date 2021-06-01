/**
 * (7) use filter instead of for loop with if statements
 */
// async function getFilledIndexes() {
//   try {
//     const filledIndexes = [];
//     const indexes = await getIndexes();
//     const status = await getStatus();
//     const usersId = await getUsersId();

//     for (let index of indexes) {
//       if (index.status === status.filled && usersId.includes(index.userId)) {
//         filledIndexes.push(index);
//       }
//     }
//     return filledIndexes;
//   } catch (_) {
//     throw new Error('Unable to get indexes');
//   }
// }

// my implementation
// async function getFilledIndexes() {
//   try {
//     const indexes = await getIndexes();
//     const status = await getStatus();
//     const usersId = await getUsersId();
//     return indexes.filter(
//       (index) => index.status === status.filled && usersId.includes(index.userId),
//     );
//   } catch (_) {
//     throw new Error('Unable to get indexes');
//   }
// }
