import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import EditableLabel from '../../editable-label'
import TextField from '../../text-field'
const Tooltip = require('../../tooltip-v2.js')
const copyToClipboard = require('copy-to-clipboard')


class ExportMnemonicPage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      hasCopied: false,
      copyToClipboardPressed: false,
    }
  }

  render () {
    const { error } = this.state
    const { selectedIdentity, revealSeedWords,  saveAccountLabel} = this.props
    const { name, address } = selectedIdentity

    return (
      <div className="export-mnemonic-page">
        <div  className="export-mnemonic-page__nav-bar">
          <a
            className="export-mnemonic-page__back-nav-button"
            onClick={e => {
              e.preventDefault()
              this.props.history.goBack()
            }}
            href="#"
          />
          <div className="export-mnemonic-page__description">Export private key</div>
          <div className="export-mnemonic-page__right-nav-button"></div>
        </div>


        <div className="export-mnemonic-page__content-frame">
          <div className="export-mnemonic-page__content-item">
            <div className="export-mnemonic-page__unique-image-frieze">
              <Identicon address={address} diameter={75} />
            </div>
            <div className="export-mnemonic-page__account-title">{name}</div>
          </div>
          <div className="export-mnemonic-page__content-item export-mnemonic-page__work-area">            

            <div className="export-mnemonic-page__password-textfield">
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

            <div className="export-mnemonic-page__confirmation-button"
              onClick={() => {
              }}
            >
              <p>Confirm</p>
            </div>
          </div>
          <div className="export-mnemonic-page__content-item">
            <div className="export-mnemonic-page__subtext">
              <span className="export-mnemonic-page__warning-color">WARNING: </span>
              <span>Never disclose your backup phrase. Anyone with this phrase can compromise your account.</span>
            </div>
          </div>
        </div>
        {/* <div className="export-mnemonic-page__work-section">
          <div className="export-mnemonic-page__title">{name}</div>

          <div
            className="export-mnemonic-page__confirmation-button"
            onClick={() => {
            }}
          >
            <p>Confirm</p>
          </div>

          <div className="export-mnemonic-page__body-text">
            <span className="export-mnemonic-page__warning-color">WARNING: </span>
            <span>Never disclose your backup phrase. Anyone with this phrase can compromise your account.</span>
          </div>
        </div> */}

        <div className="export-mnemonic-page__footer-bar">
          <div className="export-mnemonic-page__did-label">{address}</div>
        </div>
      </div>
    )
  }
}

ExportMnemonicPage.propTypes = {
}

export default ExportMnemonicPage
