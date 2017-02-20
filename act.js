import Rx from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const POST_DATA = 'POST_DATA';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_FUL = 'FETCH_USER_FULFILLED';
export const FETCH_FULL = 'FETCH_USER_F';
export const ADD_DATA = 'ADD_DATA';
export const ADD_COL = 'ADD_COL';
export const CHECK_INTEGER = 'CHECK_INTEGER';
export const APPLY_FUN = 'APPLY_FUN';
export const S_COLOR = 'S_COLOR';

const url = 'src/jsonData/mainData.json';
const urla = 'http://localhost:5000';
export const fetchUserEpic = action$ =>
  action$.ofType(FETCH_DATA)
    .mergeMap(action =>
      Observable.ajax.getJSON(url)
        .map(response => fetchUserFulfilled(response))
    );

export const fetchUserFulfilled = payload => (
{ 
  type: FETCH_FUL,
  payload 
});

export function fetchData()
{
  return{
    type: FETCH_DATA
  }
};

export function fetchUrlData(data) {
  return {
    type: FETCH_FULL, 
    payload: data
  };
};

 
export function postData(data) {
  const request = axios.post(urla,data);
     return {
    type: POST_DATA
  }
};

export function addData(dupdata) {
 return {
    type: ADD_DATA,
    payload: dupdata
  };
};

export function addColData(add)
{
  var addColumn = add;
  return{
    type: ADD_COL,
    payload: addColumn
  };
};

export function checkIntegerAction(i,h,target) 
{
  return {
    type: CHECK_INTEGER,
    payload: {
      i:i,
      h:h,
      target: target
    }
  };
};

export function stringColor(h,i,target) 
{
  return {
    type: S_COLOR,
    payload: {
      i:i,
      h:h,
      target:target
    }
  };
};

// export const applyFunctionEpic = action$ =>
//   action$.ofType(APPLY_FORMULA)
//     .map(function(action)
//       {
//         let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//         var a = action.payload.a;
//         var i = action.payload.i;
//         var data = action.payload.data;
//         var head = Object.keys(data[0]);
//         var len = head.length;
//         var op1i = a[3] - 1;
//         var op2i = a[6] - 1;
//         var op1j = alpha.indexOf(a[2]) +1;
//         var op2j = alpha.indexOf(a[5]) +1;
//         var operator = a[4];
//         var ans;
//         if(operator == '+'){
//           ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) + parseInt(data[op2i][head[op2j]][head[op2j]],10);
//         }
//         else{
//           ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) - parseInt(data[op2i][head[op2j]][head[op2j]],10);
//         }
//         var color = action.payload.color;
//         var response = {
//           op1i: op1i,
//           op1j:op1j,
//           op2i: op2i,
//           op2j:op2j,
//           ans: ans,
//           data:data,
//           head,head,
//           i:i,
//           a:a,
//           color:color
//         };
//         return applyFunc(response);
//       });
//       // .subscribe(function(data){applyFunc(data);});
      

export function applyFunc(response) 
{
  return {
    type: APPLY_FUNC,
    payload : response
  }
};


export function applyF(h,a,i,data,color) 
{
  var a = a;
  var data = data;
  var header = h;
  var color = color;
  let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var i = i;
  var head = Object.keys(data[0]);
  var len = head.length;
  var op1i = a[3] - 1;
  var op2i = a[6] - 1;
  var op1j = alpha.indexOf(a[2]);
  var op2j = alpha.indexOf(a[5]);
  var operator = a[4];
  var ans;
  if(operator == '+')
  {
    ans = parseInt(data[op1i][head[op1j]]['value'],10) + parseInt(data[op2i][head[op2j]]['value'],10);
  }
  else
  {
    ans = parseInt(data[op1i][head[op1j]]['value'],10) - parseInt(data[op2i][head[op2j]]['value'],10);
         // console.log((data[op1i][head[op1j]][head[op1j]],10),parseInt(data[op2i][head[op2j]][head[op2j]],10),ans);
  }
  var response = {
          op1i: op1i,
          op1j:op1j,
          op2i: op2i,
          op2j:op2j,
          ans: ans,
          data:data,
          head,head,
          i:i,
          a:a,
          color:color,
          header: header
    };
    return {type:APPLY_FUN,payload:response};
};
