import React, { Component } from 'react';
import M from "materialize-css";
import { genres } from '../Genres.json'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ColorPicker from 'material-ui-color-picker'
import NavBar from "./NavBar";
import connect from "react-redux/es/connect/connect";
import {addAuthenticatedUser, createNewUser} from "../actions";
import _ from "lodash";
import $ from "jquery";
import {Link} from "react-router-dom";


class Registration extends Component {

        constructor( props ) {
          super( props );
          this.state = {
                activeStep: 0,
                firstName: '',
                lastName: '',
                password: '',
                username: '',
                genres: [ ],
                similarMovieId: [  ],
                preferredMediaType: [ ],
                primaryColor: "#e0e0e0",
                secondaryColor: "#333333",
                dob: '',
               favorites: [],
               similar: [ ]
          };
          this.setMediaType= this.setMediaType.bind( this );
          this.setGeners = this.setGeners.bind( this );
      }
    isChecked =( item ) => {
           return this.state.preferredMediaType.join().includes( item );
    }
        mediaTypes(){
            return(
                <form className="row" >
                    <label  className="col s4 genre-checkbox" >
                        <input type="checkbox" id = "movie" onClick={ this.setMediaType } checked={  this.isChecked( 'movie' ) } />
                        <span>Movies</span>
                    </label>
                    <label  className="col s4 genre-checkbox" >
                        <input type="checkbox" id = "music" onClick={ this.setMediaType } checked={ this.isChecked( 'music' )}/>
                        <span>Music</span>
                    </label>
                    <label  className="col s4 genre-checkbox" >
                        <input type="checkbox" id = "book" onClick={ this.setMediaType } checked={ this.isChecked( 'book' )}/>
                        <span>Books</span>
                    </label>
                    <label  className="col s4 genre-checkbox" >
                        <input type="checkbox" id = "show" onClick={ this.setMediaType } checked={ this.isChecked( 'show' )}/>
                        <span>Tv Shows</span>
                    </label>
                </form>
            )
        }
        setMediaType( event ) {
          let mediaType = this.state.preferredMediaType;
            if ( ! mediaType.join().includes( event.target.id  ) ) {
                mediaType.push(event.target.id );

            } else {
                mediaType = _.remove( mediaType, ( item ) => {
                        if ( event.target.id !== item ) {
                            return true;
                        }
                });
            }
            this.setState( {
                preferredMediaType: mediaType
            } );

        }
        setGeners( event ) {
            let  genresList = this.state.genres;
            if ( ! genresList.join().includes( event.target.id  ) ) {
                genresList.push(event.target.id );

            } else {
                genresList = _.remove( genresList, ( item ) => {
                    if ( event.target.id !== item ) {
                        return true;
                    }
                });
            }
            this.setState( {
                genres: genresList
            } );
        }
        handleChange = name => event => {
            this.setState({
                [name]: event.target.value,
            });
        };
        basicInfo(){
        return(
          <form>
              <div className="input-field">
                  <input id="firstName" type="text" className="" value = {this.state.firstName} onChange={ this.handleChange( 'firstName' ) }/>
                  <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field">
                  <input id="lastName" type="text" className="" value = {this.state.lastName} onChange={ this.handleChange( 'lastName' ) }/>
                  <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="input-field">
                  <input id="username" type="text" className="" value = {this.state.username} onChange={ this.handleChange( 'username' ) }/>
                  <label htmlFor="username">username</label>
              </div>
              <div className="input-field">
                  <input id="password" type="password" className="" value = {this.state.password} onChange={ this.handleChange( 'password' ) }/>
                  <label htmlFor="password">Password</label>
              </div>
          </form>
        )
      }
    isGenreChecked = ( item ) => {
        return this.state.genres.join().includes( item );
    }
        genre(){
            let genreList = JSON.parse( JSON.stringify( genres ) );
         return(
           <form className="row" >
               {
                   genreList.map( ( item ) =>{
                       return ( <label  className="col s4 genre-checkbox" >
                           <input type="checkbox" id = { item.id } onClick={ this.setGeners } checked={ this.isGenreChecked( item.id )}/>
                           <span>{ item.name }</span>
                       </label> );
                   } )
               }
           </form>
         )
      }
        color(){
        return(
            <div>
                <p>Please choose Primary Color for your application </p>
              <ColorPicker
              name='primaryColor'
              color='color'
              value = { this.state.primaryColor }
              onChange={ this.handlePriChangeComplete }
            /> <p>Please choose Secondary Color for your application </p>
                <ColorPicker
                    name='secondaryColor'
                    color='color'
                    value = { this.state.secondaryColor }
                    onChange={ this.handleSecChangeComplete }
                /></div>
        )
      }
        handlePriChangeComplete = event => {
            this.setState({
                primaryColor: event
            });
        };
        handleSecChangeComplete = event => {
            this.setState({
                secondaryColor: event
            });
        };
        getSteps() {
        return ['Basic Information', 'Media Types', 'Genre', 'Color'];
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
            return this.color();
        default:
          return 'unknown step';
        }
      }
        handleNext = () => {
            if ( this.state.activeStep !== 3 ) {
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }));
            } else {
                this.props.createNewUser( { ...this.state } );
                this.props.history.push('/dashboard')
            }

        };
        handleBack = () => {
          this.setState(state => ({
            activeStep: state.activeStep - 1,
          }));
        };
        render() {
          const M = this.props;
          const steps = this.getSteps();
          const { activeStep } = this.state;

          return (
              <div>
                  <div className= "header clearfix">
                      <h4 className="left-align clearfix header__heading">BestForMe</h4>
                      <Link to = "/login"><p className="waves-effect waves-light btn right-align clearfix">Back to Login</p></Link>
                  </div>
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
          </div>
              </div>
        );

        }
        componentDidMount() {
            $( 'body' ).css( {
                background: 'inherit',
                color: 'inherit'
            } );
        }
}
const mapStateToProps = state => {
    return { store: state.authUser};
};

function mapDispatchToProps(dispatch) {
    return {
        createNewUser: payload => dispatch( createNewUser(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
