import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
const { getSelectedIdentity } = require('../../../selectors')
const actions = require('../../../actions')


import ExportMnemonicPage from './export-mnemonic-page.component'

const mapStateToProps = state => {
  const { metamask: { isUnlocked, selectedAddress } } = state
  
  return {
    mnemonic: state.appState.accountDetail.mnemonic,
    selectedIdentity: getSelectedIdentity(state),
    isUnlocked,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    exportAccount: (password, address) => dispatch(actions.requestRevealSeedWords(password))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ExportMnemonicPage)
