const EventEmitter = require('events').EventEmitter
const sovrin = require('sovrin-did');
const bip39 = require('bip39')
const crypto = require('crypto');
const ethUtil = require('ethereumjs-util')
const sigUtil = require('eth-sig-util')
const hdkey = require('ethereumjs-wallet/hdkey')
const bs58 = require("bs58")
var dateFormat = require('dateformat')
var cc = require('five-bells-condition');


// Options:
const hdPathString = `m/44'/60'/0'/0`
const type = 'sovrin'
const SOV_DID_PREFIX = 'did:sov:'

class SovrinKeyring extends EventEmitter {

  /* PUBLIC METHODS */

  constructor (opts = {}) {
    super()
    this.type = type
    this.deserialize(opts)
    console.log("Constructor: " + opts)
  }

  serialize () {
    console.log("serialize: ")
    return Promise.resolve({
      mnemonic: this.mnemonic,
      numberOfAccounts: this.wallets.length,
      hdPath: this.hdPath,
    })
  }

  deserialize (opts = {}) {
    this.opts = opts || {}
    this.wallets = []
    this.mnemonic = null
    this.root = null
    this.hdPath = opts.hdPath || hdPathString

    if (opts.mnemonic) {
      this._initFromMnemonic(opts.mnemonic)
    }

    if (opts.numberOfAccounts) {
      return this.addAccounts(opts.numberOfAccounts)
    }

    console.log("deserialize: " + opts)
    return Promise.resolve([])
  }

  //We only allow one account to be created
  addAccounts (numberOfAccounts = 1) {
    console.log("addAccounts: " + numberOfAccounts)
    if (!this.root) {
      this._initFromMnemonic(bip39.generateMnemonic())
    }

    const oldLen = this.wallets.length
    const newWallets = []
    for (let i = oldLen; i < numberOfAccounts + oldLen; i++) {
      const wallet = this.deriveSovrinDid(this.root, i)
      newWallets.push(wallet)
      this.wallets.push(wallet)
    }
    const hexWallets = newWallets.map((w) => {
      return SOV_DID_PREFIX + w.did
    })
    return Promise.resolve(hexWallets)
  }

  //TODO: Generate new Sovrin did based off index and seed
  deriveSovrinDid (seed, i) {
    // Create the Sovrin DID
    return sovrin.fromSeed(seed);
  }

  getAccounts () {
    console.debug("getAccounts: ")
    return Promise.resolve(this.wallets.map((w) => {
      return SOV_DID_PREFIX + w.did
    }))
  }

  //Generates didDoc from did and verify key
  getDidDoc () {
    console.debug("getDidDoc: ")
    return Promise.resolve(this.wallets.map((w) => {
      const did = SOV_DID_PREFIX + w.did
      const pubKey = w.verifyKey
      const credentials = []


      const didDoc = {
        didDoc: {
          did,
          pubKey,
          credentials
        }
      };
      return didDoc
    }))
  }

  // tx is an instance of the ethereumjs-transaction class.
  signTransaction (did, tx) {
    const wallet = this._getWalletForAccount(did)
    var privKey = wallet.getPrivateKey()
    tx.sign(privKey)
    return Promise.resolve(tx)
  }

  // For eth_sign, we need to sign transactions:
  // hd
  signMessage (withAccount, data) {
    const sdid = this._getWalletForAccount(withAccount)
    const signature = bs58.encode(sovrin.signMessage(new Buffer(data), sdid.secret.signKey, sdid.verifyKey))
    return Promise.resolve(signature)
  }

  //Signs a document using signKey from generated SDID and returns the signature
  signIxoMessage_Call6(accountDid, msg) {
    const sdid = this._getWalletForAccount(accountDid)
    var signature = sovrin.signMessage(msg, sdid.secret.signKey, sdid.verifyKey)
    if (this.verifyDocumentSignature(signature, sdid.verifyKey)) {
        return this.generateSignatureObject(accountDid, sdid.encryptionPublicKey, signature)
    } else {
        throw new Error('fulfillment validation failed')
    }
  }

  verifyDocumentSignature(signature, publicKey) {
    return !(sovrin.verifySignedMessage(signature, publicKey) === false)
  }

  generateSignatureObject(did, publicKey, signature) {
    const signatureObject = {
      type: cc.Ed25519Sha256.TYPE_NAME,
      created: dateFormat(new Date(), "isoUtcDateTime"),
      creator: did,
      publicKey: publicKey,
      signatureValue: this.hexEncodedFirst64Bytes(signature)
    };
    return signatureObject
  }

  hexEncodedFirst64Bytes(text) {
    return new Buffer(text).slice(0, 64).toString("hex").toUpperCase()
  }

  // eth_signTypedData, signs data along with the schema
  signTypedData (withAccount, typedData) {
    const sdid = this._getWalletForAccount(withAccount)
    const signature = bs58.encode(sovrin.signMessage(new Buffer(data), sdid.secret.signKey, sdid.verifyKey))
    return Promise.resolve(signature)
  }

  exportAccount (did) {
    const sdid = this._getWalletForAccount(did)
    return Promise.resolve(sdid.secret.seed)
  }


  /* PRIVATE METHODS */

  _initFromMnemonic (mnemonic) {
    console.log("_initFromMnemonic: '" + mnemonic + "'")
    this.mnemonic = mnemonic
    const seed = crypto.createHash('sha256').update(mnemonic).digest("hex");

    // Convert SHA256 hash to Uint8Array
    const didSeed = new Uint8Array(32);
    for (var i = 0; i < 32; ++i) {
        didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16)
    }

    this.root = didSeed
  }


  _getWalletForAccount (account) {
    console.log("_getWalletForAccount: " + account)
    const targetAddress = account.substring(SOV_DID_PREFIX.length)
    return this.wallets.find((w) => {
      const address = w.did
      return ((address === targetAddress) ||
              (address.substring(SOV_DID_PREFIX.length) === targetAddress))
    })
  }
}

SovrinKeyring.type = type
module.exports = SovrinKeyring