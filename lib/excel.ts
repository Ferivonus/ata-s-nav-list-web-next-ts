import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { ExamInfo } from "../types/exam";

let cachedData: ExamInfo[] | null = null;

export function readExamData(): ExamInfo[] {
  if (cachedData) return cachedData;

  const filePath = path.join(process.cwd(), 'public/data/exams.xlsx');
  const fileBuffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

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

  cachedData = allExams;
  return allExams;
}
