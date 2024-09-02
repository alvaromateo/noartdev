'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  let errorDescription : React.ReactNode;
  if (!!error.digest) {
    errorDescription = (
      <p>{ error.digest }</p>
    );
  }
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        { !!error.digest && errorDescription }
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}