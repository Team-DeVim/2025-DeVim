import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// main.jsx
import './style/base/reset.css'
import './style/base/global.css'

// 두 테마 "모두" 로드
import './style/theme/game.tokens.css'
import './style/theme/code.tokens.css'

createRoot(document.getElementById('root')).render(
  <App />
)
