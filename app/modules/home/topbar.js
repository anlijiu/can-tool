import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const {dialog} = require('electron').remote

import { dbcActions } from 'dbc'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    loadDbcFile: bindActionCreators(dbcActions.loadDbcFile, dispatch)
  }
}

@connect(null, mapDispatchToProps)
@withStyles(styles)
export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOpenFile = () => {
    console.log("handleOpenFile  clicked ")
    const file = dialog.showOpenDialog(
      {
        properties: ['openFile',],
        filters: [
          { name: __("signal_defs_file"), extensions: [ 'json' ] },
          { name: __("all_files"), extensions: [ '*' ] }
        ],
      },  (file) => {
        console.log("handleOpenFile        files is  ", file)
        this.props.loadDbcFile(file)
      }
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Toolbar>
        <Typography type="title" color="inherit">
          Title
        </Typography>
        <Button raised className={classes.button} onClick={this.handleOpenFile}>
          打开信号定义文件
        </Button>
      </Toolbar>
    );
  }
}
