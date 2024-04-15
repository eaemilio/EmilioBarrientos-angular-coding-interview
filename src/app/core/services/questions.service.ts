import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionModel } from '../state/question.model';
import { QuestionsStore } from '../state/questions.store';
import { map, pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  gettingQuestions$ = this.store.select('gettingQuestions');
  questions$ = this.store.find();

  constructor(
    private readonly http: HttpClient,
    private readonly store: QuestionsStore,
  ) { }

  getQuestions(params: { [x: string]: any, amount: string, type?: string, difficulty?: string }): Observable<QuestionModel[]> {
    Object.keys(params).forEach((key: string) => typeof params[key] === 'undefined' && delete params[key]);
    this.store.update(state => ({
      ...state,
      gettingQuestions: true,
    }));

    return this.http.get<{ results: any[] }>('https://opentdb.com/api.php', { params })
      .pipe(pluck('results'))
      .pipe(map(results => {
        return results.map(result => ({
          _id: new Date().getTime().toString() + Math.random(),
          category: result.category,
          type: result.type,
          difficulty: result.difficulty,
          question: result.question,
          answers: [{
            _id: new Date().getTime().toString() + Math.random(),
            text: result.correct_answer,
            isCorrect: true,
          },
            ...result.incorrect_answers.map((answer: any) => ({
              _id: new Date().getTime().toString() + Math.random(),
              text: answer,
              isCorrect: false,
            }))
          ].sort(() => .5 - Math.random()), // We know this isn't the best shuffle but it's just a simple one for this challenge
        }));
      }))
      .pipe(tap((questions) => {
        this.store.set(questions);
        this.store.update(state => ({
          ...state,
          gettingQuestions: false,
        }));
      }));
  }

  selectAnswer(questionId: QuestionModel['_id'], answerId: string): void {
    this.store.upsert(questionId, entity => ({
      ...entity,
      selectedId: answerId,
    }))
  }
}
