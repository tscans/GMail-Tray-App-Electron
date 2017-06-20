import React, { Component } from "react";
import {ipcRenderer} from "electron";

class App extends Component {
  state = {
    currentEmail: "",
    currentPassword: ""
  }
  setEmail(){
    this.setState({
      currentEmail: document.getElementById("email").value,
      currentPassword: document.getElementById("password").value
    })
  }
  signOut(){
    this.setState({currentEmail: "",currentPassword: ""})
  }
  submitEmail(){
    var email = this.state.currentEmail;
    var password = this.state.currentPassword;
    var subject = document.getElementById("subject").value;
    var body = document.getElementById("body").value;
    var recipient = document.getElementById("towhom").value;
    var value = {
      email: email,
      password: password,
      subject: subject,
      body: body,
      recipient: recipient
    }
    ipcRenderer.send('email:send',value);
    document.getElementById("subject").value = "";
    document.getElementById("body").value = "";
    document.getElementById("towhom").value = "";
  }
  renderLoggedIn(){
    return(
      <div>
        <div style={{marginLeft: 10,marginRight: 10}}>
          <div className="input-field col s6">
            <input placeholder="Email Recipient" id="towhom" type="text"/>
          </div>
          <div className="input-field col s6">
            <input placeholder="Subject" id="subject" type="text"/>
          </div>
          <div class="input-field col s12">
            <textarea id="body" placeholder="Body" className="materialize-textarea"></textarea>
          </div>
          <button name="action" className="btn waves-effect waves-light" onClick={this.submitEmail.bind(this)}>Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    )
  }
  renderLogIn(){
    return(
      <div style={{marginLeft: 10,marginRight: 10}}>
        <div className="input-field col s6">
          <input placeholder="GMail Account" id="email" type="text" className="validate"/>
        </div>
        <div className="input-field col s6">
          <input placeholder="Password" id="password" type="password" className="validate"/>
        </div>
        <button onClick={this.setEmail.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    )
  }
  renderSection(){
    console.log(this.state.currentEmail)
    if(this.state.currentEmail === ""){
      return(this.renderLogIn())
    }
    else{
      return(this.renderLoggedIn())
    }
  }
  render(){
    return(
      <div className="window">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="center" onClick={this.signOut.bind(this)}>{this.state.currentEmail == ""?"Sign In":this.state.currentEmail}</a>
          </div>
        </nav>
        {this.renderSection()}
      </div>
    )
  }  
}

export default App;
