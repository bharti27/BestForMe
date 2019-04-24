import React, { Component } from 'react';
import M from "materialize-css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import ColorPicker from 'material-ui-color-picker'


function basicInfo(){
  return(
    <form>
      <label>
        First Name:
        <input type="text" name="firstName" />
      </label>
      <label>
       Last Name:
        <input type="text" name="lastName" />
      </label>
      <label>
        Age:
        <input type="number" name="age" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
    </form>
  )
}

function mediaTypes(){
  // return(
  //   <form>
  //       <label>
  //         Music
  //         <input
  //           name="Music"
  //           type="checkbox"
  //
  //           onClick={this.handleClick}
  //            />
  //       </label>
  //       </form>
  // )

  }


function genre(){
  //return(
  //check box to pick genre
  //)
}

function interests(){
  //return(
    //check box for interests
  //)
}

function color(){
  return(
    <ColorPicker
    name='color'
    defaultValue='#000'
    // value={this.state.color} - for controlled component
    onChange={color => console.log(color)}

  />
  )

}

function getSteps() {
  return ['Basic Information', 'Media Types', 'Genre', 'Interests', 'Color'];
}

function getStepContent(step) {
  switch (step) {
   case 0:
      return basicInfo();
   case 1:
      return mediaTypes();
   case 2:
      return genre();
   case 3:
      return interests();
   case 4:
     return color();
  default:
    return 'unknown step';
  }
}

export class Registration extends Component {
  constructor( props ) {
      super( props );
      this.state = {
        activeStep: 0,
        firstName: '',
        lastName: '',
        password: '',
        age: '',
        interestList: [],
        mediaType: [],
        primaryColor: '',
        secondaryColor: ''
      };

  }

   // handleClick = () => {
   //    //this.setState({state.interestList: [Music]});
   //    this.setState(state => ({
   //      interestList: state.interestList[0] = [music],
   //    }));
   // };

    handleNext = () => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    };

    handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };

    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
      const M = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;

      return (
      <div className= "stepperComp">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
              {getStepContent(index)}
                <div className= "stepperActions">
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={M.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={M.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
            window.location.href = '/dashboard'
        )}
      </div>
    );

    }
}
export default Registration;
