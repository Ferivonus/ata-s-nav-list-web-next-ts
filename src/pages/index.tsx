// pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';

interface ExamInfo {
  date: string;
  day: string;
  time: string;
  course_code: string;
  academic_staff: string;
  group: string;
  students: string;
  exam_type: string;
  classroom: string;
}

export default function Home() {
  const [exams, setExams] = useState<ExamInfo[]>([]);
  const [courseCodeInput, setCourseCodeInput] = useState('');
  const [error, setError] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  async function fetchExamData() {
    try {
      const res = await fetch('/api/exams');
      const data = await res.json();
      setExams(data);
      setError('');
      setIsFiltering(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load exam data.');
    }
  }

  async function fetchExamByCourseCode() {
    if (!courseCodeInput.trim()) {
      fetchExamData();
      return;
    }

    try {
const res = await fetch(`/api/exams/${encodeURIComponent(courseCodeInput.trim())}`);
      const result = await res.json();
      if (result) {
        setExams([result]);
        setError('');
        setIsFiltering(true);
      } else {
        setExams([]);
        setError(`No exam found for "${courseCodeInput}"`);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch course.');
    }
  }

  useEffect(() => {
    fetchExamData();
  }, []);

  return (
    <div className="p-8 text-center">
      <Head>
        <title>Exam Schedule</title>
      </Head>

      <main>
        <h1 className="mb-4 text-3xl font-bold">📘 Exam Schedule</h1>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            value={courseCodeInput}
            onChange={(e) => setCourseCodeInput(e.target.value)}
            type="text"
            placeholder="Enter course code (e.g. CS101)"
            onKeyUp={(e) => e.key === 'Enter' && fetchExamByCourseCode()}
            className="px-4 py-2 border border-gray-300 rounded-md text-base w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={fetchExamByCourseCode}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            🔍 Filter
          </button>
          {isFiltering && (
            <button
              onClick={fetchExamData}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              ↩ Reset
            </button>
          )}
        </div>

        {error && <div className="text-red-600 font-semibold mt-4">{error}</div>}

        {exams.length ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">Date</th>
                  <th className="border px-3 py-2">Day</th>
                  <th className="border px-3 py-2">Time</th>
                  <th className="border px-3 py-2">Course</th>
                  <th className="border px-3 py-2">Academic</th>
                  <th className="border px-3 py-2">Group</th>
                  <th className="border px-3 py-2">Students</th>
                  <th className="border px-3 py-2">Type</th>
                  <th className="border px-3 py-2">Classroom</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-3 py-2">{exam.date}</td>
                    <td className="border px-3 py-2">{exam.day}</td>
                    <td className="border px-3 py-2">{exam.time}</td>
                    <td className="border px-3 py-2">{exam.course_code}</td>
                    <td className="border px-3 py-2">{exam.academic_staff}</td>
                    <td className="border px-3 py-2">{exam.group}</td>
                    <td className="border px-3 py-2">{exam.students}</td>
                    <td className="border px-3 py-2">{exam.exam_type}</td>
                    <td className="border px-3 py-2">{exam.classroom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !error ? (
          <p className="text-gray-500 mt-4">Loading exams...</p>
        ) : null}
      </main>
    </div>
  );
}
