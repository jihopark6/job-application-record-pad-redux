import { defer } from 'react-router-dom'; // for the detail 
import { getApplication } from '../data/application';
import { getMemos } from '../data/memo';

export async function applicationDetailLoader({ params }) {
  const application = getApplication(params.id);


  return defer({
    application,
    memos: Promise.resolve(getMemos(params.id)),
  });
}
