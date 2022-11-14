import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'reactstrap';
import {Redirect} from 'react-router-dom';

import SubmitButton from './Button';


import logo_phrase from './Images/Group8766.png';
import black_logo from './Images/blacklogo.png';
import convert from './Images/Convert.png';

import axios from 'axios';
import BN from 'bignumber.js';

import create_user from './web3';
import bridge_abi from './bridge_abi';
import user_abi from './user_abi';

const {ERC20_UserAbi, ERC721_UserAbi, ERC20_UserAddress, ERC721_UserAddress} = user_abi;
const {ERC20_BridgeAbi, ERC20_BridgeAddress, ERC721_BridgeAbi, ERC721_BridgeAddress} = bridge_abi;
let user
try{
  user = create_user()
} catch(e){
  console.log(e);
  user = null
}


class Main extends React.Component{
  constructor(props){
    super(props);
    this.base = "https://explorer.vbchain.vn/";
    
    this.state = {
      message: '',
      success_link: "",
      purpose: 'Deposit',
      from_network: "MBC",
      user: user,
      sender_address: '0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758',
      to_network: "AGD",
      receiver_address: '0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758',
      amountDisplay: "",
      amount: "",
      to_balance: "",
      from_balance: "",
      max_approved: "",
      token_id: "",
      token_ids_arr: [],
      currency: 'MBC Native',
      power_native_to_virtual: 0,
      load: true,
      success: true,
      TxId: "",
      login: this.props.login
    }  
  }

  
  componentDidMount(){
    if (this.state.user == null){
      setTimeout(this.Log_out, 7200000);
    }
  }

