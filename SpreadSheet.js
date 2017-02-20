import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rx from "rxjs";
import { Observable } from 'rxjs/Observable';

import { fetchData } from '../actions/index';

class SpreadSheet extends Component
{
    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        this.props.fetchData();
    }

    // refCallback(item)
    // {
    //     if (item)
    //     {  
    //         console.log("here");
    //         var a = ReactDOM.findDOMNode(item);
    //         var stream$ = Observable.fromEvent(a,'click');
    //         stream$.subscribe((e) => 
    //         {
    //             this.props.fetchData();
    //         });
    //     }
    // }

    render() 
    {
        return(
            <div>
               
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return{
        fetchData: bindActionCreators(fetchData, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(SpreadSheet);
