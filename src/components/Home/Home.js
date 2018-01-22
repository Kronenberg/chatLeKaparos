import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGroups, sendMessage } from '../../actions/senders';
import { createAccount } from '../../actions/auth';
import _ from 'lodash'
import './Home.css';
class Home extends Component {
  constructor(){
    super();

    this.state = {
      message: '',
      email: '',
      password: '',
      currentUser: '',
      test: 'asd'
    }
  }

  componentWillMount() {
    this.props.getAllGroups();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.groupStatus.groups && nextProps.groupStatus.groups) {

    }
  }

  sendMessage = (e) => {
      e.preventDefault();
      if (!localStorage.getItem('userName') && this.state.message.length < 0) {
          console.log('please log in');
      } else {
        this.props.sendMessage(this.state.message);
        this.setState({ message: '' });
      }

    
     
  }

  getMessage = (e) => {
    this.setState({ message: e.target.value });
    console.log('test')

  }

  createAccount = () => {
    
    this.props.createAccount(this.state.email, '12312312');
  }

  createNameForAccount = (e) => {
    this.setState({email: e.target.value });
  }

  showCurrentUser = () => {

  }
  render(){
    console.log(this.props.groupStatus ? this.props.groupStatus.groups : []);
    const messages = this.props.groupStatus ? this.props.groupStatus.groups
    // .reverse()
    .map(m => (
      <li key={m.key} className="message"><span className="name">{m.name}</span> : <span className="m">{m.message}</span></li>
    )) : [];
    return(
      <div className="mainContainer">
        <div className="registration" style={{padding: '20px'}}>
        <input onChange={this.createNameForAccount} />
        <button onClick={this.createAccount}>CREATE ACCOUNT</button>
        <div style={{ color: 'green' }}>{this.props.auth.pending ? 'Loading...' : ''}</div>
        <div style={{ color: 'green' }}>{this.props.auth.success ? 'Account was created!!!!!' : ''}</div>
        <div style={{ color: 'red' }}>{this.props.auth.rejected ? 'Error on server' : ''}</div>
      </div>
      <div>{!localStorage.getItem('userName') ?  'You are not loged in' : "Welcome to Los Kaparos " +  localStorage.getItem('userName')}</div>
      <div className="chatWindow">
        <div className="messages">
        <ul>
          { this.props.groupStatus.pending ? <img src="https://media.giphy.com/media/xT9DPldJHzZKtOnEn6/giphy.gif" /> : messages }
        </ul>
        </div>
          <form onSubmit={this.sendMessage}>
            <input value={this.state.message} onChange={this.getMessage} />
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
      return {
          groupStatus: state.groupReducer,
          auth: state.authReducer
      }
  }

const  mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: bindActionCreators(getAllGroups, dispatch),
    sendMessage: bindActionCreators(sendMessage, dispatch),
    createAccount: bindActionCreators(createAccount, dispatch)
  }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Home);