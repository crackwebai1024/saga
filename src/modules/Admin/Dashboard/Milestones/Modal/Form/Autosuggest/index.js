import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import { Field } from 'react-final-form';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './material.styled';
// TODO: Move to components
function renderInputComponent(inputProps) {
  const {
    classes,
    inputRef = () => {},
    ref,
    ...other
  } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted} component="div" style={{ whiteSpace: 'inherit', height: 'auto' }}>
      <div>
        {
          parts.map((part, index) => (
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          ))
        }
      </div>
    </MenuItem>
  );
}

function getSuggestions(value, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? suggestions
    : suggestions.filter((suggestion) => {
      const keep = count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;
      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

class IntegrationAutosuggest extends PureComponent {
  state = {
    suggestions: [],
    availableSuggestions: this.props.values,
  };

  static propTypes = {
    actionNameError: PropTypes.bool,
    clearErrorField: PropTypes.func,
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    disabled: false,
    actionNameError: false,
    clearErrorField: () => { },
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    const { availableSuggestions } = this.state;

    this.setState({
      suggestions: getSuggestions(value, availableSuggestions),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const {
      classes,
      name,
      label,
      placeholder,
      disabled,
      actionNameError,
      clearErrorField,
    } = this.props;
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      shouldRenderSuggestions: () => true,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <Field name={name}>
        {
          ({ input: { value, onChange, ...rest }, meta }) => (
            <div className={classes.root}>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  classes,
                  label,
                  placeholder,
                  variant: 'standard',
                  value,
                  maxLength: 100,
                  onChange: (event, { newValue }) => {
                    const valueToSave = newValue.length < 100 ? newValue : newValue.substr(0, 99);
                    onChange(valueToSave);

                    if (actionNameError) {
                      clearErrorField();
                    }
                  },
                  inputRef: (node) => {
                    this.popperNode = node;
                  },
                  disabled,
                  error: !!(meta.touched && meta.error) || actionNameError,
                  helperText: meta.touched && meta.error ? meta.error : null,
                  ...rest,
                }}
                theme={{
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={(options) => (
                  <Popper
                    style={{ zIndex: 1500 }}
                    anchorEl={this.popperNode}
                    open={Boolean(options.children)}
                  >
                    <Paper
                      square
                      {...options.containerProps}
                      style={{
                        maxHeight: '45vh',
                        overflowY: 'auto',
                        width: this.popperNode ? this.popperNode.clientWidth : null,
                      }}
                    >
                      {options.children}
                    </Paper>
                  </Popper>
                )}
              />
            </div>
          )
        }
      </Field>
    );
  }
}

export default withStyles(styles)(IntegrationAutosuggest);
