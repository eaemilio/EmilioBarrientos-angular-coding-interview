export interface QuestionModel {
  _id: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  answers: Array<{
    _id: string;
    isCorrect: boolean;
    text: string;
  }>
  selectedId?: string;
}
