import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Container, Grid, Typography} from '@material-ui/core';
import YCard from './YCard'
import ReactPlayer from 'react-player/youtube'
import Header from './Header'
import Nav from './Nav';

const useStyles = theme => ({
  cont: {
    marginLeft: 24,
    backgroundColor: 'red'
  }
});

class VideoComponent extends React.Component {
  constructor() {
    super();
    this.related();
    this.vid_inf();
    this.comm_inf();
    this.state = {
      vis: [],
      vinf: {},
      comments: [],
      logo: '',
    }
  }
  vid_inf = (props) => {
    fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+(window.location.href).split("/")[4]+'&key=AIzaSyDChwSyYbFWJl2LJOgBbSwBcs6WAxb9Qv4').then(response => response.json()).then(data => {
      var _data = {id: 0, channelTitle: data['items'][0]['snippet']['channelTitle'],
        title: data['items'][0]['snippet']['title'],
        publishedAt: data['items'][0]['snippet']['publishedAt'],
        desc: data['items'][0]['snippet']['localized']['description'],
      channelId: data['items'][0]['snippet']['channelId']};
      this.setState({vinf: _data});
      console.log(this.state.vinf)
    }).catch(err => alert("Wrong!ffff"))
  }

  comm_inf = (props) => {
    fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId='+(window.location.href).split("/")[4]+'&maxResults=20&key=AIzaSyDChwSyYbFWJl2LJOgBbSwBcs6WAxb9Qv4').then(response => response.json()).then(data => {
      let _adata=[];
      for(let i = 0; i < 12; i++){
        _adata.push({
          id: i,
          name: data['items'][i]['snippet']['topLevelComment']['snippet']['authorDisplayName'],
          ava: data['items'][i]['snippet']['topLevelComment']['snippet']['authorProfileImageUrl'],
          text: data['items'][i]['snippet']['topLevelComment']['snippet']['textDisplay']
        }

        )
        this.setState({comments: _adata})
      }

    }).catch(err => alert("Wrong!comm"))
  }
  related = (props) => {
    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=' + (window.location.href).split("/")[4] + '&type=video&regionCode=KR&key=AIzaSyDChwSyYbFWJl2LJOgBbSwBcs6WAxb9Qv4').then(response => response.json()).then(data => {
      var _data = [];
      for (let i = 0; i < 3; i++) {
        _data.push({
          id: i, channelTitle: data['items'][i]['snippet']['channelTitle'],
          title: data['items'][i]['snippet']['title'],
          publishedAt: data['items'][i]['snippet']['publishedAt'],
          screen: data['items'][i]['snippet']['thumbnails']['high']['url'],
          v_id: data['items'][i]['id']['videoId']
        })
      }
      this.setState({vis: _data});
    }).catch(err => alert("Wrong!ff"))
  }
  logo = (props) => {
    fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+this.state.vinf.channelId+'&key=AIzaSyDChwSyYbFWJl2LJOgBbSwBcs6WAxb9Qv4').then(response => response.json()).then(data => {
      this.state.logo = data['items'][0]['snippet']['thumbnails']['default']['url']
    }).catch(err => alert("Wrong!logo"))
  }

  render() {
    const {classes} = this.props;

    return (<div>
      <Header>
        <Nav/>
      </Header>
      <Grid width="70vw" container style={{
          backgroundColor: '#f7f7f7'
        }}>
        <Grid item="item" xs={6}style={{
            marginTop: 12,
            marginLeft: '10vw'
          }}>
          <ReactPlayer width="50vw" height="50vh" url={'https://www.youtube.com/watch?v=' + (window.location.href).split("/")[4]}/>
          <Grid>Title: <Typography>{this.state.vinf.title}</Typography><br/>
        Published: <Typography>{this.state.vinf.publishedAt}</Typography><hr/></Grid>
      <Grid><img src={this.state.logo}/><h1>{this.state.vinf.channelTitle}</h1><br/>
    <Typography>{this.state.vinf.desc}</Typography></Grid>
    <Grid>
      {
        this.state.comments.map((comment) => (<Grid item="item" key={comment.id} xs={12} sm={6} md={3}>
          <p> <img src={comment.ava}/> {comment.name}</p>
          <p style={{fontSize: 10}} >{comment.text}</p>
        </Grid>))
      }
    </Grid>

        </Grid>
        <Grid item="item" style={{
            marginTop: 24,
            marginLeft: '2vw'
          }}>
          <Grid xs={6} className={classes.cont}>
            {
              this.state.vis.map((data) => (<Grid item="item" key={data.id} xs={12} sm={6} md={3}>
                <YCard icons={this.state.icons} data={data}/>
              </Grid>))
            }
          </Grid>
        </Grid>
      </Grid>

    </div>)
  }
}

export default withStyles(useStyles)(VideoComponent)
