import React from 'react';

export const errorHandler = (error: Error, info: {componentStack: string}) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log(error);
  console.log(info);
};

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback:React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>Something went wrong:</p>

      <pre>{error.message}</pre>

      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
