/**
 * author: KCFE
 * date: 2017/10/12
 * description: 带radio可切换的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import RadioGroup from '../controls/RadioGroup';
import FieldConverter from '../FieldConverter';
import Button from '../common/Button';
import Collapse, { Panel } from 'rc-collapse';

class RadioFieldset extends React.Component{
    constructor(props){
        super(props);
        let radioValue = props.optionFields[0].option;
        if(typeof radioValue === 'object'){
            radioValue = radioValue.value;
        }
        if(props.defaultRadio){
            radioValue = props.defaultRadio;
        }
        if(props.value && props.value[props.radioValueKey]){
            radioValue = props.value[props.radioValueKey];
        }
        this.state = {
            radioValue: radioValue,
            activePanelKey: '0',
            value: props.value || {}
        };
        // 字段组关联的字段实例
        this.refFields = {};
    }

  validate = () => {
      const resValid = Object.keys(this.refFields).reduce((suc, key) => {
          const valid = this.refFields[key].validate();
          return suc && valid;
      }, true);
      if(!resValid){
          const value = this.getValue();
          this.setState({
              activePanelKey: '0',
              value
          });
      }
      return resValid;
  };

  getValue = () => {
      const fieldsetValue = {
          [this.props.radioValueKey]: this.state.radioValue
      };
      Object.keys(this.refFields).forEach((key) => {
          const value = this.refFields[key].getValue();
          Object.assign(fieldsetValue, {[key]: value});
      });
      return fieldsetValue;
  };

  handleRadioChange = (radioValue) => {
      this.setState({
          radioValue
      });
  };

  renderRadioGroup = () => {
      const options = this.props.optionFields.map((item, index) => {
          return item.option;
      });
      return (
          <FormField
              label={this.props.radioLabel}
              value={this.state.radioValue}
              onChange={this.handleRadioChange}
          >
              <RadioGroup options={options} />
          </FormField>
      );
  };

  getRadioIndex = () => {
      const {optionFields} = this.props;
      let i = 0;
      for(; i < optionFields.length; i++){
          const option = optionFields[i].option;
          const optionValue = typeof option === 'string' ? option : option.value;
          if(optionValue === this.state.radioValue){
              break;
          }
      }
      return i;
  };

  handleSubmit = () => {
      if(!this.validate()){
          return;
      }
      if(this.props.onSubmit){
          this.props.onSubmit({
              [this.props.name]: this.getValue()
          });
      }
  };

  handleCollapseChange = (key) => {
      const value = this.getValue();
      this.setState({activePanelKey: key, value});
  };

  renderSubmit = () => {
      return (
          <div className="form-item">
              <div className="item-con" style={{marginLeft: this.props.labelWidth + 10}}>
                  <Button onClick={this.handleSubmit}>
            保存
                  </Button>
              </div>
          </div>
      );
  };

  render(){
      const radioIndex = this.getRadioIndex();
      const jsonFields = this.props.optionFields[radioIndex].fields || [];
      const fieldsetValue = this.state.value;
      const fields = jsonFields.map((item, index) => {
          return (
              <FieldConverter
                  {...item}
                  key={`radio${radioIndex}-field${index}`}
                  value={fieldsetValue[item.name]}
                  fieldRef={(field) => {
                      if(field){
                          this.refFields[item.name] = field;
                      }else{
                          delete this.refFields[item.name];
                      }
                  }}
              />
          );
      });

      const fieldset = (
          <div>
              {this.renderRadioGroup()}
              {fields}
              {this.props.submit && this.renderSubmit()}
          </div>
      );
      if(this.props.panelTitle){
          return (
              <Collapse activeKey={this.state.activePanelKey} onChange={this.handleCollapseChange}>
                  <Panel header={this.props.panelTitle}>
                      {fieldset}
                  </Panel>
              </Collapse>
          );
      }
      return fieldset;
  }
}

RadioFieldset.propTypes = {
    name: PropTypes.string.isRequired,
    radioLabel: PropTypes.string,
    value: PropTypes.any,
    radioValueKey: PropTypes.string,
    defaultRadio: PropTypes.string,
    optionFields: PropTypes.arrayOf(PropTypes.shape({
        option: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.object.isRequired
        ]),
        fields: PropTypes.any.isRequired
    })),
    // 折叠面板标题
    panelTitle: PropTypes.string,
    // 是否可以分段保存提交
    submit: PropTypes.bool
};

RadioFieldset.defaultProps = {
    radioValueKey: 'radioValue',
    labelWidth: 140,
    submit: false
};

export default RadioFieldset;
