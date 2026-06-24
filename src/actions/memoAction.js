import { redirect } from 'react-router-dom';
import { createMemo } from '../data/memo';

export async function memoAction({ request }) {
  const formData = await request.formData();

  const applicationId = formData.get('applicationId');
  const content = formData.get('content')?.trim() ?? '';

  const errors = {};

  if (!applicationId) errors.applicationId = 'Please select a job application.';
  if (!content)       errors.content       = 'Memo content cannot be empty.';


  if (Object.keys(errors).length > 0) return errors;

  createMemo({ applicationId: Number(applicationId), content });

  return redirect('/memo');
}