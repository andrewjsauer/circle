export const convertTimestamp = (timestamp) => {
  const date = timestamp.toDate();

  // Use toLocaleString() to get a human-readable date and time format
  const humanReadableDateTime = date.toLocaleString();

  return humanReadableDateTime;
};
