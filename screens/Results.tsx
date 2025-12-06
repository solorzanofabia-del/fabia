import React, { useRef } from 'react';
import { AlertTriangle, Lightbulb, PenTool, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { AnalysisState } from '../types';

interface ResultsProps {
  state: AnalysisState;
}

export const Results: React.FC<ResultsProps> = ({ state }) => {
  const { result, imagePreview } = state;
  const contentRef = useRef<HTMLDivElement>(null);

  if (!result) return null;

  const generateReport = () => {
    // Simple text report generation simulation
    const reportText = `
URBANFLOW AI ANALYSIS REPORT
----------------------------
Date: ${new Date().toLocaleDateString()}

1. DETECTED PROBLEMS
${result.problems.map(p => `- ${p}`).join('\n')}

2. URBAN RECOMMENDATIONS
${result.recommendations.map(r => `- ${r}`).join('\n')}

3. CONCEPTUAL PROPOSAL
${result.proposal}
    `;

    // Create a blob and download
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'urban-analysis-report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in" ref={contentRef}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Analysis Results</h2>
          <p className="text-slate-600">AI-generated insights based on your inputs.</p>
        </div>
        <Button onClick={generateReport} variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Generar Informe
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Input Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Analyzed Sector</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 mb-4">
              {imagePreview && (
                <img src={imagePreview} alt="Analyzed" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Context Description</h4>
              <p className="text-sm text-slate-700 italic border-l-2 border-slate-200 pl-3">
                "{state.contextDescription}"
              </p>
            </div>
          </div>
        </div>

        {/* Results Cards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Problems */}
          <Card 
            title="Problemas Detectados" 
            icon={AlertTriangle} 
            iconColorClass="bg-red-500 text-red-600"
          >
            <ul className="space-y-3">
              {result.problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Recommendations */}
          <Card 
            title="Recomendaciones Urbanas" 
            icon={CheckCircle2} 
            iconColorClass="bg-emerald-500 text-emerald-600"
          >
            <ul className="space-y-3">
              {result.recommendations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                   <div className="flex-shrink-0 mt-0.5">
                     <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                       <span className="text-xs font-bold text-emerald-600">{idx + 1}</span>
                     </div>
                   </div>
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

           {/* Conceptual Proposal */}
           <Card 
            title="Propuesta Conceptual" 
            icon={Lightbulb} 
            iconColorClass="bg-blue-500 text-blue-600"
            className="bg-gradient-to-br from-white to-blue-50/30"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-100 rounded-full">
                  <PenTool className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed text-lg">
                  {result.proposal}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">Sustainability</span>
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-md">Mobility</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md">Community</span>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};