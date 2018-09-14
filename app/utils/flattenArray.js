
export default function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ?
    flattenArray(flattened) : flattened;
}
