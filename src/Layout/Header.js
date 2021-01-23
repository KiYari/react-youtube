import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Typography, Toolbar, IconButton} from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar';

const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
    width: '64px',
    height: '64px',
    color: 'white'
  }
});

class Header extends React.Component {

  render() {
    const {classes} = this.props;

    return (<AppBar position="relative">
      <Toolbar>
        <Sidebar/>
        <Link to='/'>
          <IconButton>
            <YouTubeIcon className={classes.icon}/>
            <Typography style={{
                color: 'white'
              }} variant="h6" color="inherit">
              Ty Truba)
            </Typography>
          </IconButton>
        </Link>
        {this.props.children}
      </Toolbar>
    </AppBar>)
  }
}

export default withStyles(useStyles)(Header)
