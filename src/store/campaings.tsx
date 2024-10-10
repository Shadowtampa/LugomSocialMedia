import { Observer, Subject } from 'rxjs';
import { ICampaingProps } from '../interfaces/Campaing';

const subject = new Subject();

const initialState: ICampaingProps[] =
    [
    ]
    ;

let state = initialState;

export const campaingStore = {
    init: () => subject.next(state),

    subscribe: (setState: Partial<Observer<unknown>> | ((value: unknown) => void) | undefined) => subject.subscribe(setState),

    initialState
}