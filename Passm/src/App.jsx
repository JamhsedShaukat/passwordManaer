import react from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Manager from './components/Manager'

function App() {

  return (
    <>

    <NavBar/>
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] my-4">
        {" "}
      </div>
    <Manager/>

    </>

  )
}

export default App
