import {Redirect, Route} from "react-router";
import React from "react";
import { store } from './index';
import simpleReducer from "./ReducersIndex";
export function PrivateRoute({ component: Component, ...rest }) {
    console.log( store.getState() );
    return (
        <Route {...rest} render={ props =>
            store.getState().simpleReducer.authUser.firstName !== undefined ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
        />
    );
}