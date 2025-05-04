import { AppData } from '../types';

export const initialData: AppData = {
  "groups": [
    { "id": 1, "name": "Work" },
    { "id": 2, "name": "Home" }
  ],
  "tasks": [
    { "id": 1, "name": "Finish report", "description": "Q2 results", "difficulty": "hard", "done": false, "groupId": 1 },
    { "id": 2, "name": "Buy groceries", "description": "", "difficulty": "easy", "done": true, "groupId": 2 }
  ]
};