import React from 'react';
import { ArrowRight, Building2, Trees, Activity } from 'lucide-react';
import { Button } from '../components/Button';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            AI-Powered Urban Analysis
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            Transforming Cities with <br />
            <span className="text-blue-600">Intelligent Insights</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Analyze urban sectors instantly. Upload a map or image, describe the context, and receive professional AI-generated recommendations for sustainable development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={onStart} size="lg" className="text-lg px-8 py-4">
              Empezar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Building2}
              title="Detect Issues"
              description="Identify infrastructure bottlenecks, congestion, and maintenance issues instantly."
              color="text-red-600"
              bgColor="bg-red-50"
            />
            <FeatureCard 
              icon={Activity}
              title="Smart Solutions"
              description="Get actionable recommendations based on modern urban planning principles."
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <FeatureCard 
              icon={Trees}
              title="Sustainable Future"
              description="Visualize conceptual proposals that prioritize green spaces and community well-being."
              color="text-emerald-600"
              bgColor="bg-emerald-50"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, bgColor }: any) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all">
    <div className={`p-4 rounded-xl ${bgColor} ${color} mb-4`}>
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);