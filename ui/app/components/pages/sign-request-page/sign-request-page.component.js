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

  renderItems () {
    let items = []

    for (let i = 0; i < 10; i++) {
      items.push(
      <div className="sign-request-page__signed-data-item">
        <div className="sign-request-page__signed-data-item-key">Short description:</div>
        <div className="sign-request-page__signed-data-item-value">Togo provides clean water, basic toilets and good higiene practices are essential for the survival and development of children in Uganda.</div>
      </div>
      )
    }

    return items
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

          <div className="sign-request-page__signed-data-section">
          {/* {
            this.renderItems()
          } */}
            <KeyValueItem/>
          </div>

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
