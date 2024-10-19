# noart.dev

This is the code for my own website.

It is a [Next.js](https://nextjs.org/) project bootstrapped with 
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 
It uses Typescript and Tailwind CSS.

## Getting Started

To run the development server only:

```bash
npm run dev
```

This doesn't include any functionality outside of the website like Search, which needs a Solr container to be 
running in order to receive the search requests.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Full development environment

To run the full development environment:

```bash
make build-development
make start-development
```

And to stop it:

```bash
make stop-development
```