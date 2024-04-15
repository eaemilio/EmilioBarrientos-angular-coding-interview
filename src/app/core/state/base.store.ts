import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

export class BaseStore<T, R> {
  public stateInitiated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private state: BehaviorSubject<T & {
    entities: { [_id: string]: R },
  }>;

  constructor(initialState: T) {
    this.state = new BehaviorSubject({
      ...initialState,
      entities: {},
    });
    this.stateInitiated$.next(true);
  }

  select(field: keyof T) {
    return this.state.asObservable()
      .pipe(pluck(field));
  }

  /*
  * This method returns all the entities in an array method
  * */
  find(): Observable<R[]> {
    return this.state.asObservable()
      .pipe(pluck('entities'))
      .pipe(map(entities => Object.values(entities)));
  }

  /*
  * This method is used to updated the state but not the entities
  * */
  update(newState: (state: T) => T): void {
    const currentState = this.state.getValue();
    const updatedState = newState(currentState);
    this.state.next({
      ...currentState,
      ...updatedState,
    });
  }

  /*
  * This method set new entities to the state's store and removes the old ones
  * */
  set(data: R | R[]): void {
    const currentState = this.state.getValue();
    const newEntities = (Array.isArray(data) ? data : [])
      .reduce((all, current) => ({
        ...all,
        [(current as any)._id]: current
      }), {});

    this.state.next({
      ...currentState,
      entities: newEntities,
    });
  }

  upsert(entityId: string, entity: (state: R) => R): void {
    const currentState = this.state.getValue();
    currentState.entities[entityId] = entity(currentState.entities[entityId]);
    this.state.next(currentState);
  }
}

declare type IBaseState<T, R> = T & {
  entities?: { [_id: string]: R },
};
