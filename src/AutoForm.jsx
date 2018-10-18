/**
 * author: KCFE
 * date: 2017/10/12
 * description: 自动生成组件的表单
 */
import React from 'react';
import PropTypes from 'prop-types';

import Button from './common/Button';
import FieldConverter from './FieldConverter';


class AutoForm extends React.Component{
    constructor(props){
        super(props);
        // 关联的字段和字段组的实例
        this.refFields = {};
    }

  handleSubmit = (event) => {
      event && event.preventDefault();
      if(!this.validate()){
          return;
      }
      if(this.props.onSubmit){
          const values = this.getValues();
          this.props.onSubmit(values);
      }
  };

  getValues = () => {
      const values = {};
      Object.keys(this.refFields).forEach((key) => {
          const value = this.refFields[key].getValue();
          Object.assign(values, {[key]: value});
      });
      return values;
  };

  validate = () => {
      return Object.keys(this.refFields).reduce((suc, key) => {
          const valid = this.refFields[key].validate();
          return suc && valid;
      }, true);
  };

  render(){
      const props = this.props;
      const formData = props.data || {};
      const fields = props.descriptor.map((item, index) => {
          const fieldProps = {
              ...item,
              value: formData[item.name],
              fieldRef: (field) => {this.refFields[item.name] = field;}
          };
          if(('fieldset' in item) && !!item.submit){
              fieldProps.onSubmit = props.onSubmit;
          }
          return (
              <FieldConverter
                  key={item.name}
                  labelWidth={props.labelWidth}
                  {...fieldProps}
              />
          );
      });
      return (
          <form onSubmit={this.handleSubmit}>
              {fields}
              <div className="form-item">
                  <div className="item-con" style={{marginLeft: props.labelWidth + 10}}>
                      <Button htmlType="submit">
              确定提交
                      </Button>
                  </div>
              </div>
          </form>
      );
  }
}

AutoForm.propTypes = {
    // 字段标签宽度
    labelWidth: PropTypes.number,
    // 表单项描述 json数组
    descriptor: PropTypes.arrayOf(PropTypes.object),
    // 表单数据 json对象
    data: PropTypes.object,
    // 表单提交回调
    onSubmit: PropTypes.func
};

AutoForm.defaultProps = {
    labelWidth: 140
};

export default AutoForm;
