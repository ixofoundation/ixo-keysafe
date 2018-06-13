import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { default as MaterialTextField } from 'material-ui/TextField'

const styles = {
  cssDefault: {
    color: '#f0f0f0'
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#61abce',
    },
    '&$cssError': {
      color: '#61abce',
    },
    color: '#ffffff',
    fontFamily: 'Roboto'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      backgroundColor: '#61abce',
    },
  },
  cssError: {},
  cssInput: {
    '&:after': {
      backgroundColor: '#61abce',
    },
    color: "#ffffff"
  }
}

const TextField = props => {
  const { error, classes, ...textFieldProps } = props
  return (
    <MaterialTextField
      error={Boolean(error)}
      helperText={error}
      InputLabelProps={{
        FormLabelClasses: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
          error: classes.cssError,
        },
      }}

      InputProps={{
        className: classes.cssInput,
      }}

      {...textFieldProps}
    />
  )
}

TextField.defaultProps = {
  error: null,
}

TextField.propTypes = {
  error: PropTypes.string,
  classes: PropTypes.object,
}

export default withStyles(styles)(TextField)
