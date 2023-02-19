import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import convexConfig from "../convex.json";

const address = import.meta.env.VITE_CONVEX_URL;

const convex = new ConvexReactClient(address);
const authInfo = convexConfig.authInfo[0];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConvexProviderWithAuth0 client={convex} authInfo={authInfo} loggedOut={<App />}>
      <App />
    </ConvexProviderWithAuth0>
  </React.StrictMode>,
)
