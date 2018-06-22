import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import EditableLabel from '../../editable-label'
const Tooltip = require('../../tooltip-v2.js')
const copyToClipboard = require('copy-to-clipboard')
import { EXPORT_MNEMONIC_ROUTE } from '../../../../app/routes'


class AccountPage extends Component {
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
    const { selectedIdentity,  saveAccountLabel, lockMetamask} = this.props
    const { name, address } = selectedIdentity

    return (
      <div className="account-page">
        <div className={"account-page__light-box" + (isMenuDisplaying?" account-page__light-box-visible":"")}
          onClick={() => {
            this.toggleIsMenuDisplaying()
          }}
        />
        <div className={"account-page__menu-modal" + (isMenuDisplaying?" account-page__menu-modal-visible":"")}>
          <div className="account-page__menu-modal-item">
            <div className="account-page__ixo-menu-close account-page__nav-image-item"
                onClick={() => {
                  this.toggleIsMenuDisplaying()
                }}
              />
          </div>
          <div className="account-page__menu-modal-item account-page__menu-modal-item-option account-page__menu-modal-item-option-disabled">Settings</div>
          <div className="account-page__menu-modal-item account-page__menu-modal-item-option account-page__menu-modal-item-option-disabled">Help</div>
          <div className="account-page__menu-modal-item account-page__menu-modal-item-option"
            onClick = {() => {
            lockMetamask()
            history.push(DEFAULT_ROUTE)
          }}>Log out</div>
        </div>

        <div className="account-page__content-container">
          <div  className="account-page__nav-bar">
            <div className="account-page__ixo-logo-letters account-page__nav-image-item"/>
            <div className="account-page__ixo-menu-burger account-page__nav-image-item"
              onClick={() => {
                this.toggleIsMenuDisplaying()
              }}
            />
          </div>

          <div className="account-page__description-section">
            <EditableLabel 
              className="account-page__description-label" 
              defaultValue={name} 
              onSubmit={(label) => {
                saveAccountLabel(address, label)
                }
              }/>
          </div>        

          <div className="account-page__unique-image">
            <div className="account-page__unique-image-frieze">
              <Identicon address={address} diameter={200} />
            </div>
          </div>

          <Tooltip 
            position ="bottom"
            title = {this.state.hasCopied ? this.context.t('copiedExclamation') : this.context.t('copyToClipboard')}
            wrapperClassName = 'account-page__copy-did-tooltip'
          >
            <div className="account-page__did-section" onClick = {() => {
              copyToClipboard(address)
              this.setState({ hasCopied: true })
              setTimeout(() => this.setState({ hasCopied: false }), 3000)
            }}
            >
                <div className="account-page__did-label">{address}</div>
                <div className="account-page__did-copy-button">Copy</div>
            </div>
          </Tooltip>

          <div className="account-page__footer-bar">
            <div
              className="account-page__export-pk-button"
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

AccountPage.propTypes = {
}

export default AccountPage
