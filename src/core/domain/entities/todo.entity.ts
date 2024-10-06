export class Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;

  constructor(title: string) {
    if (!title) {
      throw new Error("Title can't be empty");
    }

    this.title = title;
    this.completed = false;
    this.created_at = new Date().toISOString().split('T')[0];
  }
}
