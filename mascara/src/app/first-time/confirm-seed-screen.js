import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import shuffle from 'lodash.shuffle'
import { compose } from 'recompose'
import Identicon from '../../../../ui/app/components/identicon'
import { confirmSeedWords, showModal } from '../../../../ui/app/actions'
import Breadcrumbs from './breadcrumbs'
import LoadingScreen from './loading-screen'
import { DEFAULT_ROUTE, INITIALIZE_BACKUP_PHRASE_ROUTE } from '../../../../ui/app/routes'

class ConfirmSeedScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    address: PropTypes.string,
    seedWords: PropTypes.string,
    confirmSeedWords: PropTypes.func,
    history: PropTypes.object,
    openAccountDetailsModal: PropTypes.func,
  };

  static defaultProps = {
    seedWords: '',
  }

  constructor (props) {
    super(props)
    const { seedWords } = props
    this.state = {
      selectedSeeds: [],
      shuffledSeeds: seedWords && shuffle(seedWords.split(' ')) || [],
    }
  }

  componentWillMount () {
    const { seedWords, history } = this.props

    if (!seedWords) {
      history.push(DEFAULT_ROUTE)
    }
  }

  handleClick () {
    const { confirmSeedWords, history, openAccountDetailsModal } = this.props

    confirmSeedWords()
      .then(() => {
        history.push(DEFAULT_ROUTE)
        openAccountDetailsModal()
      })
  }

  render () {
    const { seedWords, history } = this.props
    const { selectedSeeds, shuffledSeeds } = this.state
    const isValid = seedWords === selectedSeeds.map(([_, seed]) => seed).join(' ')

    return (
      <div className="first-time-flow">
      {
        this.props.isLoading
          ? <LoadingScreen loadingMessage="Creating your new account" />
          : (
            <div className="first-view-main-wrapper">
              <div  className="nav-bar">
                <a
                  className="back-nav-button"
                  onClick={e => {
                    e.preventDefault()
                    this.props.history.goBack()
                  }}
                  href="#"
                />
            </div>
            <div className="first-view-main">
              <div className="backup-phrase">
                <Identicon className="first-time-flow__seedscreen-image-frieze" address={this.props.address} diameter={54} />
                <div className="backup-phrase__content-wrapper">
                  <div>
                    <div className="backup-phrase__title">
                      Confirm your Secret Backup Phrase
                    </div>
                    <div className="backup-phrase__body-text">
                      Please select each phrase in order to make sure it is correct.
                    </div>
                    <div className="backup-phrase__confirm-secret">
                      {selectedSeeds.map(([_, word], i) => (
                        <button
                          key={i}
                          className="backup-phrase__confirm-seed-option"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                    <div className="backup-phrase__confirm-seed-options">
                      {shuffledSeeds.map((word, i) => {
                        const isSelected = selectedSeeds
                          .filter(([index, seed]) => seed === word && index === i)
                          .length

                        return (
                          <button
                            key={i}
                            className={classnames('backup-phrase__confirm-seed-option', {
                              'backup-phrase__confirm-seed-option--selected': isSelected,
                            })}
                            onClick={() => {
                              if (!isSelected) {
                                this.setState({
                                  selectedSeeds: [...selectedSeeds, [i, word]],
                                })
                              } else {
                                this.setState({
                                  selectedSeeds: selectedSeeds
                                    .filter(([index, seed]) => !(seed === word && index === i)),
                                })
                              }
                            }}
                          >
                            {word}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div  className="footer-bar">
                <div
                    className="first-time-flow__button first-time-flow__unique-image-button"
                    onClick={() => {
                      isValid && this.handleClick()
                    }}
                    disabled={!isValid}
                >
                  <p>Next</p>
                </div>
                <div className="first-time-flow__step-indication-breadcrumbs">
                  <Breadcrumbs total={3} currentIndex={2} />
                </div>          
              </div>                        
            </div>
            </div>
          )
      }
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(
    ({ metamask: { selectedAddress, seedWords }, appState: { isLoading } }) => ({
      seedWords,
      isLoading,
      address: selectedAddress,
    }),
    dispatch => ({
      confirmSeedWords: () => dispatch(confirmSeedWords()),
      openAccountDetailsModal: () => dispatch(showModal({ name: 'ACCOUNT_DETAILS'})),
    })
  )
)(ConfirmSeedScreen)
