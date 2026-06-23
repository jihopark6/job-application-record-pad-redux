import { defer } from 'react-router-dom'; // for the detail 
import { getApplication } from '../data/applications';
import { getMemos } from '../data/memos';

export async function applicationDetailLoader({ params }) {
  const application = getApplication(params.id);


  return defer({
    application,
    memos: Promise.resolve(getMemos(params.id)),
  });
}
