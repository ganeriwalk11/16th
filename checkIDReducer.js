import { fx_bar } from '../actions/validations';
import { f_bar } from '../actions/validations';
import { APPLY_F } from '../actions/validations';

export default function(state ="", action) {
  switch (action.type) {

    case APPLY_F: {
        var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var s = action.payload.fx;
        var l = action.payload.l;
        if(s[0] != '=' ){
            alert("Not valid, missing =");
        }
        else
        {
            if(alpha.indexOf(s[1]) > l-1 || alpha.indexOf(s[3]) > l-1){
                alert("Invalid operands for calculations");
            }
            else{
                if(s[1]=='+'){
                    
                }
            }
        }
    }

    case fx_bar:
        return action.payload;

    case f_bar:{
        return action.payload;
    }

    defualt: return state;
    
  }
  return state;
}

