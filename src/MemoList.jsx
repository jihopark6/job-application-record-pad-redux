import React, {useMemo} from 'react';

const MemoList = (filterApplicationId) => {
  const memoData = useMemo(() => {
    const stored = localStorage.getItem('memoData');
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      console.log("filterApplicationId:",filterApplicationId);
      if(filterApplicationId.filterApplicationId === undefined) return Array.isArray(parsed) ? parsed : [];
      const filtered = parsed.filter(item => item.applicationId === filterApplicationId.filterApplicationId);
      return Array.isArray(filtered) ? filtered : [];
    } catch {
      return [];
    }
  }, [filterApplicationId]);

  if (memoData.length === 0) {
    return <div>No memos found.</div>;
  }

  return (
    <div className="memo-list">
      {memoData.map((item, index) => (
        
          <div key={index}>
            {item.content}
          </div>
        
      ))}
    </div>
  );
};

export default MemoList;
