const { Component } = require('react')
const PropTypes = require('prop-types')
const connect = require('react-redux').connect
const { Route, Switch, withRouter, matchPath } = require('react-router-dom')
const { compose } = require('recompose')
const h = require('react-hyperscript')
const actions = require('./actions')
const classnames = require('classnames')
const log = require('loglevel')

// init
const InitializeScreen = require('../../mascara/src/app/first-time').default
// accounts
const SendTransactionScreen2 = require('./components/send/send-v2-container')
const ConfirmTxScreen = require('./conf-tx')

// other views
const Home = require('./components/pages/home')
const Authenticated = require('./components/pages/authenticated')
const Initialized = require('./components/pages/initialized')
const Settings = require('./components/pages/settings')
const UnlockPage = require('./components/pages/unlock-page')
const RestoreVaultPage = require('./components/pages/keychains/restore-vault')
const RevealSeedConfirmation = require('./components/pages/keychains/reveal-seed')
const ExportMnemonicPage = require('./components/pages/export-mnemonic-page')
const AddTokenPage = require('./components/pages/add-token')
const CreateAccountPage = require('./components/pages/create-account')
const NoticeScreen = require('./components/pages/notice')

const Loading = require('./components/loading-screen')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
const NetworkDropdown = require('./components/dropdowns/network-dropdown')
// const AccountMenu = require('./components/account-menu')

// Global Modals
const Modal = require('./components/modals/index').Modal

const AppHeader = require('./components/app-header')

// Routes
const {
  DEFAULT_ROUTE,
  UNLOCK_ROUTE,
  SETTINGS_ROUTE,
  REVEAL_SEED_ROUTE,
  EXPORT_MNEMONIC_ROUTE,
  RESTORE_VAULT_ROUTE,
  ADD_TOKEN_ROUTE,
  NEW_ACCOUNT_ROUTE,
  SEND_ROUTE,
  CONFIRM_TRANSACTION_ROUTE,
  INITIALIZE_ROUTE,
  NOTICE_ROUTE,
} = require('./routes')

class App extends Component {
  // componentWillMount () {
  //   const { currentCurrency, setCurrentCurrencyToUSD } = this.props

  //   if (!currentCurrency) {
  //     setCurrentCurrencyToUSD()
  //   }
  // }

  renderRoutes () {
    const exact = true

    return (
      h(Switch, [
        h(Route, { path: INITIALIZE_ROUTE, component: InitializeScreen }),
        h(Initialized, { path: UNLOCK_ROUTE, exact, component: UnlockPage }),
        h(Initialized, { path: RESTORE_VAULT_ROUTE, exact, component: RestoreVaultPage }),
        h(Authenticated, { path: REVEAL_SEED_ROUTE, exact, component: RevealSeedConfirmation }),
        h(Authenticated, { path: EXPORT_MNEMONIC_ROUTE, exact, component: ExportMnemonicPage }),
        h(Authenticated, { path: SETTINGS_ROUTE, component: Settings }),
        h(Authenticated, { path: NOTICE_ROUTE, exact, component: NoticeScreen }),
        h(Authenticated, { path: CONFIRM_TRANSACTION_ROUTE, component: ConfirmTxScreen }),
        h(Authenticated, { path: SEND_ROUTE, exact, component: SendTransactionScreen2 }),
        h(Authenticated, { path: ADD_TOKEN_ROUTE, exact, component: AddTokenPage }),
        h(Authenticated, { path: NEW_ACCOUNT_ROUTE, component: CreateAccountPage }),
        h(Authenticated, { path: DEFAULT_ROUTE, exact, component: Home }),
      ])
    )
  }

  renderAppHeader () {
    const { location } = this.props
    const isInitializing = matchPath(location.pathname, {
      path: INITIALIZE_ROUTE, exact: false,
    })

    return isInitializing ? null : h(AppHeader)
  }

  render () {
    const {
      isLoading,
      loadingMessage,
      network,
      isMouseUser,
      provider,
      frequentRpcList,
      currentView,
      setMouseUserState,
    } = this.props
    // const isLoadingNetwork = network === 'loading' && currentView.name !== 'config'
    // const loadMessage = loadingMessage || isLoadingNetwork ?
    //   this.getConnectingLabel() : null
    log.debug('Main ui render function')

    return (
      h('', {
        className: classnames({ 'mouse-user-styles': isMouseUser }),
        style: {
          overflowX: 'hidden',
          position: 'relative',
          alignItems: 'center',
        },
        tabIndex: '0',
        onClick: () => setMouseUserState(true),
        onKeyDown: (e) => {
          if (e.keyCode === 9) {
            setMouseUserState(false)
          }
        },
      }, [

        // global modal
        h(Modal, {}, []),

        this.renderAppHeader(),

        // // sidebar
        // this.renderSidebar(),

        // h(AccountMenu),

        // (isLoading || isLoadingNetwork) && h(Loading, {
        //   loadingMessage: loadMessage,
        //   fullScreen: true,
        // }),

        // content
        this.renderRoutes(),
      ])
    )
  }

  renderGlobalModal () {
    return h(Modal, {
      ref: 'modalRef',
    }, [
      // h(BuyOptions, {}, []),
    ])
  }

  toggleMetamaskActive () {
    if (!this.props.isUnlocked) {
      // currently inactive: redirect to password box
      var passwordBox = document.querySelector('input[type=password]')
      if (!passwordBox) return
      passwordBox.focus()
    } else {
      // currently active: deactivate
      this.props.dispatch(actions.lockMetamask(false))
    }
  }

