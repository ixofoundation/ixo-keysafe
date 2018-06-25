import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import EditableLabel from '../../editable-label'
import TextField from '../../text-field'
const h = require('react-hyperscript')
const Tooltip = require('../../tooltip-v2.js')
const copyToClipboard = require('copy-to-clipboard')
const qrCode = require('qrcode-npm').qrcode



class ExportMnemonicPage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      hasCopied: false,
      copyToClipboardPressed: false,
      mnemonic: null,
      password: ''
    }
  }

  exportAccountAndRevealSeedWords (password, address) {
    const { exportAccount } = this.props
  
    exportAccount(password, address)
      .then(mnemonic => this.setState({ mnemonic }))
  }

  handleInputChange ({ target }) {
    this.setState({ password: target.value, error: null })
  }

  isValid () {
    return this.state.password.length >= 8
  }

  renderPasswordConfirmation (address) {
    const { error } = this.state
    return (
      <div className="export-mnemonic-page__content-item export-mnemonic-page__work-area export-mnemonic-page__bounded-background">
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

        <div className={"export-mnemonic-page__confirmation-button" + (this.isValid()?" export-mnemonic-page__confirmation-button-enabled":"")}
          onClick={() => {
            this.exportAccountAndRevealSeedWords(this.state.password, address)
          }}
        >
          <p>Confirm</p>
        </div>
      </div>
    )    
  }

  renderQRCode (mnemonic, name) {
    if (mnemonic) {
      const qrImage = qrCode(7, 'M')
      const qrData = JSON.stringify({mnemonic, name})
      qrImage.addData(qrData)
      qrImage.make()

      return h('export-mnemonic-page__qr-code', {
        style: 
        {
          'border': '1px solid #08202F',
          'background-color': 'white'
        },
        dangerouslySetInnerHTML: {
          __html: qrImage.createTableTag(4),
        },
      })
    } else {
      return null
    }
  }

  renderPrivateInformation (mnemonic, name) {
    return (
      <div className="export-mnemonic-page__content-item export-mnemonic-page__work-area">
        {this.renderQRCode(mnemonic, name)}
        <Tooltip 
          position ="bottom"
          title = {this.state.hasCopied ? this.context.t('copiedExclamation') : this.context.t('copyToClipboard')}
          wrapperClassName="export-mnemonic-page__wide-area"
        >
          <div onClick = {() => {
            copyToClipboard(mnemonic)
            this.setState({ hasCopied: true })
            setTimeout(() => this.setState({ hasCopied: false }), 3000)
          }}
          >
            <div className="export-mnemonic-page__mnemonic-text export-mnemonic-page__bounded-background">
            <div className="export-mnemonic-page__mnemonic-text-value">{mnemonic}</div>
            <div className="export-mnemonic-page__did-copy-button">Copy</div>
            </div>
          </div>
        </Tooltip>
      </div>
    )
  }

  render () {
    const { mnemonic } = this.state
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

          {mnemonic && this.renderPrivateInformation(mnemonic, name)}
          {!mnemonic && this.renderPasswordConfirmation(address)}

          <div className="export-mnemonic-page__content-item">
            <div className="export-mnemonic-page__subtext">
              <span className="export-mnemonic-page__warning-color">WARNING: </span>
              <span>Never disclose your backup phrase. Anyone with this phrase can compromise your account.</span>
            </div>
          </div>
        </div>

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
