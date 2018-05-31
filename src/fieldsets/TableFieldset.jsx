/**
 * author: KCFE
 * date: 2018/01/08
 * description: 收取Table数据的字段组
 * 字段组值的格式 value: {header:[], rows: []}
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import ListFieldset from './ListFieldset';
import Button from '../common/Button';
import Collapse, { Panel } from 'rc-collapse';
import Select, { Option } from 'rc-select';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';


class TableFieldset extends React.Component {
  constructor(props) {
    super(props);
    let rowNum = props.rowNum, colNum = props.colNum;
    if(Array.isArray(props.rowNum)){
      rowNum = props.rowNum[0];
    }
    if(Array.isArray(props.colNum)){
      colNum = props.colNum[0];
    }
    if(props.value && Array.isArray(props.value.header)){
      colNum = props.value.header.length;
    }
    if(props.value && Array.isArray(props.value.rows)){
      rowNum = props.value.rows.length + 1;
    }
    this.state = {
      rowNum,
      colNum,
      activePanelKey: '0',
      activeTabKey: '1',
      value: props.value || {}
    };
    //字段组关联的字段实例
    this.refFields = [];
  }

  validate = () => {
    let resValid = true;
    let errorTabIndex = -1;
    for(let i = 0; i < this.state.rowNum; i++){
      let tabValid = this.refFields[i].validate();
      if(errorTabIndex === -1 && !tabValid){
        errorTabIndex = i;
      }
      resValid = resValid && tabValid;
    }
    if(!resValid){
      const value = this.getValue();
      this.setState({
        activePanelKey: '0',
        activeTabKey: (errorTabIndex+1) + '',
        value
      });
    }
    return resValid;
  };

  getValue = () => {
    const fieldsetValue = {};
    for(let i = 0; i < this.state.rowNum; i++){
      const tab = this.refFields[i];
      if(i === 0){
        fieldsetValue.header = tab.getValue();
      } else {
        if(!fieldsetValue.rows){
          fieldsetValue.rows = [];
        }
        fieldsetValue.rows[i-1] = {cols: tab.getValue()};
      }
    }
    return fieldsetValue;
  };

  handleRowNumChange = (num) => {
    const value = this.getValue();
    this.setState({
      rowNum: num,
      activeTabKey: '1',
      value
    });
  };

  handleColNumChange = (num) => {
    const value = this.getValue();
    this.setState({
      colNum: num,
      activeTabKey: '1',
      value
    });
  };

  handleTabChange = (activeKey) => {
    const value = this.getValue();
    this.setState({
      activeTabKey: activeKey,
      value
    });
  };

  renderRowSelect = () => {
    let selectField = null;
    if(Array.isArray(this.props.rowNum)){
      const options = this.props.rowNum.map((num, index) => {
        return (
          <Option key={index} value={num}>{num}</Option>
        );
      });
      selectField = (
        <FormField
          label="表格行数"
          value={this.state.rowNum+''}
          onChange={this.handleRowNumChange}
        >
          <Select style={{ width: 100 }}>
            {options}
          </Select>
        </FormField>
      );
    }
    return selectField;
  };

  renderColSelect = () => {
    let selectField = null;
    if(Array.isArray(this.props.colNum)){
      const options = this.props.colNum.map((num, index) => {
        return (
          <Option key={index} value={num}>{num}</Option>
        );
      });
      selectField = (
        <FormField
          label="表格列数"
          value={this.state.colNum+''}
          onChange={this.handleColNumChange}
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
    const headerValue = fieldsetValue.header;
    const rowsValue = fieldsetValue.rows || [];
    //所选列数 在数组中的下标
    let numIndex = 0;
    if(Array.isArray(props.colNum)){
      numIndex = props.colNum.indexOf(this.state.colNum);
    }
    //第一行字段
    const headerFields = props.headerFields.map((item) => {
      if(item.rules && (item.rules.maxBytes || item.rules.minBytes)){
        const rules = {...item.rules};
        if(Array.isArray(rules.maxBytes)){
          rules.maxBytes = rules.maxBytes[numIndex];
        }
        if(Array.isArray(rules.minBytes)){
          rules.minBytes = rules.minBytes[numIndex];
        }
        return {...item, rules};
      }
      return item;
    });
    //其他行字段
    const rowFields = props.rowFields.map((item) => {
      if(item.rules && (item.rules.maxBytes || item.rules.minBytes)){
        const rules = {...item.rules};
        if(Array.isArray(rules.maxBytes)){
          rules.maxBytes = rules.maxBytes[numIndex];
        }
        if(Array.isArray(rules.minBytes)){
          rules.minBytes = rules.minBytes[numIndex];
        }
        return {...item, rules};
      }
      return item;
    });
    const headerTab = (
      <TabPane key="1" tab="第 1 行" style={{padding: '10px 0',maxHeight: '500px'}} forceRender>
        <ListFieldset
          labelWidth={props.labelWidth}
          key={`row1`}
          name="header"
          length={this.state.colNum}
          fields={headerFields}
          value={headerValue}
          ref={(field) => {
            this.refFields[0] = field;
          }}
        />
      </TabPane>
    );

    let rowTabs = [];
    for(let i = 1; i< this.state.rowNum; i++){
      const colsValue = rowsValue[i-1] || {};
      rowTabs.push(
        <TabPane key={i+1} tab={`第 ${i+1} 行`} style={{padding: '10px 0',maxHeight: '500px'}} forceRender>
          <ListFieldset
            labelWidth={props.labelWidth}
            key={`row${i+1}`}
            name={`row${i+1}`}
            length={this.state.colNum}
            fields={rowFields}
            value={colsValue.cols}
            ref={(field) => {
              this.refFields[i] = field;
            }}
          />
        </TabPane>
      );
    }

    const fieldset = (
      <div>
        {this.renderRowSelect()}
        {this.renderColSelect()}
        <Tabs
          activeKey={this.state.activeTabKey}
          onChange={this.handleTabChange}
          renderTabBar={()=><ScrollableInkTabBar />}
          renderTabContent={()=><TabContent animated={false} />}
          style={{border: '2px solid #f3f3f3', margin: '10px 0 20px'}}
        >
          {headerTab}
          {rowTabs}
        </Tabs>
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

TableFieldset.propTypes = {
  //字段组名
  name: PropTypes.string.isRequired,
  //字段组的值
  value: PropTypes.any,
  //表格行数，列数
  rowNum: PropTypes.array,
  colNum: PropTypes.array,
  //表头字段组的json描述
  headerFields: PropTypes.array,
  //表格行字段组的json描述
  rowFields: PropTypes.array,
  //折叠面板标题
  panelTitle: PropTypes.string,
  //是否可以分段保存提交
  submit: PropTypes.bool
};

TableFieldset.defaultProps = {
  labelWidth: 140,
  submit: false
};

export default TableFieldset;
