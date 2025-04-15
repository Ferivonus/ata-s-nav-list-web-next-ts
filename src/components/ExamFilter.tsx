import React from 'react';

interface ExamFilterProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

export default function ExamFilter({ value, onChange, onReset }: ExamFilterProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Enter course code (e.g. CS101)"
        className="px-4 py-2 border border-gray-300 rounded-md text-base w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {value && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          ↩ Reset
        </button>
      )}
    </div>
  );
}
