import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';

import { activeTabSelector } from './selectors'
import Tabs, { Tab } from '@material-ui/core/Tabs'
import RoutedTabs from '../../components/tabs/RoutedTabs'
import HomeTabs from './HomeTabs'
import HomeNavLists from './HomeNavLists'
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SwitchComponent from '@material-ui/core/Switch';
import Notifications from 'react-notification-system-redux'
import { injectIntl } from "react-intl"
import green from '@material-ui/core/colors/green';

import s from './root.css'
import TopBar from './topbar'
import homeActions from './actions'
import { Root as Send } from "send"
import { Root as Device } from "device"
import { ReceiveComponent } from "receive"
import { dbcActions } from 'dbc'
import drawerData from './drawerData'

const {dialog} = require('electron').remote
const { ipcRenderer } = require('electron')


const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notifications,
    activeTab: activeTabSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps              homeActions is ", homeActions)
  return {
    showTab: bindActionCreators(homeActions.showTab, dispatch),
    loadDbcFile: bindActionCreators(dbcActions.loadDbcFile, dispatch)
  }
}


const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eee',
    padding: 24,
    paddingTop: 12,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  paper: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  checked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500],
    },
  },
  bar: {

  },
});


@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@withStyles(styles, { withTheme: true })
@injectIntl
export default class Root extends PureComponent {
  static propTypes = {}

  state = {
    open: false,
  };

  constructor(props) {
    super(props);
  }

  handleChange = (event, value) => {
    console.log(value)
    // alert(`A tab with this route property ${value/*.props['data-route']*/} was activated.`);
    console.log("handleChange   value   ", value)

    this.props.showTab(value)
    this.props.history.push(value)

  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleActive = (tab) => {
    console.log("handleActive  ", tab)
  };

  handleDeviceSwitch = (event, checked) => {
    // this.setState({ [name]: checked });
    ipcRenderer.send( checked ? 'action:start' : 'action:stop')
  };

  handleClick = event => {
    console.log(event.currentTarget.getAttribute('data-action'));
    if("signal-config" === event.currentTarget.getAttribute('data-action')) {
      const file = dialog.showOpenDialog(
        {
          properties: ['openFile',],
          filters: [
            { name: __("signal_defs_file"), extensions: [ 'json' ] },
            { name: __("all_files"), extensions: [ '*' ] }
          ],
        },  (file) => {
          console.log("handleOpenFile                              files is  ", file)
          this.props.loadDbcFile(file)
        }
      );
    }
  };

  render() {
    const {
      history,
      match,
      location,
      activeTab,
      intl: {
        formatMessage
      },
      notifications,
      classes,
      theme
    } = this.props

    console.log("Home root render :    notification is       -> ", this.props, history)

    if(location.pathname == '/' || location.pathname == '/signals')  return (
      <Redirect to={ { pathname: '/signals/send' } }/>
    )

    return (
      <div className={s.container}>
        <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="default"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {formatMessage({id: "title"})}
            </Typography>

            <SwitchComponent
              classes={{
                checked: classes.checked,
                bar: classes.bar
              }}
              onChange={this.handleDeviceSwitch}
              aria-label="checkedA"
            />

          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <HomeNavLists className={classes.list}></HomeNavLists>
            <Divider />
            <List className={classes.list}>{drawerData.menulist1(formatMessage, this.handleClick)}</List>
          </div>
        </Drawer>

        {/*<div className={s.topbar}>*/}
          {/*<TopBar/>*/}
        {/*</div>*/}
        <main className={s.main}>
          <Switch>
            <Route path="/device" exact={true} component={Device}/>
            <Route path="/signals">
              <div className={s.content}>
                <div className={s.tabs}>
                  <Paper className={classes.paper}>
                    <HomeTabs handleChange={this.handleChange}/>
                  </Paper>
                </div>

                <div className={s.tabcontent}>
                  <Switch>
                    <Route path="/signals/send" component={Send}/>
                    <Route path="/signals/receive" component={ReceiveComponent}/>
                  </Switch>
                </div>
              </div>
            </Route>
          </Switch>

        </main>

        <Notifications notifications={notifications} />
      </div>

    );
  }
}


// export default connect(mapStateToProps, mapDispatchToProps)(Root)
