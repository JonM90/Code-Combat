import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
import {connect} from 'react-redux'
const {EventEmitter} = require('events');
export const events = new EventEmitter()
// import socket from '../socket';
// export default events;
// import axios from 'axios';

export class CodeEditor extends Component {
  constructor() {
    super();

    this.state = {
      attempt: '',
      currentProblem: {},
      output: '',
      eligibleQueue: [],
      // problems: [],
      problemNum: 0,
      pass: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);

  }
  componentDidMount() {
    if (!this.ace) return null;
    this.editor = this.ace.editor
    console.log('MOUNTED', this.editor)
    // this.state.eligibleQueue.length && this.editor.setValue(`function ${(this.props.allQuestions[this.state.problemNum]).signature}{}`)
  }

  componentWillReceiveProps(nP) {
    if (nP.questions.length) {
      this.setState({eligibleQueue: nP.questions})
      if (this.state.eligibleQueue.length) {
        this.ace.editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum]).signature}{}`)
      }
    }
    console.log('NP:', nP)

    if (nP.match && nP.match.id) {
      this.setState({match: nP.match})
    }
  }

  onChange(newValue, e) {
    // console.log(newValue, e);
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // console.log(editor.getValue()); // Outputs the value of the editor
    this.setState({attempt})
  }

  nextQuestion(e){
    e.preventDefault();
    this.setState({problemNum: this.state.problemNum + 1})
    this.setState({output: ''})
    const editor = this.ace.editor
    this.state.eligibleQueue && editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum + 1]).signature}{}`)
  }

  onSubmit(e) {
    e.preventDefault();
    let currMatch = this.state.match
    // console.log('currMATCH:', currMatch)
    console.log('this.props:', this.props)
    let myID = +this.props.battleProps.match.params.userId

    let player = myID && currMatch.playerHost === myID ? 'host' : 'guest'

    console.log('PLAYERTYPE', player, 'currMatch.playerHost:', typeof currMatch.playerHost, 'myID:', typeof myID)

    currMatch.id ?
      events.emit('battleSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs, player])
    :
      events.emit('userSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs]);

      console.log("SECOND EVENT", events)
      events.on('output', (output) => {this.setState({output})})
      events.on('pass', (pass) => this.setState({pass}))
      console.log("THIRD EVENT", events)
  }

  render() {
    let quest = this.state.eligibleQueue
    console.log('quest', quest)
    return (
      this.state.problemNum !== this.state.eligibleQueue.length ?
      (<div className="main-train-container" >

        {quest.length && <div className='question-div'>
          <h2 className='question-title-text'>{quest.length && quest[this.state.problemNum].title}</h2>
          <h6 className='question-description-text'>{quest.length && quest[this.state.problemNum].description}</h6>
        </div>}

        <div className="train-container">
          <div className="editor-div left-train-container">
            <ReactAce
              style={{ height: '50vh'}}
              mode="javascript"
              theme="monokai"
              enableBasicAutocompletion = {true}
              onChange={this.onChange}
              ref={instance => { this.ace = instance; }} // Let's put things into scope
            />

            <form id="train-submit" className="submit-btn" onSubmit={this.onSubmit}>
              <input id="train-submit-btn"type="submit" />
              <button onClick={this.nextQuestion}>
                NEXT
              </button>
            </form>
          </div>

          <div className="right-train-container">
            <div className="output-div" >
              <h4 className="right-container-headers">Output:</h4>

            </div>

            <div className="test-specs-div">
              <h4 className="right-container-headers">Test Specs:</h4>
              {
                this.state.output ? <div id="output-text"> {this.state.output} </div>  : <div><p></p></div>
              }
            </div>

          </div>
        </div>
      </div>) : <div><h2>CONGRATULATIONS!!!</h2></div>
    );
  }
}

const mapState = (state) => {
  console.log('STATE:', state)
  return {
    user: state.user,
  }
}

export default connect(mapState)(CodeEditor)
