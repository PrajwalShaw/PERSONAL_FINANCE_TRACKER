import './App.css'
import {BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordProvider } from './context/financial-record-context';
import { SignedIn, UserButton } from '@clerk/clerk-react';
function App() {
 

  return (
    <Router>
      <div className="app-container">
        <div className='navbar'>
          <h2>MoneyMap</h2>
           <Link to="/">Dashboard</Link>
           <SignedIn>
             <UserButton/>
           </SignedIn>
        </div>
         <Routes>
            <Route path="/" element={<FinancialRecordProvider><Dashboard/></FinancialRecordProvider>}/>
             <Route path="/auth" element={<Auth/>}/>
            <Route/>
         </Routes>
      </div>
    </Router>
  )
}

export default App
