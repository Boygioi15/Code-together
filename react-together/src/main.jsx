import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoomCreate from './RoomCreate'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoomCreate />
  </StrictMode>,
)
