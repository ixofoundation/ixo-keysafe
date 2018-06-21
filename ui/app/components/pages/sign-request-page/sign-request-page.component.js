import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import EditableLabel from '../../editable-label'
const Tooltip = require('../../tooltip-v2.js')
const copyToClipboard = require('copy-to-clipboard')
import { EXPORT_MNEMONIC_ROUTE } from '../../../../app/routes'


class SignRequestPage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      hasCopied: false,
      isMenuDisplaying: false,
      copyToClipboardPressed: false,
    }
  }

  toggleIsMenuDisplaying () {
    // this.setState({ isMenuDisplaying: !this.state.isMenuDisplaying })

    this.setState((prevState) => ({
      isMenuDisplaying: !prevState.isMenuDisplaying
    }));
  }

  render () {
    const { isMenuDisplaying } = this.state
    debugger
    const { selectedIdentity,  saveAccountLabel, lockMetamask} = this.props
    const { name, address } = selectedIdentity

    return (
      <div className="sign-request-page">
        <div className={"sign-request-page__light-box" + (isMenuDisplaying?" sign-request-page__light-box-visible":"")}
          onClick={() => {
            this.toggleIsMenuDisplaying()
          }}
        />
        <div className={"sign-request-page__menu-modal" + (isMenuDisplaying?" sign-request-page__menu-modal-visible":"")}>
          <div className="sign-request-page__menu-modal-item">
            <div className="sign-request-page__ixo-menu-close sign-request-page__nav-image-item"
                onClick={() => {
                  this.toggleIsMenuDisplaying()
                }}
              />
          </div>
          <div className="sign-request-page__menu-modal-item sign-request-page__menu-modal-item-option sign-request-page__menu-modal-item-option-disabled">Settings</div>
          <div className="sign-request-page__menu-modal-item sign-request-page__menu-modal-item-option sign-request-page__menu-modal-item-option-disabled">Help</div>
          <div className="sign-request-page__menu-modal-item sign-request-page__menu-modal-item-option"
            onClick = {() => {
            lockMetamask()
            history.push(DEFAULT_ROUTE)
          }}>Log out</div>
        </div>

        <div className="sign-request-page__content-container">
          <div  className="sign-request-page__nav-bar">
            <div className="sign-request-page__ixo-logo-letters sign-request-page__nav-image-item"/>
            <div className="sign-request-page__ixo-menu-burger sign-request-page__nav-image-item"
              onClick={() => {
                this.toggleIsMenuDisplaying()
              }}
            />
          </div>

          <div className="sign-request-page__description-section">
            <EditableLabel 
              className="sign-request-page__description-label" 
              defaultValue={name} 
              onSubmit={(label) => {
                saveAccountLabel(address, label)
                }
              }/>
          </div>        

          <div className="sign-request-page__unique-image">
            <div className="sign-request-page__unique-image-frieze">
              <Identicon address={address} diameter={200} />
            </div>
          </div>

          <Tooltip 
            position ="bottom"
            title = {this.state.hasCopied ? this.context.t('copiedExclamation') : this.context.t('copyToClipboard')}
            wrapperClassName = 'sign-request-page__copy-did-tooltip'
          >
            <div className="sign-request-page__did-section" onClick = {() => {
              copyToClipboard(address)
              this.setState({ hasCopied: true })
              setTimeout(() => this.setState({ hasCopied: false }), 3000)
            }}
            >
                <div className="sign-request-page__did-label">{address}</div>
                <div className="sign-request-page__did-copy-button">Copy</div>
            </div>
          </Tooltip>

          <div className="sign-request-page__footer-bar">
            <div
              className="sign-request-page__export-pk-button"
              onClick={() => {
                this.props.history.push(EXPORT_MNEMONIC_ROUTE)
              }}
            >
              <p>Export Private Key</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

SignRequestPage.propTypes = {
}

export default SignRequestPage
