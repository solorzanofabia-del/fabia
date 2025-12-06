import React, { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './screens/Home';
import { Dashboard } from './screens/Dashboard';
import { Results } from './screens/Results';
import { AnalysisState, Screen } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    image: null,
    imagePreview: null,
    contextDescription: '',
    result: null,
    isLoading: false,
    error: null,
  });

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <Home onStart={() => setCurrentScreen(Screen.DASHBOARD)} />;
      case Screen.DASHBOARD:
        return (
          <Dashboard 
            state={analysisState} 
            setState={setAnalysisState}
            onAnalysisComplete={() => setCurrentScreen(Screen.RESULTS)}
          />
        );
      case Screen.RESULTS:
        return <Results state={analysisState} />;
      default:
        return <Home onStart={() => setCurrentScreen(Screen.DASHBOARD)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Header 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
      />
      
      <main className="fade-in-enter">
        {renderScreen()}
      </main>

      <footer className="py-8 text-center text-sm text-slate-400 border-t border-slate-200 mt-auto bg-white">
        <p>&copy; {new Date().getFullYear()} UrbanFlow AI. Prototype.</p>
      </footer>
    </div>
  );
};

export default App;