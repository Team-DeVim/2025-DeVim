import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './style/base/variables.css';
import './style/base/reset.css';
import './style/base/global.css';

createRoot(document.getElementById('root')).render(
  <App />
)
