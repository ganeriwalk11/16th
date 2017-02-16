import Rx from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';

import { FETCH_DATA } from '../actions/index';
import { FETCH_FUL } from '../actions/index';
import { FETCH_FULL } from '../actions/index';
import { ADD_DATA } from '../actions/index';
import { ADD_COL } from '../actions/index';
import { CHECK_INTEGER } from '../actions/index';
import { APPLY_FUN } from '../actions/index';
import { applyF } from '../actions/index';
import { S_COLOR } from '../actions/index';

const rxFetch = require('rxjs-fetch');

export default function(state = [], action)
{
  switch (action.type)
  {    
    case FETCH_DATA:
    {
      return state;
      break;
    }

    case FETCH_FUL:
    {
      var head = Object.keys(action.payload[0]);
      var len = head.length;
      var data = action.payload;
      return (data);
      break;
    }

    case FETCH_FULL:
    {
      var head = Object.keys(action.payload[0]);
      var len = head.length;
      var data = [...state];
      var q= [];
      var w = [];
      for(var i=0;i<len;i++)
      {
        console.log(data,i);
        q.push(data[i]['c']['url']);
      }   
      var j=0;
      Observable.from(q)
        .concatMap(function(row)
        { 
          return rxFetch(row).json();
        })
        .subscribe(response =>
        {
          data[j++]['c']['value'] = (response['cod']);
        });
       return data;
        break;
    }

      case ADD_DATA:
      { 
        var data = [...state];
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let dupdata = action.payload;
        let head = Object.keys(dupdata[0]);
        let add = {};
        head.map(function(header)
        {
          add[header] = {"value":"","color":"","fx":"","dep":{},"url":""};
        })
        data = data.concat(add);
        return data;
      }

      case ADD_COL:
      {
        var data = [...state];
        data.map(function(row){
          row[action.payload.toLowerCase()] = {"value":"","color":"","fx":"","dep":{},"url":""};
        });
        return data;
      }

       case CHECK_INTEGER:
       {
         var data = [...state];
         var i = action.payload.i;
         var q = action.payload.h;
         var h = q.h;
         data[i][h]['color'] = 'green';
         data[i][h]['value'] = action.payload.target;    
         return data;
      }
      
      case S_COLOR:
      {
        var data = [...state];
        var i = action.payload.i;
        var h = action.payload.h;
        data[i][h]['color'] = 'red';
        data[i][h]['value'] = action.payload.target;
        return (data);
        break;
      }

      case APPLY_FUN:
      {
        var i = action.payload.i;
        var op1i = action.payload.op1i;
        var op1j = action.payload.op1j;
        var op2i = action.payload.op2i;
        var op2j = action.payload.op2j;
        var head = action.payload.head;
        var ans = action.payload.ans;
        var color = action.payload.color;
        var header = action.payload.header;
        var a = action.payload.a;
        var data = [...state];
        data[op1i][head[op1j]]["dep"] = header + i;
        data[op2i][head[op2j]]["dep"] = header + i;
        data[i][header]["fx"] = a;
        data[i][header]["color"]  = color;
        data[i][header]['value'] = ans;
        return data;
      }
  }
  return state;
}