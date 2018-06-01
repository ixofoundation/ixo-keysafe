const uniqid = require('uniqid')

class IxoInpageProvider {

  // PUBLIC METHODS
  //
  // THE FIRST SECTION OF METHODS ARE PUBLIC-FACING,
  // MEANING THEY ARE USED BY CONSUMERS OF THIS CLASS.
  //
  // THEIR SURFACE AREA SHOULD BE CHANGED WITH GREAT CARE.

  constructor (opts) {
      console.log('CTOR of IxoInpageProvider')
      this.callbacks = {}
      this.registerWindowListener()
  }

  requestMessageSigningFromIxoCM = (data, cb) => {
    const ixoCmId = uniqid()
    this.callbacks[ixoCmId] = cb
    const method = 'ixo-sign'
    this.postMessageToContentscript(method, ixoCmId, data)
  }

  requestInfoFromIxoCM = (cb) => {
    const ixoCmId = uniqid()
    this.callbacks[ixoCmId] = cb
    const method = 'ixo-info'
    this.postMessageToContentscript(method, ixoCmId)    
  }

  // PRIVATE METHODS
  //
  // THESE METHODS ARE ONLY USED INTERNALLY TO THE KEYRING-CONTROLLER
  // AND SO MAY BE CHANGED MORE LIBERALLY THAN THE ABOVE METHODS.

  registerWindowListener () {
    console.log('inside registerWindowListener()')

    /*
    Listen for messages from the page.
    If the message was from the page script, forward it to background.js.
    */
    window.addEventListener("message", (event) => {
      if (event.data.origin === 'ixo-cm') {
          const reply = event.data
          this.handleIxoCMReply(reply)
      }      
    })
  }

  postMessageToContentscript (method, ixoCmId, data = null) {
    window.postMessage({
      origin: 'ixo-dapp',
      message: {method, ixoCmId, data}
    }, "*");
  }

  handleIxoCMReply = (reply) => {
    console.log(`IxoInpageProvider handling received reply:  ${JSON.stringify(reply)}`)
    const callback = this.callbacks[reply.ixoCmId]
    if (callback) {
      delete this.callbacks[reply.ixoCmId]
      callback(reply.error, reply.response)
    }
  }
}

module.exports = IxoInpageProvider
