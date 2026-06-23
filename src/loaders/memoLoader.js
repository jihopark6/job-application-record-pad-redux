import { getMemos } from '../data/memos';

export async function memoLoader() {
  const memos = getMemos();
  return { memos };
}