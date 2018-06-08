/*global Web3*/
cleanContextForImports()
require('web3/dist/web3.min.js')
const log = require('loglevel')
const LocalMessageDuplexStream = require('post-message-stream')
const IxoKeysafeInpageProvider = require('./lib/ixo-keysafe-inpage-provider')
restoreContextAfterImports()

log.setDefaultLevel(process.env.METAMASK_DEBUG ? 'debug' : 'warn')

//
// setup IxoCM
//

if (typeof window.ixoCm !== 'undefined') {
  throw new Error(`IXO Keysafe already injected.
  IXO Keysafe can only be injected once.`)
}
log.debug('IXO Keysafe - injected')
// export global IxoInpageProvider, with usage-detection
global.ixoKs = IxoKeysafeInpageProvider

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
    console.warn('IXO Keysafe - global.define could not be deleted.')
  }
}

/**
 * Restores global define object from cached reference
 */
function restoreContextAfterImports () {
  try {
    global.define = __define
  } catch (_) {
    console.warn('IXO Keysafe - global.define could not be overwritten.')
  }
}
