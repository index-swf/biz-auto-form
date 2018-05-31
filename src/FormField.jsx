/**
 * author: KCFE
 * date: 2017/10/12
 * description: 单项表单项,负责传值和校验
 */
import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'async-validator';
import ValidateRules from './common/validateRules';

/**
 * 将json配置中校验规则转化为校验规则对象数组
 * @param rules
 * @returns {*}
 */
const getValidateRules = (rules) => {
  if( Array.isArray(rules) ){
    return rules;
  }
  return Object.keys(rules).map((key) => {
    const arg = rules[key];
    if(arg === true){
      return ValidateRules[key];
    }
    return ValidateRules[key](arg);
  });
};

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
      errors: null
    };
    if(props.rules) {
      const rulesDescriptor = {
        [props.name]: getValidateRules(props.rules)
      };
      this.validator = new Validator(rulesDescriptor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== null) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (value) => {
    this.validator && this.validator.validate({[this.props.name]: value}, (errors, fields) => {
      this.setState({ errors });
    });
    this.setState({ value });
    if(this.props.onChange){
      this.props.onChange(value);
    }
  };

  validate = () => {
    let result = true;
    this.validator && this.validator.validate({[this.props.name]: this.state.value}, (errors, fields) => {
      if(errors) {
        result = false;
      }
      this.setState({ errors });
    });
    return result;
  };

  getValue = () => {
    return this.state.value;
  };

  render() {
    const childProps = {
      value: this.state.value,
      onChange: this.handleChange
    };
    if(this.state.errors){
      childProps.className = 'error-control';
    }
    const props = this.props;
    return (
      <div className="form-item">
        <label className="item-label" style={{width: props.labelWidth}}>
          {this.props.required ? <em className="red-star">*</em> : null}
          {this.props.label}：
        </label>
        <div className="item-con" style={{marginLeft: props.labelWidth + 10}}>
          {React.cloneElement(this.props.children, childProps)}
          {this.props.tips && <p className="form-item-tips">{this.props.tips}</p>}
          {this.state.errors && <p className="form-validator-error">{this.state.errors[0].message}</p>}
        </div>
      </div>
    );
  }
}

FormField.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  labelWidth: PropTypes.number,
  name: PropTypes.string,
  tips: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onChange: PropTypes.func
};

FormField.defaultProps = {
  required: true,
  labelWidth: 140
};

export default FormField;
