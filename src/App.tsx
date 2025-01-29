import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Auth from '@/Auth'

function App() {
  return (
    <>
      <h1>Hi There! Budget APp</h1>

      <Auth />
    </>
  )
}

export default App
