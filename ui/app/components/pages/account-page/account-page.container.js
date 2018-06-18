import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const {
  tryUnlockMetamask,
  forgotPassword,
  markPasswordForgotten,
  setNetworkEndpoints,
} = require('../../../actions')

import AccountPage from './account-page.component'

const mapStateToProps = state => {
  const { metamask: { isUnlocked, selectedAddress } } = state
  
  return {
    address: selectedAddress,
    isUnlocked,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: () => dispatch(forgotPassword()),
    tryUnlockMetamask: password => dispatch(tryUnlockMetamask(password)),
    markPasswordForgotten: () => dispatch(markPasswordForgotten()),
    setNetworkEndpoints: type => dispatch(setNetworkEndpoints(type)),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountPage)
