import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import  Dashboard  from './dashboard/Dashboard';
import  Layout  from './dashboard/Layout';

// Import your pages


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to default plant */}
        <Route path="/" element={<Navigate to="/plant/plant1" replace />} />
        
        {/* Main routes with layout */}
        <Route path="/plant/:plantName" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />


        {/* Catch all route - redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;