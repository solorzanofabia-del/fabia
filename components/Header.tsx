import React from 'react';
import { Map, LayoutDashboard } from 'lucide-react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate(Screen.HOME)}
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Map className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-600">
            UrbanFlow AI
          </span>
        </div>

        <nav>
          <button 
            onClick={() => onNavigate(Screen.DASHBOARD)}
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              currentScreen === Screen.DASHBOARD || currentScreen === Screen.RESULTS 
                ? 'text-blue-600' 
                : 'text-slate-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
};