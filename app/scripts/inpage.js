/*global Web3*/
cleanContextForImports()
require('web3/dist/web3.min.js')
const log = require('loglevel')
const LocalMessageDuplexStream = require('post-message-stream')
const setupDappAutoReload = require('./lib/auto-reload.js')
const IxoInpageProvider = require('./lib/ixo-inpage-provider')
restoreContextAfterImports()

log.setDefaultLevel(process.env.METAMASK_DEBUG ? 'debug' : 'warn')

// compose the inpage provider
var inpageProvider = new IxoInpageProvider()

//
// setup IxoCM
//

if (typeof window.ixoCm !== 'undefined') {
  throw new Error(`MetaMask II detected another web3.
     MetaMask II will not work reliably with another web3 extension.
     This usually happens if you have two MetaMasks installed,
     or MetaMask and another web3 extension. Please remove one
     and try again.`)
}
log.debug('IxoCM - injected')
// export global IxoInpageProvider, with usage-detection
global.ixoCm = inpageProvider

// need to make sure we aren't affected by overlapping namespaces
// and that we dont affect the app with our namespace
// mostly a fix for web3's BigNumber if AMD's "define" is defined...
var __define

/**
 * Caches reference to global define object and deletes it to
 * avoid conflicts with other global define objects, such as
 * AMD's define function
 */
function cleanContextForImports () {
  __define = global.define
  try {
    global.define = undefined
  } catch (_) {
    console.warn('MetaMask - global.define could not be deleted.')
  }
}

/**
 * Restores global define object from cached reference
 */
function restoreContextAfterImports () {
  try {
    global.define = __define
  } catch (_) {
    console.warn('MetaMask - global.define could not be overwritten.')
  }
}
