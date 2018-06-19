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
        </div>
        <div className="account-page__unique-image">
          <Identicon className="account-page__unique-image-frieze" address={address} diameter={70} />
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
