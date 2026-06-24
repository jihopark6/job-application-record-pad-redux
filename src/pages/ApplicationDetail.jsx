import { Suspense, useRef, useState, useEffect } from 'react';
import { Form, Link, useLoaderData, useActionData, useNavigation, Await } from 'react-router-dom';
import { fetchCompanySuggestions } from '../data/api';

export default function ApplicationDetail() {
  const { application, memos } = useLoaderData();
  const errors                 = useActionData();
  const navigation             = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [companyQuery, setCompanyQuery]             = useState(application.company);

  const companyRef = useRef(null);

  // Sync companyQuery when application changes (user navigates between detail pages)
  useEffect(() => {
    setCompanyQuery(application.company);
  }, [application.id]);

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
      <h2>Edit Application</h2>

      {/* UPDATE FORM */}
      <Form method="post">
        <input type="hidden" name="intent" value="update" />

        <div className="field">
          <label htmlFor="date">Application Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={application.date}
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
          <input
            id="job_title"
            name="job_title"
            type="text"
            required
            defaultValue={application.job_title}
          />
          {errors?.job_title && <span className="error">{errors.job_title}</span>}
        </div>

        <div className="field">
          <label htmlFor="job_posting">Job Posting URL</label>
          <input
            id="job_posting"
            name="job_posting"
            type="text"
            defaultValue={application.job_posting}
          />
        </div>

        <div className="field">
          <label htmlFor="contact_info">Contact Information</label>
          <input
            id="contact_info"
            name="contact_info"
            type="tel"
            defaultValue={application.contact_info}
          />
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            defaultValue={application.status}
          >
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </button>
          <Link to="/">Cancel</Link>
        </div>
      </Form>

      {/* DELETE FORM — separate form, same route, different intent */}
      <Form
        method="post"
        onSubmit={(e) => {
          if (!window.confirm('Delete this application?')) e.preventDefault();
        }}
      >
        <input type="hidden" name="intent" value="delete" />
        <button type="submit" className="button-danger" disabled={isSubmitting}>
          Delete Application
        </button>
      </Form>

      {/* DEFERRED MEMOS — streams in via Await */}
      <section className="memos-section">
        <h3>Memos</h3>
        <Suspense fallback={<p>Loading memos…</p>}>
          <Await
            resolve={memos}
            errorElement={<p>Failed to load memos.</p>}
          >
            {(resolvedMemos) =>
              resolvedMemos.length === 0 ? (
                <p>No memos for this application.</p>
              ) : (
                <ul className="memo-list">
                  {resolvedMemos.map((memo) => (
                    <li key={memo.id}>
                      <p>{memo.content}</p>
                      <time>{new Date(memo.createdAt).toLocaleString()}</time>
                    </li>
                  ))}
                </ul>
              )
            }
          </Await>
        </Suspense>
      </section>
    </div>
  );
}
