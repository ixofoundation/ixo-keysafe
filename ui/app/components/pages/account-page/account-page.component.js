import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../identicon'
import EditableLabel from '../../editable-label'


class AccountPage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      password: '',
      error: null,
    }
  }

  render () {
    const { selectedIdentity, revealSeedWords,  saveAccountLabel} = this.props
    const { name, address } = selectedIdentity

    return (
      <div className="account-page">
        <div  className="account-page__nav-bar">
          <div className="account-page__ixo-logo-letters account-page__nav-image-item"/>
          <div className="account-page__ixo-menu-burger account-page__nav-image-item"/>
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
            <Identicon address={address} diameter={250} />
          </div>
        </div>

        <div className="account-page__footer-bar">
          <div
            className="account-page__export-pk-button"
            onClick={() => {}}
          >
            <p>Export Private Key</p>
          </div>
        </div>
      </div>
)
  }
}

AccountPage.propTypes = {
}

export default AccountPage
