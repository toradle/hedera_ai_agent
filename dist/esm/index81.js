function convertStringToTimestamp(input) {
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  const timestamp = date.getTime();
  return parseFloat((timestamp / 1e3).toFixed(6));
}
export {
  convertStringToTimestamp
};
//# sourceMappingURL=index81.js.map
