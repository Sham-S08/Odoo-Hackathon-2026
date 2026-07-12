"use client";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25">
      <div className="w-[380px] max-w-[90vw] rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-brand-800">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[var(--text-muted)] hover:text-brand-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
