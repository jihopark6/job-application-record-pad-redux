import { redirect } from 'react-router-dom';
import { createApplication } from '../data/applications';

export async function newApplicationAction({ request }) {
  const formData = await request.formData();

/*
Data structure for an application:
{
    id: number,              // auto-increment
    company: string,
    job_title: string,
    date: string,            // "YYYY-MM-DD"
    status: string,          // "applied" | "interviewing" | "offer" | "rejected"
    job_posting: string,     // URL, can be empty string
    contact_info: string,    // can be empty string
}


*/

  const fields = {
    company:      formData.get('company')?.trim() ?? '',
    job_title:    formData.get('job_title')?.trim() ?? '',
    date:         formData.get('date') ?? '',
    status:       formData.get('status') ?? 'applied',
    job_posting:  formData.get('job_posting')?.trim() ?? '',
    contact_info: formData.get('contact_info')?.trim() ?? '',
  };

  const errors = validateApplicationFields(fields);
  if (errors) return errors;

  createApplication(fields);



  return redirect('/');
}

function validateApplicationFields(fields) {
  const errors = {};

  if (!fields.company)   errors.company   = 'Company name is required.';
  if (!fields.job_title) errors.job_title = 'Job title is required.';
  if (!fields.date)      errors.date      = 'Application date is required.';

  if (Object.keys(errors).length > 0) return errors;
  return null;
}