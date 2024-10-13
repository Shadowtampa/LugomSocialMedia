import { Observer, Subject } from 'rxjs';
import { ICampaingProps } from '../interfaces/Campaing';

const subject = new Subject<ICampaingProps[]>();

const campaings: ICampaingProps[] = [
    
];

const storeID = 1;

let state = campaings;

export const campaingStore = {
    // Inicia o estado emitindo o estado atual
    init: () => subject.next(state),

    // Permite que os componentes se inscrevam para receber atualizações do estado
    subscribe: (setState: Partial<Observer<ICampaingProps[]>> | ((value: ICampaingProps[]) => void) | undefined) => subject.subscribe(setState),

    // Atualiza o estado e notifica os inscritos
    setCampaings: (newCampaings: ICampaingProps[]) => {
        state = [...newCampaings]; // Atualiza o estado
        subject.next(state); // Emite o novo estado para os inscritos
    },

    campaings,
    storeID
}
