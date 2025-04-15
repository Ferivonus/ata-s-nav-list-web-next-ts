import React from 'react';
import { ExamInfo } from '@/../types/exam';

interface ExamTableProps {
  exams: ExamInfo[];
}

export default function ExamTable({ exams }: ExamTableProps) {
  if (!exams.length) {
    return <p className="text-gray-500 mt-4">Upload an Excel file to see exams.</p>;
  }

  return (
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
  );
}
