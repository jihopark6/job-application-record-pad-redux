import { Form, useLoaderData, useRouteLoaderData, useActionData, useNavigation } from 'react-router-dom';

export default function MemoPage() {
  const { memos }        = useLoaderData();
  const { applications } = useRouteLoaderData('root');
  const errors           = useActionData();
  const navigation       = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="memo-page">

      {/* MEMO CREATION FORM */}
      <section className="memo-form-section">
        <h2>Add Memo</h2>
        <Form method="post">

          <div className="field">
            <label htmlFor="applicationId">Job Application</label>
            <select id="applicationId" name="applicationId" required>
              <option value="">-- Select an application --</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.company} — {app.job_title}
                </option>
              ))}
            </select>
            {errors?.applicationId && (
              <span className="error">{errors.applicationId}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="content">Memo</label>
            <textarea
              id="content"
              name="content"
              rows={5}
              required
            />
            {errors?.content && (
              <span className="error">{errors.content}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Add Memo'}
            </button>
          </div>

        </Form>
      </section>

      {/* MEMO LIST */}
      <section className="memo-list-section">
        <h2>All Memos</h2>
        {memos.length === 0 ? (
          <p>No memos yet.</p>
        ) : (
          <ul className="memo-list">
            {memos.map((memo) => {
              const app = applications.find(
                (a) => a.id === Number(memo.applicationId)
              );
              return (
                <li key={memo.id} className="memo-item">
                  <p className="memo-content">{memo.content}</p>
                  <footer className="memo-meta">
                    <span>{app ? `${app.company} — ${app.job_title}` : 'Unknown application'}</span>
                    <time>{new Date(memo.createdAt).toLocaleString()}</time>
                  </footer>
                </li>
              );
            })}
          </ul>
        )}
      </section>

    </div>
  );
}
