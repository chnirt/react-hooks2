import React, { Fragment, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/useAuth'

import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}))

export default function RegisterPage() {
  let { push } = useHistory()
  let { signup } = useAuth()
  const { t } = useTranslation()

  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeTabIndex = index => {
    setValue(index)
  }

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function onSubmit(e) {
    e.preventDefault()
    signup(form.email, form.password)
    push('/login')
  }
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeTabIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
        </SwipeableViews>
      </div>

      {/* {t('RegisterPage')}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={onChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          security="true"
          value={form.password}
          onChange={onChange}
        />
        <br />
        <button type="submit">{t('Register')}</button>
      </form>
      <br /> */}
      <Link to="/login"> {t('LoginPage')}</Link>
    </Fragment>
  )
}
