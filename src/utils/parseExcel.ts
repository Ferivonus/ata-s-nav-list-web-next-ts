import * as XLSX from 'xlsx';
import { ExamInfo } from '@/../types/exam';

export function parseExcelFile(file: File): Promise<ExamInfo[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data || typeof data === 'string') {
        return reject('Invalid file content');
      }

      const workbook = XLSX.read(data, { type: 'array' });
      const allExams: ExamInfo[] = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

        const dateRow = sheetJson[1];
        if (!dateRow) return;

        const dateColumns: [number, string, string][] = [];

        dateRow.forEach((cell, index) => {
          if (cell?.includes('/2025')) {
            const [datePart, dayPartRaw] = cell.split(' ');
            const dayPart = dayPartRaw?.split('/')?.[0] || '';
            dateColumns.push([index, datePart, dayPart]);
          }
        });

        let currentTime = '';

        for (let i = 3; i < sheetJson.length; i++) {
          const row = sheetJson[i];
          if (!row || row.length === 0) continue;

          const timeCandidate = row[0];
          if (typeof timeCandidate === 'string' && timeCandidate.trim() !== '') {
            currentTime = timeCandidate;
          }

          for (const [colIndex, date, day] of dateColumns) {
            const course_code = row[colIndex]?.trim();
            if (course_code && !course_code.includes('Course code')) {
              allExams.push({
                date,
                day,
                time: currentTime,
                course_code,
                academic_staff: row[colIndex + 1] || '',
                group: row[colIndex + 2] || '',
                students: row[colIndex + 3] || '',
                exam_type: row[colIndex + 4] || '',
                classroom: row[colIndex + 5] || '',
              });
            }
          }
        }
      });

      resolve(allExams);
    };

    reader.onerror = () => reject('Failed to read file');
    reader.readAsArrayBuffer(file);
  });
}
