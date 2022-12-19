import { Redirect } from "react-router-dom";

import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'reactstrap';
import axios from 'axios';

import logo_phrase from '../Images/Group8766.png';
import black_logo from '../Images/blacklogo.png';





class Login extends React.Component{
  constructor(props){
    super(props);
    this.server_link = process.env.REACT_APP_SERVER_LINK || 'http://20.24.190.187:3001'
    this.state = {
      username: "",
      password: "",
      login: false
    }  
  }




  onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(this.server_link + '/user/register', {
        username: this.state.username,
        password: this.state.password,
        });
        console.log(response);
        this.setState({login: true});
        this.props.setLog(true);
        alert("Successful!");
    } catch(e){
        console.log(e);
        alert("Failed")
    }
    //Implement automatic login here
  }
      


  render(){
  if (this.state.login == true){
    return <Redirect to={{ pathname: '/login' }} />
  }
  return (
    <div className='default_font'>
      <div>
        <Container>
          <Row>
            <Col id='' className='center'
            style={{
              paddingTop:'4%',
              paddingLeft: '15%'
            }}>
              <img id="RedLogo" src={logo_phrase} alt="VBC logo" style={{width: '80%'}}/>
            </Col>
            <Col id='BlackLogo' className='right' style={{
              paddingTop:'4%',
              paddingRight: '15%'
            }}>
              <img src={black_logo} alt="Black logo" style={{width: '50%'}}/>
            </Col>
          </Row>
        </Container>
      </div>
     

      <div className='body' >
          <form className='mb-3' onSubmit = {this.onSubmit}>
            
                <Container>
                  <Row>
                    <Col
                        lg='2'
                        md='2'
                        sm='1'
                    ></Col>
                    
                    <Col 
                    lg='8'
                    md='8'
                    sm='10'
                    className='mainBox blurBox'
                    style={{display: 'flex', justifyContent: 'center'}}>
                      <div className='inputBox'>
                        <div style={{width: '100%', height: '40%'}}>
                          <h5> Username: </h5>
                          <input type="text" placeholder='Username'
                            value= {this.state.username}
                            onChange = {(event) => {
                                this.setState({username: event.target.value})
                            }}
                            style = {{width: '100%', height: '55px'}}
                            className = 'large_input'/>
                        </div>
                        <div style={{width: '100%', height: '40%'}}>
                          <h5> Password: </h5>
                          <input type="password" placeholder='Password'
                            value = {this.state.password}
                            onChange = {(event) => {
                              this.setState({
                                password: event.target.value
                              });
                            }}
                            style = {{width: '100%', height: '55px'}} 
                            className ='large_input'/>
                        </div>
                        <br/>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button type='submit' className="submit_bar"> Register </button> 
                        </div>
                      </div>
                    </Col>
                    
                    <Col
                    lg='2'
                    md='2'
                    sm='1'
                    ></Col>
                  </Row>
                </Container>

                
            
          </form>
        </div>
        
    </div>
  );
  }
}

export default Login;