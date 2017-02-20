import { Observable } from 'rxjs/Observable';

export const APPLY_F = 'APPLY_F';
export const fx_bar = 'fx_bar';

export const inputEditEpic = action$ =>
  action$.ofType(fx_bar)
    .mergeMap(action =>
        Observable.of(action.payload)
        .map(value => fbar(value))
    );

export function applyF (fx,l){
  return {
    type: APPLY_F,
    payload:{
        fx:fx,
        l:l
    } 
  };
}

export function inputEdit(value)
{
  return {
    type: fx_bar,
    payload: value 
  };
}

export function fbar(value)
{
  return {
    type: f_bar,
    payload: value 
  };
}



