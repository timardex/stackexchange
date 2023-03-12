export default function convertTimestampToDate(value: number) {
  const date = new Date(value * 1000).toUTCString();
  return date.slice(0, 16)
};