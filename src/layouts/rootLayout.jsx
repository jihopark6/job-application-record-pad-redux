import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector }   from 'react-redux';
import { setSearchQuery }             from '../store/searchSlice';
import NavigationLoadingBar           from '../components/NavigationLoadingBar';

export default function RootLayout() {
  const dispatch   = useDispatch();
  const query      = useSelector((state) => state.search.query);
  const navigate   = useNavigate();

  console.log('RootLayout rendered with query:', query);

  function handleSearchChange(e) {
    dispatch(setSearchQuery(e.target.value));
  }


  
  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <NavigationLoadingBar />

      <header>
        <h1>
          <Link to="/">Job Application Record Pad</Link>
        </h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new">New</Link>
          <Link to="/memo">Memo</Link>
        </nav>
      </header>

      <div className="layout">
        <aside>
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={handleSearchChange}
              placeholder="Company or job title"
            />
          </form>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>

      <footer>
        <p>Job Application Record Pad</p>
      </footer>
    </>
  );
}
