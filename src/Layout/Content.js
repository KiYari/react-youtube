import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Header from './Header'
import YCard from './YCard'
import Nav from './Nav';

const useStyles = theme => ({
  cont: {
    marginLeft: 24
  }
});

class Content extends React.Component {
  constructor() {
    super();

    fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=12&chart=mostPopular&regionCode=KR&key=AIzaSyDChwSyYbFWJl2LJOgBbSwBcs6WAxb9Qv4').then(response => response.json()).then(data => {
      var _data = [];
      for (let i = 0; i < 12; i++) {
        _data.push({id: i, channelTitle: data['items'][i]['snippet']['channelTitle'],
          title: data['items'][i]['snippet']['title'],
          publishedAt: data['items'][i]['snippet']['publishedAt'],
          screen: data['items'][i]['snippet']['thumbnails']['high']['url'],
          v_id: data['items'][i]['id'],
          desc: data['items'][i]['snippet']['localized']['description']
        })
      }
      this.setState({vid_data: _data});
    }).catch(err => alert("Wrong! Sub"))
    this.state = {
      vid_data: []
    }
  }

  data_scrapper = (_data) => {
    this.setState({vid_data: _data});
  }
  render() {
    const {classes} = this.props;

    return (<React.Fragment>
      <Header><Nav Callback={this.data_scrapper.bind(this)}/></Header>
      <Grid style={{
          marginTop: 8
        }} className={classes.cont} container="container" spacing={3}>
        {
          this.state.vid_data.map((data) => (<Grid item="item" key={data.id} xs={12} sm={6} md={3}>
            <YCard icons={this.state.icons} data={data}/>
          </Grid>))
        }
      </Grid>
    </React.Fragment>);

  }

}

export default withStyles(useStyles)(Content)
