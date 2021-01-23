import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, Avatar,
IconButton, Typography, CardActionArea} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom'


const useStyles = theme => ({
  root: {
    width: 380,
    height: 340,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Content extends React.Component {
  constructor(){
    super();
    this.state = {
      v_id: "",
    }

  }

  refer = () => {

    alert("Your link: https://www.youtube.com/watch?v="+ this.state.v_id)
  }
  componentDidMount() {
    this.setState({v_id: this.props.data.v_id} );
  }
  render(){
    const {classes} = this.props;


    return(
      <Card className={classes.root}>
        <Link to={'/video/' + this.props.data.v_id}>
        <CardActionArea>
            <img width='100%' height='170px' src={this.props.data.screen} alt="Italian Trulli"/>
        </CardActionArea>
        </Link>
      <CardHeader
        action={
          <IconButton onClick={this.refer} aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={this.props.data.title}
        subheader={this.props.data.publishedAt}
      />
        <Typography variant="body2" color="textSecondary" component="p">
          {this.props.data.channelTitle}<br/>
        </Typography>
    </Card>
    )

  }


}

export default withStyles(useStyles)(Content)
