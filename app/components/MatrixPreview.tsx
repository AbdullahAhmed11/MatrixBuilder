import React from 'react';
import { MatrixState } from '../types/matrix';

export default function MatrixPreview({ state }: { state: MatrixState }) {
  return (
    <div className='border rounded-md shadow-xl p-4 bg-white border-white'>
      <h2 className="text-xl font-semibold mb-4 flex justify-end ">؟{state.question}</h2>
      <table className="w-full ">
        <thead className="">
          <tr>
            <th className="p-2">العناصر \ الخيارات</th>
            {state.columns.map((col, colIndex) => (
              <th key={colIndex} className="text-center p-2">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-2 bg-gray-100" >{row}</td>
              {state.columns.map((_, colIndex) => (
                <td key={colIndex} className="text-center p-2 bg-gray-100">
                  <input type={state.choiceType === 'single' ? 'radio' : 'checkbox'} name={`row-${rowIndex}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
