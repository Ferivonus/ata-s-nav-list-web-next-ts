import type { NextApiRequest, NextApiResponse } from 'next';
import { readExamData } from '@/../lib/excel';
import { ExamInfo } from '@/../types/exam';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExamInfo | { error: string }>
) {
  const { course_code } = req.query;
  if (typeof course_code !== 'string') {
    return res.status(400).json({ error: 'Invalid course code' });
  }

  const exams = readExamData();
  const exam = exams.find(
    (e) => e.course_code.toUpperCase() === course_code.toUpperCase()
  );

  if (!exam) {
    return res.status(404).json({ error: 'Exam not found' });
  }

  res.status(200).json(exam);
}
