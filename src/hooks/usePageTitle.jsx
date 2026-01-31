import { useMatches } from 'react-router-dom';

export function usePageTitle() {
  const matches = useMatches();

  // Find the last match that has a title in its handle
  // We use .toReversed() to find the deepest child's title first
  const currentMatch = [...matches]
    .reverse()
    .find((match) => match.handle?.title);

  return currentMatch?.handle?.title ?? 'Provider Portal';
}