import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



import logo_phrase from '../Images/Group8766.png';
import black_logo from '../Images/blacklogo.png';






class Login extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      username: "",
      password: "",
      login: false
    }  
  }


  async componentDidMount(){
    try {
      const token = localStorage.getItem("token");
      const decode_name = (await axios.post('http://localhost:3000/user/validate_token', {token})).data;
      console.log(decode_name);
      const username = localStorage.getItem("username");
      console.log(username);
      if (username == decode_name){
          this.props.setLog(true)
          this.setState({login: true})
      }
    } catch(e){
      console.log("ERROR:", e);
      this.props.setLog(false)
    }
  }



  onSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/user/login', {
        username: this.state.username,
        password: this.state.password
      });
      const token = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", this.state.username);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      console.log(response);
      this.props.setLog(true)
      this.setState({login: true})
      return true
    } catch(e){
      console.log(e)
      alert("Invalid username or password");
      return false
    }
  }
      


  render(){
  if (this.state.login == true || window.ethereum !== undefined){
    console.log("Redirect")
    return(
      <Redirect to={{ pathname: '/' }} />
    )
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
                        <div className='sep_bottom' style={{width: '100%', height: '40%'}}>
                          <h5> Username: </h5>
                          <input type="text" placeholder='Username'
                            value= {this.state.username}
                            onChange = {(event) => {
                                this.setState({username: event.target.value})
                            }}
                            style = {{width: '100%', height: '55px'}}
                            className = 'large_input'/>
                        </div>
                        <div className='sep_bottom' style={{width: '100%', height: '40%'}}>
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
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button type='submit' className="submit_bar"> Login </button> 
                        </div>
                        <br/>
                        <div className='center'> 
                          <a href="/register"> Don't have an account? Register </a>
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