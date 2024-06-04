"use client"; // Error components must be Client Components

import { logClient } from "@repo/logger";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps): JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    logClient(error);
  }, [error]);

  return (
    <div className="h-screen">
      <section className="h-full flex">
        <div className="py-8 px-4 mx-auto max-w-screen-xl content-center lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
              Oh no!
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
              Something went wrong.
            </p>
            <p className="mb-4 text-lg font-light">
              Sorry, we can&apos;t load the page as the moment. You&apos;ll find
              lots to explore on the home page.
            </p>
            <a
              className="inline-flex hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center my-4 transition-all duration-200 ease-in-out"
              href="/"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
