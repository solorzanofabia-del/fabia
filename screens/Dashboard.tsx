import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { AnalysisState } from '../types';
import { analyzeUrbanSector } from '../services/geminiService';

interface DashboardProps {
  state: AnalysisState;
  setState: React.Dispatch<React.SetStateAction<AnalysisState>>;
  onAnalysisComplete: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ state, setState, onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setState(prev => ({
        ...prev,
        image: file,
        imagePreview: e.target?.result as string,
        error: null
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setState(prev => ({ ...prev, image: null, imagePreview: null }));
  };

  const handleAnalyze = async () => {
    if (!state.image) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await analyzeUrbanSector(state.image, state.contextDescription);
      setState(prev => ({ ...prev, result, isLoading: false }));
      onAnalysisComplete();
    } catch (error) {
      console.error(error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to analyze the sector. Please try again later or check your API key." 
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">New Analysis</h2>
        <p className="text-slate-600">Upload an aerial view or street photo and describe the context.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column: Image Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Urban Sector Image</label>
          
          <div 
            className={`
              relative flex flex-col items-center justify-center w-full h-80 rounded-xl border-2 border-dashed transition-all overflow-hidden
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'}
              ${!state.imagePreview ? 'hover:bg-slate-100 hover:border-slate-400' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {state.imagePreview ? (
              <>
                <img 
                  src={state.imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-slate-600 hover:text-red-500 shadow-sm backdrop-blur-sm"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG up to 10MB
                </p>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileInput}
                  accept="image/*"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Context & Actions */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Urban Context Description
            </label>
            <div className="relative">
              <textarea
                value={state.contextDescription}
                onChange={(e) => setState(prev => ({ ...prev, contextDescription: e.target.value }))}
                placeholder="E.g., High density residential area with informal commerce, lack of green spaces, and heavy traffic congestion..."
                className="w-full h-48 rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-700 p-4 resize-none border"
              />
              <FileText className="absolute top-4 right-4 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
            <p className="text-xs text-slate-500">
              Providing details about the social and economic dynamics helps the AI generate more accurate recommendations.
            </p>
          </div>

          {state.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{state.error}</p>
            </div>
          )}

          <div className="pt-2">
            <Button 
              onClick={handleAnalyze}
              disabled={!state.image || !state.contextDescription.trim()}
              isLoading={state.isLoading}
              fullWidth
              size="lg"
            >
              {state.isLoading ? 'Analyzing Sector...' : 'Analizar Sector'}
            </Button>
          </div>
        </div>
      </div>

      {/* Helper Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-slate-200">
          <ImageIcon className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Visual Analysis</h4>
            <p className="text-xs text-slate-500 mt-1">The AI identifies physical infrastructure, vegetation density, and land use patterns.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-slate-200">
          <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contextual Understanding</h4>
            <p className="text-xs text-slate-500 mt-1">Your description adds layer of socio-economic context that images can't capture.</p>
          </div>
        </div>
      </div>
    </div>
  );
};