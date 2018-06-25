import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
const { getSelectedIdentity } = require('../../../selectors')
const actions = require('../../../actions')


import SignRequestPage from './sign-request-page.component'

const mapStateToProps = state => {
  const { metamask: { selectedAddress } } = state
  
  return {
    selectedIdentity: getSelectedIdentity(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SignRequestPage)
