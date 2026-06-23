import { getApplications } from '../data/applications';

export async function rootLoader() {
    
  const applications = getApplications();
  return { applications };
}
