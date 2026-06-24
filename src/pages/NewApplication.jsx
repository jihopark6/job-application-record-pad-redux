import { useEffect, useRef, useState } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { fetchCompanySuggestions } from '../data/api';

export default function NewApplication() {
  const errors     = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [companyQuery, setCompanyQuery]             = useState('');

  const dateRef    = useRef(null);
  const companyRef = useRef(null);

  // Auto-focus date field on mount
  useEffect(() => {
    dateRef.current?.focus();
  }, []);

  // Debounced company autocomplete
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const suggestions = await fetchCompanySuggestions(companyQuery);
        setCompanySuggestions(suggestions);
      } catch {
        setCompanySuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [companyQuery]);

  function handleSuggestionClick(name) {
    companyRef.current.value = name;
    setCompanyQuery(name);
    setCompanySuggestions([]);
  }

  return (
    <div className="form-page">
      <h2>New Application</h2>

      <Form method="post">
        <div className="field">
          <label htmlFor="date">Application Date</label>
          <input
            ref={dateRef}
            id="date"
            name="date"
            type="date"
            required
          />
          {errors?.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="field autocomplete-field">
          <label htmlFor="company">Company Name</label>
          <input
            ref={companyRef}
            id="company"
            name="company"
            type="text"
            required
            value={companyQuery}
            onChange={(e) => setCompanyQuery(e.target.value)}
          />
          {errors?.company && <span className="error">{errors.company}</span>}
          {companySuggestions.length > 0 && (
            <ul className="suggestions">
              {companySuggestions.map((s) => (
                <li key={s.id} onClick={() => handleSuggestionClick(s.name)}>
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="field">
          <label htmlFor="job_title">Job Title</label>
          <input id="job_title" name="job_title" type="text" required />
          {errors?.job_title && <span className="error">{errors.job_title}</span>}
        </div>

        <div className="field">
          <label htmlFor="job_posting">Job Posting URL</label>
          <input id="job_posting" name="job_posting" type="text" />
        </div>

        <div className="field">
          <label htmlFor="contact_info">Contact Information</label>
          <input id="contact_info" name="contact_info" type="tel" />
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue="applied">
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save'}
          </button> &nbsp;
          <Link className="button" to="/">
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
