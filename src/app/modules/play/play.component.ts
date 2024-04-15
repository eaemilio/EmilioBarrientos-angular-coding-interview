import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../core/services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { QuestionModel } from '../../core/state/question.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  questions$ = this.questionsService.questions$;
  gettingQuestions$ = this.questionsService.gettingQuestions$;
  getQuestionsSubscription: Subscription = this.route.queryParams
    .pipe(switchMap(params =>
      this.questionsService.getQuestions({
        type: params.type,
        amount: params.amount,
        difficulty: params.difficulty
      })
    )).subscribe();


  constructor(
    private readonly route: ActivatedRoute,
    private readonly questionsService: QuestionsService,
  ) { }

  ngOnInit(): void {
  }

  onAnswerClicked(questionId: QuestionModel['_id'], answerSelected: string): void {
    this.questionsService.selectAnswer(questionId, answerSelected);
  }

}
