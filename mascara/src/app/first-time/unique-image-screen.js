import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import {connect} from 'react-redux'
import Identicon from '../../../../ui/app/components/identicon'
import Breadcrumbs from './breadcrumbs'
import { INITIALIZE_NOTICE_ROUTE } from '../../../../ui/app/routes'

class UniqueImageScreen extends Component {
  static propTypes = {
    address: PropTypes.string,
    history: PropTypes.object,
  }

  render () {
    return (
      <div className="unique-account-image">
        <div  className="nav-bar">
        </div>
        <div className="unique-image">
          <Identicon className="first-time-flow__unique-image-frieze" address={this.props.address} diameter={70} />
          <div className="unique-image__title">
            <span className="first-time-flow__context-color">Step1: </span>
            <span>Your unique account image</span>
          </div>
          <div className="unique-image__body-text">
            This image was programmatically generated for you by your new account number.
          </div>
          <div className="unique-image__body-text">
            You’ll see this image everytime you sign a new project or claim.
          </div>
        </div>
        <div  className="footer-bar">
          <div
            className="first-time-flow__button first-time-flow__unique-image-button"
            onClick={() => {
              this.props.history.push(INITIALIZE_NOTICE_ROUTE)
            }}
          >
            <p>Next</p>
          </div>
          <div className="first-time-flow__step-indication-breadcrumbs">
            <Breadcrumbs total={3} currentIndex={0} />
          </div>          
        </div>
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(
    ({ metamask: { selectedAddress } }) => ({
      address: selectedAddress,
    })
  )
)(UniqueImageScreen)
