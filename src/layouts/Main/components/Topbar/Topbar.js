import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'
import InputOutlinedIcon from '@material-ui/icons/InputOutlined'
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined'

import WhiteLongLogo from '../../../../assets/images/whitelonglogo.png'
import { useAuth } from '../../../../context/useAuth'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  image: { height: 36, width: 170 },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}))

const Topbar = props => {
  const { className, onSidebarOpen, setOpen, ...rest } = props

  const classes = useStyles()

  let { logout } = useAuth()

  const onLogout = () => {
    logout()
  }

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdDown>
          <RouterLink to="/">
            <img className={classes.image} alt="Logo" src={WhiteLongLogo} />
          </RouterLink>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuOutlinedIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />

        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={() => setOpen(true)}
        >
          <TuneOutlinedIcon />
        </IconButton>
        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={onLogout}
        >
          <InputOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
}

export default Topbar
