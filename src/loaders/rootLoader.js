import { getApplications } from '../data/application';

export async function rootLoader() {
    
  const applications = getApplications();
  return { applications };
}
