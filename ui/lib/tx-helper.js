const valuesFor = require('../app/util').valuesFor
const log = require('loglevel')

module.exports = function (unapprovedTxs, unapprovedMsgs, ixoMsgs, typedMessages, network) {
  log.debug('tx-helper called with params:')
  log.debug({ unapprovedTxs, unapprovedMsgs, ixoMsgs, typedMessages, network })

  const txValues = network ? valuesFor(unapprovedTxs).filter(txMeta => txMeta.metamaskNetworkId === network) : valuesFor(unapprovedTxs)
  log.debug(`tx helper found ${txValues.length} unapproved txs`)

  const msgValues = valuesFor(unapprovedMsgs)
  log.debug(`tx helper found ${msgValues.length} unsigned messages`)
  let allValues = txValues.concat(msgValues)

  const ixoValues = valuesFor(ixoMsgs)
  log.debug(`tx helper found ${ixoValues.length} unsigned ixo messages`)
  allValues = allValues.concat(ixoValues)

  const typedValues = valuesFor(typedMessages)
  log.debug(`tx helper found ${typedValues.length} unsigned typed messages`)
  allValues = allValues.concat(typedValues)

  allValues = allValues.sort((a, b) => {
    return a.time > b.time
  })

  return allValues
}
