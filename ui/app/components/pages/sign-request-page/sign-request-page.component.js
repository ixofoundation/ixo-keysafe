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

  assembleIndentedItems(itemObject, assembledItems, level) {
    const itemKeys = Object.keys(itemObject)

    for (var i=0; i<itemKeys.length; i++) {
      const key = itemKeys[i]
      const value = itemObject[key]

      if (Array.isArray(value)) {
        for (var x=0; x<value.length; x++) {
          this.assembleIndentedItems(value[x], assembledItems, null)
        }
      } else if (typeof value === 'object') {
        this.assembleIndentedItems(value, assembledItems, level+1)
      } else {
        assembledItems.push(<KeyValueItem key={this.initialCapSentence(key)+''+i+level} displayKey={this.initialCapSentence(key)} displayValue={value} indentLevel={level}/>)
      }      
    }

    return assembledItems
  }

  renderDataToSign (itemsObject) {
    let assembledItems = []
    this.assembleIndentedItems(itemsObject, assembledItems, 0)
    return <div className="sign-request-page__signed-data-section">{assembledItems}</div>
  }

  render () {
    const { isMenuDisplaying } = this.state
    const { selectedIdentity, txData } = this.props
    const { msgParams: { data } } = txData
    const { address } = selectedIdentity

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
            this.renderDataToSign(JSON.parse(data))
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
