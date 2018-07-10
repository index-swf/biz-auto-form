/**
 * author: KCFE
 * date: 2017/10/12
 * description: 按个数重复的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import FieldConverter from '../FieldConverter';
import Select, { Option } from 'rc-select';
import Collapse, { Panel } from 'rc-collapse';
import Button from '../common/Button';


class ListFieldset extends React.Component {
  constructor(props) {
    super(props);
    let length = props.length;
    if(Array.isArray(props.length)){
      length = props.length[0];
    }
    if(props.value && Array.isArray(props.value)){
      length = props.value.length;
    }
    this.state = {
      length: length,
      activePanelKey: '0',
      value: props.value || []
    };
    //字段组关联的字段实例
    this.refFields = [];
  }

  componentWillReceiveProps(nextProps){
    if ('length' in nextProps && nextProps.length !== this.props.length) {
      if(!Array.isArray(nextProps.length)) {
        let length = nextProps.length;
        const value = this.getValue();
        this.setState({ length, value });
      }
    }
  }

  validate = () => {
    const props = this.props;
    let resValid = true;
    for(let i = 0; i < this.state.length; i++){
      const groupFields = this.refFields[i];
      let groupValid = true;
      //只重复一个输入组件时
      if(props.fields.length === 1 && !props.fields[0].name){
        groupValid = groupFields.validate();
      } else {
        groupValid = Object.keys(groupFields).reduce((suc, key) => {
          const valid = groupFields[key].validate();
          return suc && valid;
        }, true);
      }
      resValid = resValid && groupValid;
    }
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
    const props = this.props;
    const fieldsetValue = [];
    for(let i = 0; i < this.state.length; i++){
      const groupFields = this.refFields[i];
      //只重复一个输入组件时
      if(props.fields.length === 1 && !props.fields[0].name){
        const value = groupFields.getValue();
        fieldsetValue.push(value);
      } else {
        const groupValue = {};
        Object.keys(groupFields).forEach((key) => {
          const value = groupFields[key].getValue();
          Object.assign(groupValue, {[key]: value});
        });
        fieldsetValue.push(groupValue);
      }
    }
    return fieldsetValue;
  };

  handleNumChange = (num) => {
    const value = this.getValue();
    this.setState({
      length: num,
      value
    });
  };

  renderSelectField = () => {
    let selectField = null;
    if(Array.isArray(this.props.length)){
      const options = this.props.length.map((num, index) => {
        return (
          <Option key={index} value={num}>{num}</Option>
        );
      });
      selectField = (
        <FormField
          label={this.props.numLabel}
          value={this.state.length+''}
          onChange={this.handleNumChange}
          optionLabelProp="children"
        >
          <Select style={{ width: 100 }}>
            {options}
          </Select>
        </FormField>
      );
    }
    return selectField;
  };

  handleSubmit = () => {
    if( !this.validate() ){
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

  render() {
    const props = this.props;
    const fieldsetValue = this.state.value;
    //所选长度 在数组中的下标
    let numIndex = 0;
    if(Array.isArray(props.length)){
      numIndex = props.length.indexOf(this.state.length);
    }
    let fields = [];
    //只重复一个输入组件
    if(props.fields.length === 1 && !props.fields[0].name){
      const item = props.fields[0];
      for(let i = 0; i< this.state.length; i++) {
        const field = (
          <FieldConverter
            labelWidth={props.labelWidth}
            {...item}
            key={props.name + (i + 1)}
            label={item.label + (i + 1)}
            value={fieldsetValue[i]}
            fieldRef={(field) => {
              this.refFields[i] = field;
            }}
          />
        );
        fields.push(field);
      }
    } else {
      for(let i = 0; i< this.state.length; i++){
        const groupValue = fieldsetValue[i] || {};
        const groupFields = this.props.fields.map((item) => {
          const fieldProps = {...item};
          if(item.rules && (item.rules.maxBytes || item.rules.minBytes)){
            const rules = {...item.rules};
            if(Array.isArray(rules.maxBytes)){
              rules.maxBytes = rules.maxBytes[numIndex];
            }
            if(Array.isArray(rules.minBytes)){
              rules.minBytes = rules.minBytes[numIndex];
            }
            fieldProps.rules = rules;
          }
          return (
            <FieldConverter
              labelWidth={props.labelWidth}
              {...fieldProps}
              key={item.name + (i+1)}
              label={item.label + (i+1)}
              value={groupValue[item.name]}
              fieldRef={(field) => {
                if(!this.refFields[i]){
                  this.refFields[i] = {};
                }
                this.refFields[i][item.name] = field;
              }}
            />
          );
        });
        fields.push(...groupFields);
      }
    }

    const fieldset = (
      <div>
        {this.renderSelectField()}
        {fields}
        {this.props.submit && this.renderSubmit()}
      </div>
    );
    if(!!this.props.panelTitle){
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

ListFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  numLabel: PropTypes.string,
  length: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
  ]),
  value: PropTypes.any,
  fields: PropTypes.array,
  //折叠面板标题
  panelTitle: PropTypes.string,
  //是否可以分段保存提交
  submit: PropTypes.bool
};

ListFieldset.defaultProps = {
  labelWidth: 140,
  submit: false
};

export default ListFieldset;
