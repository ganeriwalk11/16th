import React from 'react';
import  { Component }  from 'react';
import SpreadSheet from '../containers/SpreadSheet';
import ActualData from '../containers/ActualData'
//import FilterData from '../containers/FilterData'
export default class App extends Component {
  render() {
    return (
      <div>
        <SpreadSheet /> 
        <ActualData />
      </div>
    );
  }
}
