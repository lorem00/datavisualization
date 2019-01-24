import React from 'react';
import { Form,FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Grid, Row, Col, Button, Checkbox,Glyphicon, Nav, NavDropdown, MenuItem, NavItem, DropdownButton } from 'react-bootstrap';
export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          name:'John Smith',
          role:'Admin',
          email:'john.smith@woot.com',
          accountId:'342989',
          accountName:'jSmith',
          fullName:'John Smith JR.',
          address:'2250 Gateway Pl ',
          city:'San Jose',
          zip:'95332',
          country:'US',
          phone:'111-111-1111',
          company:'ABC',
          url:'www.google.com',
          editDisabled:true
      }


  }

  editProfile(){
      this.setState({editDisabled:false});
  }
  saveProfile(){
      this.setState({editDisabled:true});
      console.log(this.state);
  }
  cancelSaveProfile(){
      this.setState({editDisabled:true});
  }
  handleChange (event) {
    console.log(event.target.value);

    this.setState({ value: event.target.value });
    console.log(this.state);
  }

  render() {
    return (
    <div>
      <div className="profile-header">
      <Row>
        <Col sm={10} md={10} lg={10}>
        <span className="profile-title">{this.state.name}</span>
        </Col>
        <Col sm={2} md={2} lg={2}>
          <button  className="btn btn-default btn-block" onClick={this.editProfile.bind(this)}>EDIT
          </button>
        </Col>
      </Row>

      </div>
      <div className="profile-container">
      <Row>
        <Col sm={3} md={3} lg={3}>
          <div className="profile-img">
            <img src={require('./../../assets/images/empty_profile.png')} alt=""/>
          </div>
        </Col>
        <Col sm={9} md={9} lg={9}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Role
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Role"  value={this.state.role}  disabled/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2} >
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" value={this.state.email} disabled/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Account ID
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Account ID"  value={this.state.accountId} disabled />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Account Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Account Name" value={this.state.accountName} onChange={this.handleChange}  disabled={this.state.editDisabled}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Full Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Full Name" value={this.state.fullName} onChange={this.handleChange} disabled={this.state.editDisabled} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Address
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Address"  value={this.state.address} onChange={this.handleChange} disabled={this.state.editDisabled}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              City
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="City"  value={this.state.city} onChange={this.handleChange} disabled={this.state.editDisabled}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Zip
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Zip" value={this.state.zip} onChange={this.handleChange} disabled={this.state.editDisabled} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Country
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Country" value={this.state.country} onChange={this.handleChange} disabled={this.state.editDisabled}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Company
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Company" value={this.state.company} onChange={this.handleChange} disabled={this.state.editDisabled} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              URL
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="URL" value={this.state.url} onChange={this.handleChange} disabled={this.state.editDisabled} />
            </Col>
          </FormGroup>
        </Form>
        </Col>
      </Row>
      <Row>
        <Col sm={8} md={8} lg={8}>
        </Col>
        <Col sm={2} md={2} lg={2}>
        <button  className="btn btn-primary btn-block" disabled={this.state.editDisabled}  onClick={this.saveProfile.bind(this)}>SAVE
        </button>
        </Col>
        <Col sm={2} md={2} lg={2}>
        <button  className="btn btn-default btn-block" disabled={this.state.editDisabled}  onClick={this.cancelSaveProfile.bind(this)}>CANCEL
        </button>
        </Col>
      </Row>
      </div>
  </div>
    );
  }

}
