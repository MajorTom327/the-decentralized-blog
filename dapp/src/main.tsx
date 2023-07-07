import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import HeliaProvider from "./contexts/HeliaProvider.tsx";
import ArticleProvider from "./contexts/ArticleProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <HeliaProvider> */}
    <ArticleProvider>
      <App />
    </ArticleProvider>
    {/* </HeliaProvider> */}
  </React.StrictMode>
);
