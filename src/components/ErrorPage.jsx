import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = "Hey I know it's frustrating, but it's not your fault and we just need to look into this what's happening. Please have some relax, take a nap, and come back later.";

  if (isRouteErrorResponse(error)) {
    title   = `${error.status} — ${error.statusText}`;
    message = error.data || 'No further details available.';
  } else if (error instanceof Error) {


    title   = 'Application Error';
    message = error.message;
  }

  return (
    <div className="error-page">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/">Return to home</Link>
    </div>
  );
}