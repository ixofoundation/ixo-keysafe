import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  createNewVaultAndRestore,
  unMarkPasswordForgotten,
} from '../../../../ui/app/actions'
import { INITIALIZE_NOTICE_ROUTE } from '../../../../ui/app/routes'
import TextField from '../../../../ui/app/components/text-field'

class ImportSeedPhraseScreen extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    warning: PropTypes.string,
    createNewVaultAndRestore: PropTypes.func.isRequired,
    leaveImportSeedScreenState: PropTypes.func,
    history: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  state = {
    seedPhrase: '',
    password: '',
    confirmPassword: '',
    seedPhraseError: null,
    passwordError: null,
    confirmPasswordError: null,
  }

  parseSeedPhrase = (seedPhrase) => {
    return seedPhrase
      .match(/\w+/g)
      .join(' ')
  }

  handleSeedPhraseChange (seedPhrase) {
    let seedPhraseError = null

    if (seedPhrase && this.parseSeedPhrase(seedPhrase).split(' ').length !== 12) {
      seedPhraseError = this.context.t('seedPhraseReq')
    }

    this.setState({ seedPhrase, seedPhraseError })
  }


  handleUsernameChange (username) {
    this.setState({ username })
  }
    
  handlePasswordChange (password) {
    const { confirmPassword } = this.state
    let confirmPasswordError = null
    let passwordError = null

    if (password && password.length < 8) {
      passwordError = this.context.t('passwordNotLongEnough')
    }

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError = this.context.t('passwordsDontMatch')
    }

    this.setState({ password, passwordError, confirmPasswordError })
  }

  handleConfirmPasswordChange (confirmPassword) {
    const { password } = this.state
    let confirmPasswordError = null

    if (password !== confirmPassword) {
      confirmPasswordError = this.context.t('passwordsDontMatch')
    }

    this.setState({ confirmPassword, confirmPasswordError })
  }

  onClick = () => {
    const { username, password, seedPhrase } = this.state
    const {
      createNewVaultAndRestore,
      leaveImportSeedScreenState,
      history,
    } = this.props

    leaveImportSeedScreenState()
    createNewVaultAndRestore(username, password, this.parseSeedPhrase(seedPhrase))
      .then(() => history.push(INITIALIZE_NOTICE_ROUTE))
  }

  hasError () {
    const { passwordError, confirmPasswordError, seedPhraseError } = this.state
    return passwordError || confirmPasswordError || seedPhraseError
  }

  render () {
    const {
      seedPhrase,
      password,
      confirmPassword,
      seedPhraseError,
      usernameError,
      passwordError,
      confirmPasswordError,
    } = this.state
    const { t } = this.context
    const { isLoading } = this.props
    const disabled = !seedPhrase || !password || !confirmPassword || isLoading || this.hasError()

    return (
      <div className="first-view-main-wrapper">
        <div className="first-view-main">
          <div className="first-view-nav">
            <a
              className="import-account__back-button"
              onClick={e => {
                e.preventDefault()
                this.props.history.goBack()
              }}
              href="#"
            >
            </a>
          </div>
          <div className="import-account">
            <div className="first-time__title import-account__title">
              Import your existing key
            </div>
            <div className="import-account__input-wrapper">
              <textarea
                className="import-account__secret-phrase"
                onChange={e => this.handleSeedPhraseChange(e.target.value)}
                value={this.state.seedPhrase}
                placeholder="Enter your secret twelve word phrase here to restore your vault."
              />
            </div>
            <span className="error">
              { seedPhraseError }
            </span>
            <TextField
              id="create-username"
              label={t('createUsername')}
              type="text"
              className="first-time-flow__input"
              value={this.state.username}
              onChange={event => this.handleUsernameChange(event.target.value)}
              error={usernameError}
              margin="normal"
              fullWidth
            />
            <TextField
              id="password"
              label={t('newPassword')}
              type="password"
              className="first-time-flow__input"
              value={this.state.password}
              onChange={event => this.handlePasswordChange(event.target.value)}
              error={passwordError}
              autoComplete="new-password"
              margin="normal"
            />
            <TextField
              id="confirm-password"
              label={t('confirmPassword')}
              type="password"
              className="first-time-flow__input"
              value={this.state.confirmPassword}
              onChange={event => this.handleConfirmPasswordChange(event.target.value)}
              error={confirmPasswordError}
              autoComplete="confirm-password"
              margin="normal"
            />
            <button
              className="first-time-flow__button"
              onClick={() => !disabled && this.onClick()}
              disabled={disabled}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ appState: { warning, isLoading } }) => ({ warning, isLoading }),
  dispatch => ({
    leaveImportSeedScreenState: () => {
      dispatch(unMarkPasswordForgotten())
    },
    createNewVaultAndRestore: (un, pw, seed) => dispatch(createNewVaultAndRestore(un, pw, seed)),
  })
)(ImportSeedPhraseScreen)
