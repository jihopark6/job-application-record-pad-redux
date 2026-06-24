import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ApplicationList() {
  const { applications }  = useRouteLoaderData('root');
  const query             = useSelector((state) => state.search.query);
  const navigate          = useNavigate();

  const filtered = applications.filter((app) => {
    const q = query.toLowerCase();
    return (
      app.company.toLowerCase().includes(q) ||
      app.job_title.toLowerCase().includes(q)
    );
  });

  function handleCardClick(app) {
    navigate(`/applications/${app.id}`);
  }



  if (filtered.length === 0) {
    return (
      <p className="empty-state">
        {query ? 'No applications match your search.' : 'No applications yet. Create one!'}
      </p>
    );
  }



  return (
    <section className="application-list">
      {filtered.map((app) => (
        <article
          key={app.id}
          className="application-card"
          onClick={() => handleCardClick(app)}
        >

            
          <h2>{app.company}</h2>
          <p>{app.job_title}</p>
          <p>{app.date}</p>
          <span className={`status status-${app.status}`}>{app.status}</span>
        </article>
      ))}
    </section>
  );
}
