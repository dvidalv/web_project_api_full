// import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  // const error = useRouteError();

  return (
    <div id="errorPage" className="error_page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        La pagina que buscas no existe o no esta disponible en este momento.
      </p>
    </div>
  );
}
