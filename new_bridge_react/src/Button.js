import React from 'react';
import './App.css';
import Icon from './Images/icon.png';
import ErrorIcon from './Images/error_icon.png';
import { Container, Row, Col} from 'reactstrap';

class SubmitButton extends React.Component{

    render(){
        if (this.props.load === true){
            return (<button type='submit' className="submit_bar"> Convert </button>)      
        } else {
            if (this.props.success === true)
            {
                return <div>
                    <button type='submit' className="submit_bar_success bar_width"> 
                        <Container>
                            <Row>
                                <Col
                                lg='1'
                                md='1'
                                sm='2'
                                xs='2'
                                className='center'>
                                    <img src={Icon} alt="Icon"/>
                                </Col>
                                <Col
                                id="btnStatus"
                                className='left'>
                                    Success!
                                </Col>
                                <Col
                                lg='4'
                                md='4'
                                sm='6'
                                xs='6'
                                className='right' style={{textDecorationLine: 'underline'}}>
                                    Convert More!
                                </Col>
                            </Row>
                        </Container>
                    </button>
                    <div className='center verified'>
                        <br/>
                        <a href={this.props.success_link}> Verified by Blockchain</a>
                    </div>
                </div>
            } else {
                return <button type='submit' className="submit_bar_error bar_width"> 
                        <Container>
                            <Row>
                                <Col
                                lg='1'
                                md='1'
                                sm='2'
                                xs='2'
                                className='center'>
                                    <img src={ErrorIcon} alt="Icon"/>
                                </Col>
                                <Col
                                id="btnStatus"
                                className='left'>
                                    Error!
                                </Col>
                                <Col
                                lg='3'
                                md='3'
                                sm='6'
                                xs='6'
                                className='right' style={{textDecorationLine: 'underline'}}>
                                    Try again!
                                </Col>
                            </Row>
                        </Container>
                    </button>
                
            }
        }
    }
}

export default SubmitButton