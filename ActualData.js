import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rx from "rxjs";
import { Observable } from 'rxjs/Observable';

import { inputEdit } from '../actions/validations';
import { applyF } from '../actions/index';
import rootReducer from '../reducers/index';
import { postData } from '../actions/index';
import { addData } from '../actions/index';
import { addColData } from '../actions/index';
import { checkIntegerAction } from '../actions/index';
import { fetchUserFulfilled } from '../actions/index';
import { fetchUrlData } from '../actions/index';
import { stringColor } from '../actions/index';

require("babel-polyfill");

class ActualData extends Component
{
    constructor(props)
    {
        super(props);
        this.x = [];
    }

    componentDidMount()
    {
       setInterval(() => {this.props.fetchUrlData(this.props.data)},200);    
    }

    checkFocus(event)
    {
        this.x.push(event.target.innerText);
    }

    checkBlur(h,i,j,event)
    {
        var dupdata = this.props.data;
        var head = Object.keys(dupdata[0]);
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var target = event.target.innerText;
       // Observable.of(target).if(() => target == parseInt(target,10), console.log("Number"),console.log("NO"));
        if(dupdata[i][head[j]]["value"] != target)
        {
            if( this.x[this.x.length - 1] != target)
            {
                if(target == parseInt(target,10))
                {
                    this.props.checkIntegerAction(i,h,target);
                    if(dupdata[i][head[j]]["dep"].length)
                    {
                        var depformula = []; 
                        depformula = dupdata[i][head[j]]["dep"];
                        var deep = depformula[0];
                        console.log(depformula,typeof(dupdata[i][head[j]]["dep"]));
                        depformula.map(function(depf){
                            var p = parseInt(depf[1],10) - 1;
                            var t = depf[0];
                            var f = dupdata[p][t]["fx"];
                            console.log(p,t,f);
                            this.props.applyF(t,f,p,dupdata, "blue");
                        }); 
                        
                    }  
                }
                else
                {
                    if(target[0] == '=' && alpha.indexOf(target[2])>-1 && alpha.indexOf(target[5])>-1 && target[1] == '(' && target[target.length -1]  == ')')
                    {
                        var op1i = target[3] - 1;
                        var op2i = target[6] - 1;
                        var op1j = alpha.indexOf(target[2]);
                        var op2j = alpha.indexOf(target[5]);
                        var operator = target[4];
                        if( !(dupdata[op1i]) || !(dupdata[op2i]))
                        {
                            console.log("Operands are out of bounds");
                        }
                        else
                        {
                            this.props.applyF(h.h,target,i,dupdata,"blue");
                        }
                    }
                    else
                    {
                      this.props.stringColor(h.h,i,target);  
                    }
                }   
            } 
        }  
    }
 
    refCallback(item)
    {
        if (item)
        {  
            var a = ReactDOM.findDOMNode(item);
            var fxBar = this.refs.theInput;
            var flag = 0;
            var rowno = Number(a.className[1]);
            var header = (a.className[0].toLowerCase());
            var head = Object.keys(this.props.data[0]);
            var stream$ = Observable.fromEvent(a,'dblclick');
            var data;
            stream$.subscribe((e) => {    
                if(this.props.data[rowno -1][header]["fx"])
                { 
                    data = this.props.data[rowno -1][header]["fx"];
                    flag =1;
                }
                else
                    data = this.props.data[rowno -1][header]["value"];
                this.props.inputEdit(data,a.className);
            });
            var stream1$ = Observable.fromEvent(fxBar,'keyup')
                                    .debounceTime(750)
                                    .distinctUntilChanged();
            stream1$.subscribe((e) => {
                console.log(flag,a);
                if(flag == 1)
                {
                    a.innerText = e.target.innerText;
                    this.props.data[rowno -1][header]["fx"] = e.target.innerText;
                }
                else
                {
                    a.innerText = e.target.innerText;
                    this.props.data[rowno -1][header]["value"] = e.target.innerText;
                }
            });
        }
  }

    saveData(){
        var dats = this.props.data;
        this.props.postData(dats[0]);
    }


    addRow = () =>
    {
        var head = Object
        this.props.addData(this.props.data);
    }

    addColumn = () =>
    {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let dupdata = this.props.data;
        let head = Object.keys(dupdata[0]);
        let col  = alpha[head.length];
        this.props.addColData(col);
    }

    renderHead = (data) => 
    {
        var dupData = data;
        if(dupData[0])
        {   
            var head = Object.keys(dupData[0]);
            var len = head.length;
            let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var a = [<th key="blank"></th>];
            for(var i=0;i<len;i++)
            {
                a.push(<th key={i}>{alpha[i]}</th>);
            }
            return (<tr key="header">{a}</tr>);
        }
    }

    renderData = (row,i) =>
    {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var b = [];
        var a = [];
        var q = [];
        var y = [];
        var dupdata = row;
        var head = Object.keys(dupdata);
        let len = dupdata.length;
        if(len != 0)
        {
            a.push(i+1);
            a.push(head.map((h,j) =>
            {
                var s = alpha[j] + (i+1);
                return (
                    <td
                        ref={function(e){if(e) e.contentEditable=true;}}
                        key={s}
                        ref={this.refCallback.bind(this)}
                        style = {{color:dupdata[h]['color']}}
                        className={s}
                        onFocus = {this.checkFocus.bind(this)}
                        onBlur = {this.checkBlur.bind(this,{h},i,j)}
                    >{dupdata[h]['value']}</td>
                );   
            }))
            return (<tr key={i}>{a}</tr>);
        }
    }

    render()
    {
        return(
            <div>
                <button id="save" onClick={this.saveData.bind(this)}>SAVE</button>
                <button id="addRow" onClick={this.addRow.bind(this)}>ADD ROW</button>
                <button id="addCol" onClick={this.addColumn.bind(this)}>ADD COLUMN</button>
                <table><tr><td>fxbar:</td><td ref="theInput">{this.props.vad}</td></tr></table>
                <table>
                    <thead>{this.renderHead(this.props.data)}</thead>
                    <tbody>{this.props.data.map(this.renderData)}</tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return{
        data: state.data,
        vad : state.vad
    };
}

function mapDispatchToProps(dispatch)
{
    return{
        checkIntegerAction: bindActionCreators(checkIntegerAction, dispatch),
        postData: bindActionCreators(postData,dispatch),
        applyF: bindActionCreators(applyF,dispatch),
        addData: bindActionCreators(addData,dispatch),
        addColData: bindActionCreators(addColData,dispatch),
        inputEdit: bindActionCreators(inputEdit,dispatch),
        fetchUrlData: bindActionCreators(fetchUrlData, dispatch),
        stringColor: bindActionCreators(stringColor, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ActualData);
