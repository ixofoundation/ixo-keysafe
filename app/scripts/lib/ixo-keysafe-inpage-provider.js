const uniqid = require('uniqid')

class IxoKeysafeInpageProvider {

  // PUBLIC METHODS
  //
  // THE FIRST SECTION OF METHODS ARE PUBLIC-FACING,
  // MEANING THEY ARE USED BY CONSUMERS OF THIS CLASS.
  //
  // THEIR SURFACE AREA SHOULD BE CHANGED WITH GREAT CARE.

  constructor (opts) {
      console.debug('CTOR of IxoKeysafeInpageProvider')
      this.callbacks = {}
      this.registerWindowListener()
  }

  requestSigning (data, cb, enc='hex') {
    const ixoKsId = uniqid()
    this.callbacks[ixoKsId] = cb
    const method = 'ixo-sign'
    this.postMessageToContentscript(method, ixoKsId, data, enc)
  }

  getInfo (cb) {
    const ixoKsId = uniqid()
    this.callbacks[ixoKsId] = cb
    const method = 'ixo-info'
    this.postMessageToContentscript(method, ixoKsId)    
  }

  getDidDoc (cb) {
    const ixoKsId = uniqid()
    this.callbacks[ixoKsId] = cb
    const method = 'ixo-did-doc'
    this.postMessageToContentscript(method, ixoKsId)    
  }

  // PRIVATE METHODS
  //
  // THESE METHODS ARE ONLY USED INTERNALLY TO THE KEYRING-CONTROLLER
  // AND SO MAY BE CHANGED MORE LIBERALLY THAN THE ABOVE METHODS.

  registerWindowListener () {
    console.debug('inside registerWindowListener()')

    /*
    Listen for messages from the page.
    If the message was from the page script, forward it to background.js.
    */
    window.addEventListener("message", (event) => {
      if (event.data.origin === 'ixo-keysafe') {
          const reply = event.data
          this.handleKeysafeReply(reply)
      }      
    })
  }

  postMessageToContentscript (method, ixoKsId, data=null, enc='hex') {
    window.postMessage({
      origin: 'ixo-dapp',
      message: {method, ixoKsId, data, enc}
    }, "*");
  }

  handleKeysafeReply (reply) {
    console.debug(`IxoInpageProvider handling received reply:  ${JSON.stringify(reply)}`)
    const callback = this.callbacks[reply.ixoKsId]
    if (callback) {
      delete this.callbacks[reply.ixoKsId]
      callback(reply.error, reply.response)
    }
  }
}

module.exports = IxoKeysafeInpageProvider
