import React, { useEffect, useState } from 'react';

export default function Application({ onItemClick, searchQuery }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('applicationData');
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      // Expecting applicationData to be an array of items
      if (Array.isArray(parsed)) {
        setData(parsed);
      } else if (parsed && typeof parsed === 'object') {
        // Single object stored — normalize to array
        setData([parsed]);
      }
    } catch (error) {
      console.warn('Failed to parse localStorage applicationData:', error);
    }
  }, []);

  const filteredData = data.filter((item) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      item.company.toLowerCase().includes(lowerSearchQuery) ||
      item.job_title.toLowerCase().includes(lowerSearchQuery)
    );
  });

  return (
    <>
      {filteredData.map((item, idx) => (
        <article key={idx} onClick={() => onItemClick?.(item)}>
          <div className="company-name">{item.company}</div>
          <div className="job-title">{item.job_title}</div>
          <div className="application-date">{item.date}</div>
          <div className="application-status status-{item.status}">{item.status}</div>
        </article>
      ))}
    </>
  );
}

const styles = {
  card: {
    maxWidth: '320px',
    margin: '16px',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '1.4rem',
    color: '#222',
  },
  description: {
    margin: 0,
    lineHeight: 1.5,
    color: '#555',
  },
};
