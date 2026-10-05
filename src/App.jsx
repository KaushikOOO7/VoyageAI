import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Home from './pages/Home';
import PlanTrip from './pages/PlanTrip';
import TripResult from './pages/TripResult';
import ApiKeyModal from './components/ApiKeyModal';

export default function App() {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home onOpenApiKeyModal={() => setApiKeyModalOpen(true)} />}
          />
          <Route
            path="/plan"
            element={<PlanTrip onOpenApiKeyModal={() => setApiKeyModalOpen(true)} />}
          />
          <Route
            path="/trip"
            element={<TripResult onOpenApiKeyModal={() => setApiKeyModalOpen(true)} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global API Key Modal */}
        <ApiKeyModal
          isOpen={apiKeyModalOpen}
          onClose={() => setApiKeyModalOpen(false)}
        />
      </BrowserRouter>
    </TripProvider>
  );
}
