import React, { FunctionComponent } from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { LoggedInState } from '../../features/authorization/login/LoggedInState';
import userActions from '../../features/authorization/userActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      color: '#ffffff'
    },
    link: {
        textDecoration: 'none',
        marginRight: '2em',
        '&:hover': {
            color: '#dddddd'
        }
    },
    activeLink: {
        textDecoration: 'underline',
        textDecorationColor: '#ffffff'
    }
  })
);


export const NavBar: FunctionComponent = () => {

    const classes = useStyles();
    const { loggedInState } = useSelector((state: RootState) => state.authorization.login);
    const dispatch = useDispatch();
    

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink exact={true} to="/" className={classes.link} activeClassName={classes.activeLink}>
                        <Typography variant="h6" className={classes.title}>
                            Home
                        </Typography>
                    </NavLink>
                    <NavLink to="/articles" className={classes.link} activeClassName={classes.activeLink}>
                        <Typography variant="h6" className={classes.title}>
                            Articles
                        </Typography>
                    </NavLink>
                    <NavLink to="/tags" className={classes.link} activeClassName={classes.activeLink}>
                        <Typography variant="h6" className={classes.title}>
                            Tags
                        </Typography>
                    </NavLink>
                    {loggedInState === LoggedInState.LoggedIn && <Button color="inherit" onClick={() => dispatch(userActions.logoutRequest())}>Logout</Button> }
                </Toolbar>
            </AppBar>
        </div>
    )
}