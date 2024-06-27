//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, LoaderFunction, ActionFunction } from "react-router-dom";

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
console.log(textbook);

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

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