  getConnectingLabel = function () {
    const { provider } = this.props
    const providerName = provider.type

    let name

    if (providerName === 'mainnet') {
      name = this.context.t('connectingToMainnet')
    } else if (providerName === 'ropsten') {
      name = this.context.t('connectingToRopsten')
    } else if (providerName === 'kovan') {
      name = this.context.t('connectingToRopsten')
    } else if (providerName === 'rinkeby') {
      name = this.context.t('connectingToRinkeby')
    } else {
      name = this.context.t('connectingToUnknown')
    }

    return name
  }

  getNetworkName () {
    const { provider } = this.props
    const providerName = provider.type

    let name

    if (providerName === 'mainnet') {
      name = this.context.t('mainnet')
    } else if (providerName === 'ropsten') {
      name = this.context.t('ropsten')
    } else if (providerName === 'kovan') {
      name = this.context.t('kovan')
    } else if (providerName === 'rinkeby') {
      name = this.context.t('rinkeby')
    } else {
      name = this.context.t('unknownNetwork')
    }

    return name
  }
}

App.propTypes = {
  currentCurrency: PropTypes.string,
  setCurrentCurrencyToUSD: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  network: PropTypes.string,
  provider: PropTypes.object,
  frequentRpcList: PropTypes.array,
  currentView: PropTypes.object,
  sidebarOpen: PropTypes.bool,
  hideSidebar: PropTypes.func,
  isMascara: PropTypes.bool,
  isOnboarding: PropTypes.bool,
  isUnlocked: PropTypes.bool,
  networkDropdownOpen: PropTypes.bool,
  showNetworkDropdown: PropTypes.func,
  hideNetworkDropdown: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  toggleAccountMenu: PropTypes.func,
  selectedAddress: PropTypes.string,
  noActiveNotices: PropTypes.bool,
  lostAccounts: PropTypes.array,
  isInitialized: PropTypes.bool,
  forgottenPassword: PropTypes.bool,
  activeAddress: PropTypes.string,
  unapprovedTxs: PropTypes.object,
  seedWords: PropTypes.string,
  unapprovedMsgCount: PropTypes.number,
  unapprovedIxoMsgCount: PropTypes.number,
  unapprovedTypedMessagesCount: PropTypes.number,
  welcomeScreenSeen: PropTypes.bool,
  isPopup: PropTypes.bool,
  betaUI: PropTypes.bool,
  isMouseUser: PropTypes.bool,
  setMouseUserState: PropTypes.func,
  t: PropTypes.func,
}

function mapStateToProps (state) {
  const { appState, metamask } = state
  const {
    networkDropdownOpen,
    sidebarOpen,
    isLoading,
    loadingMessage,
  } = appState

  const {
    identities,
    accounts,
    address,
    keyrings,
    isInitialized,
    noActiveNotices,
    seedWords,
    unapprovedTxs,
    lastUnreadNotice,
    lostAccounts,
    unapprovedMsgCount,
    unapprovedIxoMsgCount,
    unapprovedTypedMessagesCount,
  } = metamask
  const selected = address || Object.keys(accounts)[0]

  return {
    // state from plugin
    networkDropdownOpen,
    sidebarOpen,
    isLoading,
    loadingMessage,
    noActiveNotices,
    isInitialized,
    isUnlocked: state.metamask.isUnlocked,
    selectedAddress: state.metamask.selectedAddress,
    currentView: state.appState.currentView,
    activeAddress: state.appState.activeAddress,
    transForward: state.appState.transForward,
    isMascara: state.metamask.isMascara,
    isOnboarding: Boolean(!noActiveNotices || seedWords || !isInitialized),
    isPopup: state.metamask.isPopup,
    seedWords: state.metamask.seedWords,
    unapprovedTxs,
    unapprovedMsgs: state.metamask.unapprovedMsgs,
    unapprovedMsgCount,
    unapprovedIxoMsgCount,
    unapprovedTypedMessagesCount,
    menuOpen: state.appState.menuOpen,
    network: state.metamask.network,
    provider: state.metamask.provider,
    forgottenPassword: state.appState.forgottenPassword,
    lastUnreadNotice,
    lostAccounts,
    frequentRpcList: state.metamask.frequentRpcList || [],
    currentCurrency: state.metamask.currentCurrency,
    isMouseUser: state.appState.isMouseUser,
    betaUI: state.metamask.featureFlags.betaUI,
    isRevealingSeedWords: state.metamask.isRevealingSeedWords,
    Qr: state.appState.Qr,
    welcomeScreenSeen: state.metamask.welcomeScreenSeen,

    // state needed to get account dropdown temporarily rendering from app bar
    identities,
    selected,
    keyrings,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    hideSidebar: () => dispatch(actions.hideSidebar()),
    showNetworkDropdown: () => dispatch(actions.showNetworkDropdown()),
    hideNetworkDropdown: () => dispatch(actions.hideNetworkDropdown()),
    setCurrentCurrencyToUSD: () => dispatch(actions.setCurrentCurrency('usd')),
    toggleAccountMenu: () => dispatch(actions.toggleAccountMenu()),
    setMouseUserState: (isMouseUser) => dispatch(actions.setMouseUserState(isMouseUser)),
  }
}

App.contextTypes = {
  t: PropTypes.func,
}

module.exports = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App)
