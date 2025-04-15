import type { NextApiRequest, NextApiResponse } from 'next';
import { readExamData } from '@/../lib/excel';
import { ExamInfo } from '@/../types/exam';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExamInfo[]>
) {
  const exams = readExamData();
  res.status(200).json(exams);
}
