import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import TextField from '../../text-field'

const { ENVIRONMENT_TYPE_POPUP } = require('../../../../../app/scripts/lib/enums')
const { getEnvironmentType } = require('../../../../../app/scripts/lib/util')
const getCaretCoordinates = require('textarea-caret')
const EventEmitter = require('events').EventEmitter
const { DEFAULT_ROUTE, INITIALIZE_IMPORT_WITH_SEED_PHRASE_ROUTE } = require('../../../routes')

class UnlockPage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  constructor (props) {
    super(props)

    this.state = {
      password: '',
      error: null,
    }
  }

  componentWillMount () {
    const { isUnlocked, history } = this.props

    if (isUnlocked) {
      history.push(DEFAULT_ROUTE)
    }
  }

  tryUnlockMetamask (password) {
    const { tryUnlockMetamask, history } = this.props
    tryUnlockMetamask(password)
      .then(() => history.push(DEFAULT_ROUTE))
      .catch(({ message }) => this.setState({ error: message }))
  }

  isValid () {
    return this.state.password.length >= 8
  }

  handleSubmit (event) {
    event.preventDefault()
    event.stopPropagation()

    const { password } = this.state
    const { tryUnlockMetamask, history } = this.props

    if (password === '') {
      return
    }

    this.setState({ error: null })

    tryUnlockMetamask(password)
      .then(() => {
        history.push(DEFAULT_ROUTE)
      })
      .catch(({ message }) => this.setState({ error: message }))
  }

  handleInputChange ({ target }) {
    this.setState({ password: target.value, error: null })
  }

  renderSubmitButton () {
    const style = {
      backgroundColor: '#f7861c',
      color: 'white',
      marginTop: '20px',
      height: '60px',
      fontWeight: '400',
      boxShadow: 'none',
      borderRadius: '4px',
    }

    return (
      <Button
        type="submit"
        style={style}
        disabled={!this.state.password}
        fullWidth
        variant="raised"
        size="large"
        onClick={event => this.handleSubmit(event)}
        disableRipple
      >
        { this.context.t('login') }
      </Button>
    )
  }

  renderLoginForm () {
    const { error } = this.state

    return (
      <div className="unlock-page__login-form">
        <div className="unlock-page__login-textfield">
          <TextField
            id="password"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={event => this.handleInputChange(event)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.handleSubmit(event)
              }
            }}  
            error={error}
            autoComplete="current-password"
            autoFocus
            fullWidth
          />
        </div>
        <div 
          onClick={event => this.handleSubmit(event)} className={"unlock-page__login-button" + (this.isValid()?" unlock-page__login-button-enabled":"")}
        >
          <p>Log In</p>
        </div>
      </div>
    )
  }

  render () {
    const { error } = this.state

    return (
      <div className="unlock-page__container">
        <div className="unlock-page">

          <div className="unlock-page__ixo-logo"/>
          <div className="unlock-page__ixo-graphic"/>
          
          { this.renderLoginForm()}

          <div className="unlock-page__footer-bar">          
            <div 
              className="unlock-page__import-account-link-text"
              onClick={(e) => {
                e.preventDefault()
                this.props.history.push(INITIALIZE_IMPORT_WITH_SEED_PHRASE_ROUTE)

                if (getEnvironmentType(window.location.href) === ENVIRONMENT_TYPE_POPUP) {
                  global.platform.openExtensionInBrowser()
                }
              }}>
              { this.context.t('restoreFromSeed') }              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UnlockPage.propTypes = {
  forgotPassword: PropTypes.func,
  tryUnlockMetamask: PropTypes.func,
  markPasswordForgotten: PropTypes.func,
  history: PropTypes.object,
  isUnlocked: PropTypes.bool,
  t: PropTypes.func,
  useOldInterface: PropTypes.func,
  setNetworkEndpoints: PropTypes.func,
}

export default UnlockPage
