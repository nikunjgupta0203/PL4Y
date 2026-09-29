import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1b221b] border border-[#3b473b] shadow-2xl rounded-xl p-3.5 flex items-start gap-3 transition-all transform translate-y-0"
        >
          <div className="mt-0.5 flex-shrink-0">
            {toast.type === 'warn' ? (
              <AlertCircle className="w-5 h-5 text-[#ff5247]" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#79c0ff]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#c4ff1a]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#f5f8f4] font-heading tracking-tight">
              {toast.title}
            </h4>
            <p className="text-xs text-[#aeb4ac] mt-0.5 leading-relaxed">
              {toast.description}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#7f877d] hover:text-[#f5f8f4] p-1 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
