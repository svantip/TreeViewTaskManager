export interface Group {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  done: boolean;
  groupId: number;
}

export interface AppData {
  groups: Group[];
  tasks: Task[];
}