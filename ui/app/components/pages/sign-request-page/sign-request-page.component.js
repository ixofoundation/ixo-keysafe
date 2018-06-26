import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import { DEFAULT_ROUTE } from '../../../../app/routes'
import KeyValueItem from '../../key-value-item/key-value-item'


class SignRequestPage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }
  
  initialCapSentence(str) {
    const spacedString = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2')
    return spacedString.charAt(0).toUpperCase() + spacedString.substr(1)
  }

  assembleIndentedItems(itemObject, assembledItems, level) {
    const itemKeys = Object.keys(itemObject)

    for (var i=0; i<itemKeys.length; i++) {
      const key = itemKeys[i]
      const value = itemObject[key]

      if (Array.isArray(value)) {
        assembledItems.push(<KeyValueItem key={this.initialCapSentence(key)+''+i+level} displayKey={this.initialCapSentence(key)} indentLevel={level}/>)
        for (var x=0; x<value.length; x++) {
          const valueArrayItem = value[x]
          if (typeof valueArrayItem === 'object') {
            this.assembleIndentedItems(valueArrayItem, assembledItems, level)
          } else {
            assembledItems.push(<KeyValueItem key={this.initialCapSentence(key)+''+i+x+level} displayValue={valueArrayItem} indentLevel={level}/>)
          }
        }
      } else if (typeof value === 'object') {
        assembledItems.push(<KeyValueItem key={this.initialCapSentence(key)+''+i+level} displayKey={this.initialCapSentence(key)} indentLevel={level}/>)
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
    const { selectedIdentity, txData, signIxoMessage_Call2, cancelIxoMessage } = this.props
    const { address } = selectedIdentity
    const { msgParams: { data } } = txData

    return (
      <div className="sign-request-page">

        <div className="sign-request-page__content-container">
          <div  className="sign-request-page__nav-bar">
            <div className="sign-request-page__description">Signature request</div>
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
              onClick={(event) => {
                cancelIxoMessage(event).then(() => this.props.history.push(DEFAULT_ROUTE))
              }}
            >
              <p>{this.context.t('cancel')}</p>
            </div>
            <div
              className="sign-request-page__button sign-request-page__button-primary"
              onClick={(event) => {
                signIxoMessage_Call2(event).then(() => this.props.history.push(DEFAULT_ROUTE))
              }}
            >
              <p>{this.context.t('sign')}</p>
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
