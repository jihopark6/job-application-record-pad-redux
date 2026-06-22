import { useState, useEffect } from 'react'
import Application from './Application';
import AppForm from './AppForm';
import MemoForm from './MemoForm';
import MemoList from './MemoList';
import { useCurrentPath } from './useCurrentPath';
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [editingData, setEditingData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState(useCurrentPath());

  const navigatePage = (url) => {
    if (url !== currentPath) {
      window.history.pushState(null, '', url);
      setCurrentPath(url);
    }
  };

  const handleClickItem = (item) => {
    console.log('Clicked item:', item);
    setEditingData(item);
    navigatePage('/edit');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  console.log('Current URL path:', currentPath); // Debugging log
  
  
  return (
    <>
    <header>
        <h1>Job Application History</h1>
        <nav>
            <ul>
                <li>
                  <a href="/" onClick={(event) => { event.preventDefault(); navigatePage('/'); }}>Home</a>
                </li>
                <li>
                  <a href="/new" onClick={(event) => { event.preventDefault(); navigatePage('/new'); }}>New</a>
                </li>
                <li>
                  <a href="/memo" onClick={(event) => { event.preventDefault(); navigatePage('/memo'); }}>Memo</a>
                </li>
            </ul>
        </nav>
    </header>
     <main>
        {(currentPath === '/') && (
        <section id="home">
            <div id="article-list">
              <Application searchQuery={searchQuery} onItemClick={handleClickItem} />
            </div>
        </section>
        )}
        
        {(currentPath === '/new' || currentPath === '/edit') && (
        <section id="new">
            
            <AppForm 
            onCancel={() => { console.log("Cancel clicked"); navigatePage('/');}} 
            existingData={currentPath === '/edit' ? editingData : null}
             />

            {(currentPath === '/edit') && (
            <div id="application_memo_list">
                <MemoList filterApplicationId={editingData.id} />
            </div>
            )}
        </section>
        )}

        {(currentPath === '/memo') && (
        <section id="memo">
            <div id="memo-list">
                <article>
                    <MemoForm />
                </article>

                <MemoList />
            </div>

        </section>
        )}
    </main>

    <aside>
        <input
          type="text"
          id="search_input"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by company or job title..."
        />
    </aside>
    <footer>
        <div className="container">
            <p>&copy; 2026 Job Application History. All rights reserved.</p>
        </div>
    </footer>
     
    </>
  )
}

export default App
