export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number };
