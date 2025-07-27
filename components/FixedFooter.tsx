import React from 'react';

interface FixedFooterProps {
  name: string;
}

const FixedFooter: React.FC<FixedFooterProps> = ({ name }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div 
      id="fixed-site-info"
      className="fixed bottom-0 left-0 right-0 bg-slate-800 dark:bg-slate-900 text-slate-300 dark:text-slate-400 py-2 px-4 z-40 border-t border-slate-700 dark:border-slate-600"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40
      }}
    >
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-sm font-medium">
          © {currentYear} {name} | Designed by Vumesh T
        </p>
      </div>
    </div>
  );
};

export default FixedFooter;