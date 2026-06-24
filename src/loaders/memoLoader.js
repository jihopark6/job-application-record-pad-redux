import { getMemos } from '../data/memo';

export async function memoLoader() {
  const memos = getMemos();
  return { memos };
}