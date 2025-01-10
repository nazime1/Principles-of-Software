import './App.css'
import React from 'react';
import { Helmet } from 'react-helmet'
import { createHashRouter, RouterProvider, LoaderFunction, ActionFunction } from "react-router-dom";

interface RouteCommon {
  loader ?: LoaderFunction;
  action ?: ActionFunction;
  ErrorBoundary ?: React.ComponentType<any>;
}

interface Routes extends RouteCommon {
  path:string;
  Element:React.ComponentType<any>;
}

interface Pages {
  [key: string]: {
    default: React.ComponentType<any>;
  } & RouteCommon;
}

interface Textbook {
  [key: string]: {
    default: React.ComponentType<any>;
  } & RouteCommon;
}

const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

const textbook : Textbook = import.meta.glob("./pages/textbook/**/*.tsx", { eager: true});

const routes: Routes[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "landing" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

for (const path of Object.keys(textbook)) {
    const fileName = path.match(/\.\/pages\/(.*)\.tsx/)?.[1];
    if (!fileName) {
      continue;
    }

    const normalizedPathName = fileName.includes("$")
     ? fileName.replace("$", ":")
     : fileName.replace(/\/index/, "");

    routes.push({
      path: fileName === "landing" ? "/" : `/textbook/${normalizedPathName.toLowerCase()}`,
      Element: pages[path].default,
      loader: pages[path]?.loader,
      action: pages[path]?.action,
      ErrorBoundary: pages[path]?.ErrorBoundary,
    });  
}

const router = createHashRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App = () => {
  return (
  <>
    <RouterProvider router={router} />
    <Helmet>
    <link rel="icon" type="image/svg+xml" href="/psoft_turtle_still.png" />
        <title>PSoft Textbook + Tools</title>
    </Helmet>
  </>
    );
};

export default App;
