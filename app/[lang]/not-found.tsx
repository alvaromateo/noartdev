'use client'

export default function NotFound() {
  // TODO: change reload for a link to the home page
  return (
    <div>
      <h2>This is not the page you were looking for...</h2>
      <button onClick={() => location.reload()}>Home</button>
    </div>
  );
}
