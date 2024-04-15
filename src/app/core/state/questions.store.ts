import { Injectable } from '@angular/core';
import { BaseStore } from './base.store';
import { QuestionModel } from './question.model';

const initialState = {
  gettingQuestions: false,
  gameCompleted: false,
};

@Injectable({
  providedIn: 'root'
})
export class QuestionsStore extends BaseStore<typeof initialState, QuestionModel> {
  constructor() {
    super(initialState);
  }
}
