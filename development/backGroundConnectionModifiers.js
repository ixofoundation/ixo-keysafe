module.exports = {
  "confirm sig requests": {
    signMessage: (msgData, cb) => {
      const stateUpdate = {
        unapprovedMsgs: {},
        unapprovedMsgCount: 0,
      }
      return cb(null, stateUpdate)
    },
    signIxoMessage: (msgData, cb) => {
      const stateUpdate = {
        unapprovedIxoMsgs: {},
        unapprovedIxoMsgsCount: 0,
      }
      return cb(null, stateUpdate)
    },
    signTypedMessage: (msgData, cb) => {
      const stateUpdate = {
        unapprovedTypedMessages: {},
        unapprovedTypedMessagesCount: 0,
      }
      return cb(null, stateUpdate)
    },
  },
}

