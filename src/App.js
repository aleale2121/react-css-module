import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person';

const StyledButton=styled.button`
      background-color: ${props=>props.alt? 'red':'green'};
      color:white;
      font:inherit;
      border:1px solid blue;
      padding:8px;
      cursor:pointer;
      &:hover{
         background-color: ${props=>props.alt? 'salmon':'lightgreen'};
         color:black;
      } 
`;

class App extends Component {
  state = {
    persons: [
      {id:'sadjhf', name: 'Max', age: 28 },
      {id:'sfhds',  name: 'Manu', age: 29 },
      {id:'safsddjhf',  name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPerson:false
  };
  

  nameChangedHandler = (event,id) => {
    const personIndex=this.state.persons.findIndex(p=>{
        return p.id===id;
      }
    )
    const person={...this.state.persons[personIndex]};
    person.name=event.target.value;


    const persons=[...this.state.persons];
    persons[personIndex]=person;    
    this.setState( { persons:persons}); 
  };
  togglePersonHandler= ()=>{
    const doesShow=this.state.showPerson;
    this.setState({showPerson:!doesShow});
  };
  deletePersonHandler=(personIndex)=>{
    //const persons=this.state.persons;this creates refrerence to state it may lead to bad behavior 
    //const persons=this.state.persons.slice();create copy
    const persons=[...this.state.persons];//create copy
    persons.splice(personIndex,1);
    this.setState({persons:persons});

  }

  render () {
    // const style={
    //   backgroundColor:'green',
    //   color:'white',
    //   font:'inherit',
    //   border:'1px solid blue',
    //   padding:'8px',
    //   cursor:'pointer',
    //   ':hover':{
    //      backgroundColor:'lightgreen',
    //      color:'black'
    //   }
    // };
  let personsL=null;

  if(this.state.showPerson){
    personsL=(
      <div>
        {
          this.state.persons.map((person,index)=>{
            return <Person
              click={()=>this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event)=>this.nameChangedHandler(event,person.id)}
            />
          })}
      </div>
    );
  //   style.backgroundColor='red';
  //   style[':hover']={
  //     backgroundColor:'salmon',
  //     color:'black'
  //  }
  }
  const classes=[];
  if(this.state.persons.length<=2){
    classes.push('red');//classes =['red']
  }
  if(this.state.persons.length<=1){
    classes.push('bold');//classes =['red','bold']
  }
    return (
        <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <StyledButton 
          alt={this.state.showPerson}
          onClick={ this.togglePersonHandler}>Switch Name
        </StyledButton>
        {personsL}
        
      </div>
      
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
