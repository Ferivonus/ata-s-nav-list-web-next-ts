import React from 'react';
import { parseExcelFile } from '@/utils/parseExcel';
import { ExamInfo } from '@/../types/exam';

interface FileUploadProps {
  onExamsParsed: (exams: ExamInfo[]) => void;
  onError: (msg: string) => void;
}

export default function FileUpload({ onExamsParsed, onError }: FileUploadProps) {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const exams = await parseExcelFile(file);
      onExamsParsed(exams);
      onError('');
    } catch (err) {
      onError(typeof err === 'string' ? err : 'Failed to parse Excel file.');
    }
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="mb-4 block mx-auto"
      />
    </div>
  );
}
