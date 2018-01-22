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
      test: 'asd',
      accountColor: 'black'
    }
  }

  scrollToBottom = () => {
    const scrollHeight =  this.overFlowArea.scrollHeight;
    const height =  this.overFlowArea.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.overFlowArea.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentWillMount() {
    this.props.getAllGroups();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMessage = (e) => {
      e.preventDefault();
      if (!localStorage.getItem('userName') && this.state.message.length < 0) {
          console.log('please log in');
      } else {
        this.props.sendMessage(this.state.message, this.state.accountColor);
        this.setState({ message: '' });
        // this.overFlowArea.scrollTo(0, this.overFlowArea.scrollHeight);
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

  generateRandomColor = () => {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
   
      this.setState({ accountColor: color });
      console.log(this.state.accountColor);
      

  }
  render(){
    // this.overFlowArea.scrollTo(0, this.overFlowArea.scrollHeight);
    // console.log(this.props.groupStatus ? this.props.groupStatus.groups : []);
    const messages = this.props.groupStatus ? this.props.groupStatus.groups
    // .reverse()
    .map(m => (
      <li key={m.key} className="message"><span style={{color: m.accountColor ? m.accountColor : 'lightgreen'}} className="name">{m.name.split("@")[0]}</span> : <span style={{background: m.accountColor ? m.accountColor : 'lightgreen'}}  className="m">{m.message}</span></li>
    )) : [];
    return(
      <div className="mainContainer">
        
        
      <div className="globalConteiner">
        <div 
        className="sideMenu item">
        <div>
           
          <button style={{ background: this.state.accountColor, color: "#fff" }} onClick={this.generateRandomColor}>GENERATE RANDOM COLOR TO YOUR MESSAGE</button>
        </div>
          </div>
        <div 
        className="chatWindow item">
          <div ref={(elem) => { this.overFlowArea = elem; }} className="messages">
          <ul>
            { this.props.groupStatus.pending ? <img src="https://media.giphy.com/media/xT9DPldJHzZKtOnEn6/giphy.gif" /> : messages }
          </ul>
          </div>
          <form onSubmit={this.sendMessage}>
              <input placeholder="Message: " value={this.state.message} onChange={this.getMessage} />
            </form>
          </div>
        </div>




        <div className="registration" style={{padding: '20px'}}>
          <input onChange={this.createNameForAccount} />
          <button onClick={this.createAccount}>CREATE ACCOUNT</button>
          <div style={{ color: 'green' }}>{this.props.auth.pending ? 'Loading...' : ''}</div>
          <div style={{ color: 'green' }}>{this.props.auth.success ? 'Account was created!!!!!' : ''}</div>
          <div style={{ color: 'red' }}>{this.props.auth.rejected ? 'Error on server' : ''}</div>
      </div>
      <div>{!localStorage.getItem('userName') ?  'You are not loged in' : "Welcome to Los Kaparos " +  localStorage.getItem('userName')}</div>
      
      

        
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