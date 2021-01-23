import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Paper, InputBase, IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = theme => ({
  root: {
    padding: '5px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100vh",
    marginLeft: "12vw"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
});

class Nav extends React.Component {
  constructor() {
    super();
    var input;
  }

  search = (props) => {
    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=' + this.input + '&regionCode=KR&key=AIzaSyDChwSyYbFWJl2LJOgBbSwBcs6WAxb9Qv4').then(response => response.json()).then(data => {
      var _data = [];
      console.log(data)
      for (let i = 0; i < 12; i++) {
        _data.push({id: i, channelTitle: data['items'][i]['snippet']['channelTitle'],
          title: data['items'][i]['snippet']['title'],
          publishedAt: data['items'][i]['snippet']['publishedAt'],
          screen: data['items'][i]['snippet']['thumbnails']['high']['url'],
          v_id: data['items'][i]['id']['videoId'],
          desc: data['items'][i]['snippet']['description']
        })
      }
      console.log(_data)
      this.props.Callback(_data);
    }).catch(err => alert("Wrong! Nav"))
  }

  handleChange = (event) => {
    this.input = event.target.value
  }

  render() {

    const {classes} = this.props;

    return (<Paper component="form" className={classes.root}>
      <InputBase onChange={this.handleChange} className={classes.input} placeholder="Search here" inputProps={{
          'aria-label' : 'search google maps'
        }}/>
      <Link to='/'>
      <IconButton className={classes.iconButton} onClick={this.search.bind(this)}>
        <SearchIcon/>
      </IconButton>
      </Link>
    </Paper>)
  }
}

export default withStyles(useStyles)(Nav)
