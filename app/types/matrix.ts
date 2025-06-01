export interface MatrixState {
  question: string;
  rows: string[];
  columns: string[];
  choiceType: 'single' | 'multiple';
  required: boolean;
}

export type MatrixAction =
  | { type: 'SET_QUESTION'; payload: string }
  | { type: 'ADD_ROW' }
  | { type: 'REMOVE_ROW'; index: number }
  | { type: 'UPDATE_ROW'; index: number; value: string }
  | { type: 'ADD_COLUMN' }
  | { type: 'REMOVE_COLUMN'; index: number }
  | { type: 'UPDATE_COLUMN'; index: number; value: string }
  | { type: 'TOGGLE_CHOICE_TYPE' }
  | { type: 'TOGGLE_REQUIRED' }
  | { type: 'RESET'; payload: MatrixState }; 