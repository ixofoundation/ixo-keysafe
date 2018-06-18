import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'

class AccountPage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  constructor (props) {
    super(props)
debugger
    this.state = {
      password: '',
      error: null,
    }
  }

  render () {

    return (
      <div className="account-page">
        <div  className="account-page__nav-bar">
        </div>
        <div className="account-page__unique-image">
          <Identicon className="account-page__unique-image-frieze" address={this.props.address} diameter={70} />
        </div>

        <div className="account-page__footer-bar">    
        </div>
      </div>
)
  }
}

AccountPage.propTypes = {
}

export default AccountPage
