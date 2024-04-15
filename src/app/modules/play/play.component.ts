import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../core/services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, filter, map, pluck, switchMap, tap } from 'rxjs/operators';
import { QuestionModel } from '../../core/state/question.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  questions$ = this.questionsService.questions$;
  gettingQuestions$ = this.questionsService.gettingQuestions$;
  public completed$: Observable<boolean>;
  public questionsAmount = 0;
  public correctAnswers = 0;
  public error?: string;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly questionsService: QuestionsService,
  ) {
    this.completed$ = this.questions$.pipe(
      map(questions => questions.filter(q => q.selectedId)),
      map(answered => answered.length === Number(this.questionsAmount)),
      tap((completed) => console.log('completed?', completed))
    );
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap(({ amount }) => this.questionsAmount = amount),
        switchMap(params =>
          this.questionsService.getQuestions({
            type: params.type,
            amount: params.amount,
            difficulty: params.difficulty
          }).pipe(
            catchError((error) => this.error = error)
          ),
      )).subscribe();

      this.questions$.subscribe(questions => {
        questions.forEach(question => {
          const correctAnswer = question.answers.find(a => a.isCorrect)
          if (question.selectedId === correctAnswer?._id) {
            this.correctAnswers++;
          }
        })
      })
  }

  onAnswerClicked(questionId: QuestionModel['_id'], answerSelected: string): void {
    this.questionsService.selectAnswer(questionId, answerSelected);
  }

}