  //LOGIN CODE
  Log_out = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("token", "");
    this.setState({
      login: false
    });
  }


  ERC20_lockToken = async () => {
    //Processing locked token
    const response = await axios.post('http://localhost:3000/api/ERC20/lock', {
      username: localStorage.getItem("username"),
      bridge_name: this.state.from_network,
      amount: this.state.amount,
      to: this.state.receiver_address
    })
    console.log(response);
    return response;
  }

  ERC20_unlockToken = async() => {   
    //Need admin permission
    const response = await axios.post('http://localhost:3000/api/ERC20/unlock', {
      username: localStorage.getItem("username"),
      bridge_name: this.state.to_network,
      amount: this.state.amount,
      from: this.state.sender_address
    })
    console.log(response);
    return response;
  }

  ERC20_receiveNative = async() => {   
    //Lock native
    const response = await axios.post('http://localhost:3000/api/ERC20/receive_native', {
      username: localStorage.getItem("username"),
      bridge_name: this.state.from_network,
      amount: this.state.amount,
      to: this.state.receiver_address
    })
    console.log(response);
    return response;
  }

  ERC20_transferNative = async() => {   
    //Unlock native
    const response = await axios.post('http://localhost:3000/api/ERC20/transfer_native', {
      username: localStorage.getItem("username"),
      bridge_name: this.state.to_network,
      amount: this.state.amount,
      from: this.state.sender_address
    })
    console.log(response);
    return response;
  }

  ERC721_lockMulti = async() => {   
    //Lock ERC721 (Approve at backend)
    const response = await axios.post('http://localhost:3000/api/ERC721/lock_multi', {
      username: localStorage.getItem("username"),
      bridge_name: this.state.from_network,
      tokenIds: this.state.token_ids_arr,
      to: this.state.receiver_address
    })
    console.log(response);
    return response;
  }

  ERC721_unlockMulti = async() => {   
    //Unlock ERC721
    const response = await axios.post('http://localhost:3000/api/ERC721/unlock_multi', {
      username: localStorage.getItem("username"),
      bridge_name: this.state.to_network,
      tokenIds: this.state.token_ids_arr,
      from: this.state.sender_address
    })
    console.log(response);
    return response;
  }



  BE_onSubmit = async () => {
    let method;
    let message;
    let bridge;
    if (this.state.purpose == "Deposit"){
      bridge = this.state.from_network;
      if (this.state.currency == "MBC Native" || this.state.currency == "AGD Native"){
        method = this.ERC20_receiveNative;
        message = "Unable to transfer native";
      } else {
        if(this.state.currency == "ERC721 token"){
          method = this.ERC721_lockMulti;
          message = "Unable to lock ERC721 token"
        } else {
          method = this.ERC20_lockToken;
          message = "Unable to lock ERC20 token"
        }
      }
    } else {
      bridge = this.state.to_network;
      if (this.state.purpose == "Draw"){
        if (this.state.currency == "MBC Native" || this.state.currency == "AGD Native"){
          method = this.ERC20_transferNative;
          message = "Unable to transfer native";
        } else {
          if(this.state.currency == "ERC721 token"){
            method = this.ERC721_unlockMulti;
            message = "Unable to unlock ERC721 token"
          } else {
            method = this.ERC20_unlockToken;
            message = "Unable to unlock ERC20 token"
          }
        }
      }
    }
    
    try{
      const result = await method();
      console.log(result);
      const TxId = result.data.transactionHash;
      console.log(bridge);
      this.setState({
        message: "Successful",
        load: false,
        success: true,
        TxId,
        success_link: this.base + bridge.toLowerCase() + '/tx/' + TxId
      });
      console.log(this.state.success_link);
      let is_native = false;
      if (this.state.currency == "MBC Native" || this.state.currency == "AGD Native"){
        if (this.state.purpose == "Draw"){
          is_native = true;
        } else {
          is_native = false;
        }  
      }
      if (this.state.currency !== "ERC721 token"){
        const from_balance_num = await this.getBalance(this.state.sender_address, this.state.from_network);
        const to_balance_num = await this.getBalance(this.state.receiver_address, this.state.to_network);
        const approved_num = (await axios.post("http://localhost:3000/api/ERC20/getApproved", {
          from: this.state.sender_address,
          to: this.state.receiver_address,
          is_native,
          to_network: this.state.to_network
        })).data;
        this.setState({
          from_balance: from_balance_num,
          to_balance: to_balance_num,
          max_approved: approved_num
        }); 
      }
      return true
    }
    catch(e){
      console.log(e);
      this.setState({
        message: message,
        load: false,
        success: false
    });
      return false;
    }
   
  }

  //Without login
  //FROM
  FE_ERC20_lockToken = async(web3, user_contract, bridge_contract, signature) => {
    const allowance = await user_contract.methods.allowance(this.state.sender_address, ERC20_BridgeAddress).call({from: this.state.sender_address});
    if (!web3.utils.toBN(this.state.amount).sub(web3.utils.toBN(allowance)).isNeg()){
      await user_contract.methods.increaseAllowance(ERC20_BridgeAddress, web3.utils.toBN(this.state.amount).sub(web3.utils.toBN(allowance))).send({from: this.state.sender_address, gas: '8000000'});
    }
    const receipt = await bridge_contract.methods
    .lock(ERC20_UserAddress, this.state.amount, this.state.receiver_address)
    .send({from: this.state.sender_address, gas: '8000000'});
    return receipt
  }
  //TO
  FE_ERC20_unlockToken = async(web3, user_contract, bridge_contract, signature) => {
    const receipt = await bridge_contract.methods
                  .unlock(this.state.sender_address, ERC20_UserAddress, this.state.amount, signature)
                  .send({from: this.state.receiver_address, gas: '8000000'});
    return receipt
  }
  //FROM
  FE_ERC20_receiveNative = async(web3, user_contract, bridge_contract, signature) => {
    const receipt = await bridge_contract.methods
                  .receive_native(this.state.receiver_address)
                  .send({from: this.state.sender_address, gas: '8000000', value: this.state.amount});
    return receipt
  }
  //TO
  FE_ERC20_transferNative = async(web3, user_contract, bridge_contract, signature) => {
    const receipt = await bridge_contract.methods
                  .transfer_native(this.state.sender_address, this.state.amount, signature)
                  .send({from: this.state.receiver_address, gas: '8000000'});
    return receipt
  }

  //FROM
  FE_ERC721_lockMulti = async(web3, user_contract, bridge_contract, signature) => {
    await user_contract.methods.setApprovalForAll(ERC20_BridgeAddress, true).send({from: this.state.sender_address, gas: '8000000'});
    const receipt = await bridge_contract.methods
                  .lock_multiples(this.state.token_ids_arr, ERC721_UserAddress, this.state.receiver_address)
                  .send({from: this.state.sender_address, gas: '8000000'});
    return receipt
  }

  //TO
  FE_ERC721_unlockMulti = async(web3, user_contract, bridge_contract, signature) => {
    const token_uris_arr = (await axios.post("http://localhost:3000/api/ERC721/get_URIs", {
      bridge_name: this.state.from_network,
      tokenIds: this.state.token_ids_arr
    })).data
    console.log(token_uris_arr)
    const receipt = await bridge_contract.methods
                  .unlock_multiples(this.state.sender_address, this.state.token_ids_arr, token_uris_arr, ERC721_UserAddress, signature)
                  .send({from: this.state.receiver_address, gas: '8000000'});
    return receipt
  }

  FE_onSubmit = async () => {
    let method;
    let message;
    let bridge_contract;
    let user_contract;
    let transact_sender;
    let bridge;
    let signature = null;
    let is_native;

    
    try{

      if (this.state.currency == "MBC Native" || this.state.currency == "AGD Native"){
        if (this.state.purpose == "Draw"){
          is_native = true;
        } else {
          is_native = false;
        }  
      } else {
        if (this.state.purpose == "Draw"){
          is_native = false;
        } else {
          is_native = true;
        }  
      }

    if (this.state.purpose == "Deposit"){
      bridge = this.state.from_network
      transact_sender = this.state.sender_address;
      if (this.state.currency == "MBC Native" || this.state.currency == "AGD Native"){
        method = this.FE_ERC20_receiveNative;
        message = "Unable to transfer native";
      } else {
        if(this.state.currency == "ERC721 token"){
          method = this.FE_ERC721_lockMulti;
          message = "Unable to lock ERC721 token"
        } else {
          method = this.FE_ERC20_lockToken;
          message = "Unable to lock ERC20 token"
        }
      }
    } else {
      bridge = this.state.to_network;
      transact_sender = this.state.receiver_address;



      if (this.state.currency == "MBC Native" || this.state.currency == "AGD Native"){
        method = this.FE_ERC20_transferNative;
        message = "Unable to transfer native";
      } else {
        if(this.state.currency == "ERC721 token"){
          method = this.FE_ERC721_unlockMulti;
          message = "Unable to unlock ERC721 token";
          
        } else {
          method = this.FE_ERC20_unlockToken;
          message = "Unable to unlock ERC20 token";
          
        }
      }

      
      if(this.state.currency == "ERC721 token"){
        signature = (await axios.post("http://localhost:3000/api/signature", {
            from: this.state.sender_address,
            to: this.state.receiver_address,
            to_network: this.state.to_network,
            tokenIds: this.state.token_ids_arr,
            is_NFT: true
          })).data;
      } else {
        signature = (await axios.post("http://localhost:3000/api/signature", {
            from: this.state.sender_address,
            to: this.state.receiver_address,
            to_network: this.state.to_network,
            amount: this.state.amount,
            is_native: is_native,
            is_NFT: false
          })).data;
      }
      
    }

    if (this.state.currency === "ERC721 token"){
      bridge_contract = await new this.state.user.eth.Contract(ERC721_BridgeAbi, ERC721_BridgeAddress);
      user_contract = await new this.state.user.eth.Contract(ERC721_UserAbi, ERC721_UserAddress);
    } else {
      bridge_contract = await new this.state.user.eth.Contract(ERC20_BridgeAbi, ERC20_BridgeAddress);
      user_contract = await new this.state.user.eth.Contract(ERC20_UserAbi, ERC20_UserAddress);
    }
    
  
      const result = await method(this.state.user, user_contract, bridge_contract, signature);
      console.log(result);
      console.log(bridge)
      const TxId = result.transactionHash;
      this.setState({
        message: "Successful",
        load: false,
        success: true,
        TxId,
        success_link: this.base + bridge.toLowerCase() + '/tx/' + TxId
      });
      console.log(this.state.success_link);
      if (this.state.currency !== "ERC721 token"){
        const from_balance_num = await this.getBalance(this.state.sender_address, this.state.from_network);
        const to_balance_num = await this.getBalance(this.state.receiver_address, this.state.to_network);
        const approved_num = (await axios.post("http://localhost:3000/api/ERC20/getApproved", {
          from: this.state.sender_address,
          to: this.state.receiver_address,
          is_native: is_native,
          to_network: this.state.to_network
        })).data
        this.setState({
          from_balance: from_balance_num,
          to_balance: to_balance_num,
          max_approved: approved_num
        }); 
      } 
      return true
    }
    catch(e){
      console.log(e);
      this.setState({
        message: message,
        load: false,
        success: false
    });
      return false;
    }
   
  }


  //Common Function

  getBalance = async (address, bridge_name) => {
    const balance = (await axios.post('http://localhost:3000/api/ERC20/getBalance', {
      bridge_name,
      address
  })).data.toString();
    console.log(balance);
    return(balance);
  }
      
  suitable_input(currency){
    if(currency == "ERC721 token"){
      return(
        <div>
          <div className='sep_bottom'>
            <p> Token Id </p>
            <input type="text" placeholder='Token ids [ ]'
              value = {this.state.token_id}
              onChange = {async (event) => {
                await this.setState({token_id: event.target.value});
                const token_ids_text = this.state.token_id.split(", ");
                const token_ids_arr = token_ids_text.map((value) => {return parseInt(value)});
                await this.setState({token_ids_arr});
                console.log(this.state.token_ids_arr)
              }}
              className ='large_input'/>
          </div>
          {/* <div className='sep_bottom'>
            <p> Token URIs </p>
            <input type="text" placeholder='Token URIs [ ]'
              value = {this.state.token_uri}
              onChange = {async (event) => {
                await this.setState({token_uri: event.target.value});
                await this.setState({token_uris_arr: this.state.token_uri.split(", ")});
                console.log(this.state.token_uris_arr)
              }} 
              className ='large_input'/>
          </div> */}
        </div>
      )
    } else {
      return(
        <div>
          <div className='sep_bottom'>
            <p> Amount in Ether: </p>
            <input type="text" placeholder='Amount in Ether'
              value = {this.state.amountDisplay}
              onChange = {(event) => {
                const amount = new BN("0" + event.target.value);
                const convert = (new BN("10")).pow("18");
                const converted = (amount.times(convert)).toString();
                console.log(converted);
                this.setState({
                  amountDisplay: event.target.value,
                  amount: converted
                });
              }} 
              className ='large_input'/>
          </div>
          <div className='sep_bottom'>
            <p> 1 Virtual Coin = 1 Native Coin </p>
          </div>
        </div>
      )
    }
  }

  check = async () => {
    const chain_id = await window.ethereum.request({method: "eth_chainId"});
    if (chain_id == "4444"){
      if (this.state.currency !== "MBC Native" || this.state.currency !== "VAGD"){
        return false
      }
      if (this.state.purpose == "Draw"){
        if (this.state.to_network == "AGD"){
          alert("Wrong network");
          return false
        }
      } else {
        if (this.state.from_network == "AGD"){
          alert("Wrong network");
          return false
        }
      }
      return true
    } else {
      if (chain_id == "8888"){
        if (this.state.currency !== "AGD Native" || this.state.currency !== "VMBC"){
          return false
        }
        if (this.state.purpose == "Draw"){
          if (this.state.to_network == "MBC"){
            alert("Wrong network");
            return false
          }
        } else {
          if (this.state.from_network == "MBC"){
            alert("Wrong network");
            return false
          }
        }
        return true
      } else {
        return false
      }
    }
  }

  onSubmit = async(e) => {
    e.preventDefault();
    this.setState({load: true});
    if (this.state.user !== null){
      await this.FE_onSubmit()
    } else {
      await this.BE_onSubmit()
    }
  }

  render(){
  if (this.state.user == null){
    if (this.state.login == false){
      return <Redirect to={{pathname: '/login'}}/>
    }
  };

  console.log(window.ethereum);

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
                  <div className='mainBox'>
                  <Row style={{
                    display: 'flex',
                    justifyContent: 'center'}} className='blurBox'>
                    <Col
                      lg='5'
                      md='5' 
                      sm='10'
                      style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <div className='image'></div>
                    </Col>
                    <Col
                      lg='7'
                      md='7' 
                      sm='10'
                      style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <div className='inputBox'>
                        <div className='sep_bottom'>
                          <p> Transfer: </p>
                          <div className='large_div newArrow'>
                            <select 
                              value={this.state.currency}
                              onChange={(event) => {
                                this.setState({currency: event.target.value});
                              }}
                              className="large_input_transparent">
                              <option value= "AGD Native"> AGD Native </option>
                              <option value= "MBC Native"> MBC Native </option>
                              <option value="VAGD"> VAGD </option>
                              <option value="VMBC"> VMBC </option>
                              <option value="ERC721 token"> ERC721 token</option>
                            </select>
                          </div>
                        </div>
                        <div className='sep_bottom'>
                          <p> Deposit or Draw: </p>
                          <div className='large_div newArrow'>
                            <select 
                              value={this.state.purpose}
                              onChange={event => this.setState({purpose: event.target.value})}
                              className="large_input_transparent">
                              <option value="Deposit"> Deposit </option>
                              <option value="Draw"> Draw </option>
                            </select>
                          </div>
                        </div>
                        {this.suitable_input(this.state.currency)}
                      </div>
                    </Col>
                  </Row>
                  </div>
                </Container>
            
            <div>
              <br />
              <br />
              <br />
            </div>

            <Container>
              <Row style={{
                display: 'flex',
                justifyContent: 'center',
              }} className='outerSubBox'>
                <Col 
                lg='5'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
              }}>
                  <div className='subBox subContent blurBox'>
                    <div>
                      <p>From:</p>
                      <p>Token Balance: {this.state.from_balance}</p>
                      <p> Max Approved: N/A </p>
                      <div className='small_div newArrow center'>
                        <select 
                          value={this.state.from_network}
                          onChange={(event) => {
                            this.setState({from_network: event.target.value});
                            if (event.target.value == "MBC"){
                              this.setState({to_network: "AGD"
                            });
                            } else {
                              this.setState({to_network: "MBC"
                            });
                            }
                          }}
                          className="small_input_transparent">
                          <option value='MBC'> MBC </option>
                          <option value='AGD'> AGD </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <input type="text" placeholder='Sender address'
                        value = {this.state.sender_address}
                        onChange = {event => this.setState({sender_address: event.target.value.trim()})} 
                        className ='small_input'/>
                    </div>
                  </div>                    
                </Col>

                <Col 
                lg='2'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                  }}>
                  <div style={{
                    width: '80px',
                    display: 'flex',
                    justifyContent: 'center'
                    }}>
                    <br/>
                    <img src={convert} alt="" style={{
                      width: '100%',
                      height: 'auto'
                      }} />
                    <br/>
                    <br/>
                  </div>
                </Col>

                <Col 
                lg='5'
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <div className='subBox subContent blurBox'>
                    <div>
                      <p>To: </p>
                      <p>Token Balance: {this.state.to_balance}</p>
                      <p>Max approved: {this.state.max_approved}</p>
                      <div className='small_div newArrow center'>
                        <select value={this.state.to_network} className='small_input_transparent'>
                          <option> {this.state.to_network} </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <input type="text" placeholder='Receiver address'
                        value = {this.state.receiver_address}
                        onChange = {event => this.setState({receiver_address: event.target.value.trim()})} 
                        className ='small_input'/>
                    </div>
                  </div>  
                </Col>
              </Row>
            </Container>

            <div>
              <br />
              <br />
            </div>

            <Container>
              <Row>
                <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SubmitButton load={this.state.load} success={this.state.success} button={this.state.button} success_link={this.state.success_link}/>
                </Col>
              </Row>
            </Container>
            <br />
            <br />
            <div className='center'>
              <br />
              <br />
              <p> TxId: {this.state.TxId}</p>
            </div>
            <div className='note'>
              <div style={{fontSize: '14px'}} className='center'>
                <p>Copyright © 2022 Vietnam Blockchain Corporation All rights reserved</p>
              </div>
              <div style={{fontSize: '12px'}} className='center'>
                <p>Version: 1.3.7</p>
              </div>
            </div>
            
            
          </form>
          <h3> {this.state.message} </h3>
        </div>
        
    </div>
  );
  }
}

export default Main;