# IXO Keysafe Browser Extension

## This is a fork of the Metamask Browser Extension
(https://github.com/MetaMask/metamask-extension)

The purpose of this project is for it to enable actors on the IXO blockchain to maintain their credentials and sign requests being ledgered onto the IXO blockchain

## Table of Contents

- [Clientside integration](#integration)
  - [detect absence of Ixo Keystore browser extension](#absent-extension)
  - [instantiate Ixo Keystore browser extension](#instantiate-extension)
  - [request keysafe information](#keysafe-information)
  - [request keysafe DID document](#keysafe-get-did-doc)
  - [request keysafe to present message signing](#keysafe-request-signing)

## Integration

### `absent extension`

In the case of the page loading and not finding the constructor for the IxoKeysafeInpageProvider on the global window object an alert will show indicating this.  All functionality relating to interaction with the Ixo Keysafe will also not be available

```javascript
if (!window["ixoKs"]) {
      window.alert("Please install IXO Keysafe first.");
}
```

### `instantiate extension`

```javascript
const IxoKeysafeInpageProvider = window["ixoKs"];
this.ixoKsProvider = new IxoKeysafeInpageProvider();
```

### `keysafe information`

```javascript
this.ixoKsProvider.getInfo((error, response)=>{
  console.log(`Callback received response for getInfo. response: ${JSON.stringify(response)}, error: ${JSON.stringify(error)}`);
})
```
__a successful response looks like this:__
```
{
	"didDoc": {
		"did": "did:sov:BhHF1yt33YVivywggsKZ4k",
		"pubKey": "6q5GvVbsarDupenM8hmJugjy3yqyRPAAT2ixoQ6XCBuL"
	},
	"name": "Your Account Name"
}
```

### `keysafe get DID doc`

```javascript
this.ixoKsProvider.getDidDoc((error, response)=>{
  if (error) {
    // handle error
  } else {
    // continue with successful response
  }
}
```
__a successful response looks like this:__
```
{
	"didDoc": {
		"did": "did:sov:BhHF1yt33YVivywggsKZ4k",
		"pubKey": "6q5GvVbsarDupenM8hmJugjy3yqyRPAAT2ixoQ6XCBuL"
	}
}
```

### `keysafe request signing`

```javascript
const textToSign = '{"key1": "value1", "key2": "this entire textToSign can be any string really"}';
this.ixoKsProvider.requestSigning(textToSign, (error, response)=>{
  if (error) {
    // handle error
  } else {
    // continue with successful response
  }
})
```
__a successful response looks like this:__
```
{
	"type": "ed25519-sha-256",
	"created": "2018-06-07T14:51:37Z",
	"creator": "did:sov:BhHF1yt33YVivywggsKZ4k",
	"publicKey": "52PTt1eA5gGSiXBuoNwtGrN3p52XKTHb4ayer48MCahR",
	"signatureValue": "B59D2CA3B084C1DE38E08627815AE62EE7DC03E466688267BCACA04B61040DDF8DCDB9CFC713D4B9694B5499281F9ACFE734C663A91E17CA48335F9CC8B58704"
}
```
