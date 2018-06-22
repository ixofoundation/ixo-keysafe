import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import EditableLabel from '../../editable-label'
const Tooltip = require('../../tooltip-v2.js')
const copyToClipboard = require('copy-to-clipboard')
import { EXPORT_MNEMONIC_ROUTE } from '../../../../app/routes'
import KeyValueItem from '../../key-value-item/key-value-item'


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

  initialCapSentence(str) {
    const spacedString = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
    return spacedString.charAt(0).toUpperCase() + spacedString.substr(1)
  }

  renderDataToSign () {
    const { txData } = this.props
    const { type, msgParams: { data } } = txData
  
    const dataObject = JSON.parse(data)
    const dataKeys = Object.keys(dataObject)

    let dataItems = []
    for (var i=0; i<dataKeys.length; i++) {
      const key = dataKeys[i]
      const value = dataObject[key]
      // dataItems.push(<KeyValueItem key={i} displayKey={key} displayValue={JSON.stringify(value)}/>)
      dataItems.push(<KeyValueItem key={i} displayKey={this.initialCapSentence(key)} displayValue={JSON.stringify(value)}/>)
    }

    return <div className="sign-request-page__signed-data-section">{dataItems}</div>
  }

  render () {
    const { isMenuDisplaying } = this.state
    const { selectedIdentity,  saveAccountLabel, lockMetamask} = this.props
    const { name, address } = selectedIdentity

    return (
      <div className="sign-request-page">

        <div className="sign-request-page__content-container">
          <div  className="sign-request-page__nav-bar">
            <a
              className="sign-request-page__back-nav-button"
              onClick={e => {
                e.preventDefault()
                //this.props.history.goBack()
              }}
              href="#"
            />
            <div className="sign-request-page__description">Signature request</div>
            <div className="sign-request-page__right-nav-button"></div>
          </div>

          <div className="sign-request-page__unique-image-frieze">
            <Identicon address={address} diameter={46} />
          </div>

          {
            this.renderDataToSign()
          }
            
          <div className="sign-request-page__footer-bar">
            <div
              className="sign-request-page__button"
              onClick={() => {
                this.props.history.goBack()
              }}
            >
              <p>Cancel</p>
            </div>
            <div
              className="sign-request-page__button sign-request-page__button-primary"
              onClick={() => {
              }}
            >
              <p>Sign</p>
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
