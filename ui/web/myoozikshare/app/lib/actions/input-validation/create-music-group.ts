//validate group name
export const ValidateGroupName = (name: string): string => {
  if (name.length == 0) {
    return 'Group name field can not be empty!';
  }
  // if (!name.match(/^[\w\d\-']+$/i)) {
  //   return 'Group name must contain only word and number characters.';
  // }
  if (name.length < 2) {
    return "Group name can't be less than two character";
  }
  return '';
};

// // validate group description
// export const ValidateDescription = (description: string): string => {
//   if (description.length > 0) {
//     if (!description.match(/^[\w\d\-']+$/i)) {
//       return 'Description must contain only word and number characters.';
//     }
//     if (description.length < 2) {
//       return "Description can't be less than two character";
//     }
//     return '';
//   }
//   return '';
// };