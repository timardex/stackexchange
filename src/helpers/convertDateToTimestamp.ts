export default function convertDateToTimestamp (value: Date | null) {
  const stringify = JSON.stringify(value);
  const date = stringify.slice(0, 11);
  return value && Math.floor(new Date(date).getTime() / 1000);
};