import Head from 'next/head';
import { useState } from 'react';
import { ExamInfo } from '@/../types/exam';
import FileUpload from '@/components/FileUpload';
import ExamFilter from '@/components/ExamFilter';
import ExamTable from '@/components/ExamTable';

export default function Home() {
  const [exams, setExams] = useState<ExamInfo[]>([]);
  const [courseCodeInput, setCourseCodeInput] = useState('');
  const [error, setError] = useState('');

  const filteredExams = courseCodeInput
    ? exams.filter((exam) =>
        exam.course_code.toLowerCase().includes(courseCodeInput.toLowerCase())
      )
    : exams;

  return (
    <div className="p-8 text-center">
      <Head>
        <title>Exam Schedule</title>
      </Head>

      <main>
        <h1 className="mb-4 text-3xl font-bold">📘 Exam Schedule</h1>

        <FileUpload
          onExamsParsed={setExams}
          onError={setError}
        />

        <ExamFilter
          value={courseCodeInput}
          onChange={setCourseCodeInput}
          onReset={() => setCourseCodeInput('')}
        />

        {error && <div className="text-red-600 font-semibold mt-4">{error}</div>}

        <ExamTable exams={filteredExams} />
      </main>
    </div>
  );
}
