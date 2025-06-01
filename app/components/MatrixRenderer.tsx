import React from "react";
import { MatrixState } from "../types/matrix";

type MatrixRendererProps = {
  state: MatrixState;
};

export default function MatrixRenderer({ state }: MatrixRendererProps) {
  return (
    <table className="table-auto border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2"></th>
          {state.columns.map((col: string, colIndex: number) => (
            <th key={colIndex} className="border px-4 py-2">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state.rows.map((row: string, rowIndex: number) => (
          <tr key={rowIndex}>
            <td className="border px-4 py-2">{row}</td>
            {state.columns.map((_: string, colIndex: number) => (
              <td key={colIndex} className="border px-4 py-2 text-center">
                <input
                  type={state.choiceType === "single" ? "radio" : "checkbox"}
                  name={`row-${rowIndex}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
