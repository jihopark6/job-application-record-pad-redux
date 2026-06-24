
import { getApplication } from '../data/application';
import { getMemos } from '../data/memo';

export async function applicationDetailLoader({ params }) {
  const application = getApplication(params.id);


  return {
    application,
    memos: getMemos(params.id),
  };
}
