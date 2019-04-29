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

export class Registration extends Component {

  constructor( props ) {
      super( props );
      this.state = {
        activeStep: 0,
        firstName: '',
        lastName: '',
        password: '',
        age: '',
        interestList: null,
        mediaType: null,
        genreList: null,
        color: ''
      };
  }

  mediaTypes(){
    return(
      <form>
          <label>
            <h6>Music</h6>
            <Checkbox
              name="Music"
              type="checkbox"
              onClick={this.handleChangeMus}
               />
          </label>
          <label>
            <h6>Books</h6>
            <Checkbox
              name="Books"
              type="checkbox"
              onClick={this.handleChangeBook}
               />
          </label>
          <label>
            <h6>Movies</h6>
            <Checkbox
              name="Movies"
              type="checkbox"
              onClick={this.handleChangeMov}
               />
          </label>
          </form>
    )}

basicInfo(){
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


   genre(){
     return(
       <form>
           <label>
             <h6>Comedy</h6>
             <Checkbox
               name="Comedy"
               type="checkbox"
               onClick={this.handleChangeCom}
                />
           </label>
           <label>
             <h6>Romance</h6>
             <Checkbox
               name="Romance"
               type="checkbox"
               onClick={this.handleChangeRom}
                />
           </label>
           <label>
             <h6>Mystery</h6>
             <Checkbox
               name="Mystery"
               type="checkbox"
               onClick={this.handleChangeMyst}
                />
           </label>
           </form>
     )
  }

   interests(){
     return(
       <form>
           <label>
             <h6>Black Panther</h6>
             <Checkbox
               name="BlackPanther"
               type="checkbox"
               onClick={this.handleChangeBP}
                />
           </label>
           <label>
             <h6>Harry Potter</h6>
             <Checkbox
               name="HarryPotter"
               type="checkbox"
               onClick={this.handleChangeHP}
                />
           </label>
           <label>
             <h6>Game of Thrones</h6>
             <Checkbox
               name="GOT"
               type="checkbox"
               onClick={this.handleChangeGOT}
                />
           </label>
           </form>
     )
  }

   color(){
    return(
      <ColorPicker
      name='color'
      defaultValue='#000'
      //onChange={color => console.log(color)}
      onChange={this.handleColor}
    />
    )

  }

   getSteps() {
    return ['Basic Information', 'Media Types', 'Genre', 'Interests', 'Color'];
  }

   getStepContent(step) {
    switch (step) {
     case 0:
        return this.basicInfo();
     case 1:
        return this.mediaTypes();
     case 2:
        return this.genre();
     case 3:
        return this.interests();
     case 4:
       return this.color();
    default:
      return 'unknown step';
    }
  }

   handleChangeMus = () => {
      this.setState(state => ({
        mediaType: state.interestList.push("music"),
      }));
   };

   handleChangeBook = () => {
      this.setState(state => ({
        mediaType: state.interestList.push("books"),
      }));
   };

   handleChangeMov = () => {
      this.setState(state => ({
        mediaType: state.interestList.push("movies"),
      }));
   };

   handleChangeCom = () => {
      this.setState(state => ({
        genreList: state.interestList.push("comedy"),
      }));
   };

   handleChangeRom = () => {
      this.setState(state => ({
        genreList: state.interestList.push("romance"),
      }));
   };

   handleChangeMyst = () => {
      this.setState(state => ({
        genreList: state.interestList.push("mystery"),
      }));
   };

   handleChangeBP = () => {
      this.setState(state => ({
        interestList: state.interestList.push("Black Panther"),
      }));
   };

   handleChangeHP = () => {
      this.setState(state => ({
        interestList: state.interestList.push("Harry Potter"),
      }));
   };

   handleChangeGOT = () => {
      this.setState(state => ({
        interestList: state.interestList.push("Game of Thrones"),
      }));
   };

   handleColor = () => {
      this.setState(state => ({
        color: state.color.push("color"),
      }));
   };


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
      const steps = this.getSteps();
      const { activeStep } = this.state;

      return (
      <div className= "stepperComp">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
              {this.getStepContent(index)}
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
            this.props.history.push('/dashboard'),
            console.log(this.state)
        )}
      </div>
    );

    }
}
export default Registration;
