'use client'

import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>This is not the page you were looking for...</h2>
      <Link href='/'>
        Home
      </Link>
    </div>
  );
}
