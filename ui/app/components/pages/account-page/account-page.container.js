import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
const { getSelectedIdentity } = require('../../../selectors')
const actions = require('../../../actions')


import AccountPage from './account-page.component'

const mapStateToProps = state => {
  const { metamask: { isUnlocked, selectedAddress } } = state
  
  return {
    selectedIdentity: getSelectedIdentity(state),
    isUnlocked,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    revealSeedWords: () => dispatch(actions.showModal({name: 'REVEAL_SEED_CONFIRMATION'})),
    saveAccountLabel: (address, label) => dispatch(actions.saveAccountLabel(address, label)),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountPage)
