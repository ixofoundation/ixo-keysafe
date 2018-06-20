import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import EditableLabel from '../../editable-label'
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
          <div className="export-mnemonic-page__description">{name}</div>
          <div className="export-mnemonic-page__unique-image-frieze">
            <Identicon address={address} diameter={35} />
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
