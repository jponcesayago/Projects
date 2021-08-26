import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScree } from '../components/journal/JournalScree';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route path="/auth" component={AuthRouter} />
                        <Route exact path="/" component={JournalScree} />
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}
