import React from 'react';
import Demo from './demo';
import MarkdownElement from '../../MarkdownElement';
import doc from './doc.md';

class RadioFieldsetDoc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>RadioFieldset 字段组</h1>
        <h4>示例：</h4>
        <Demo/>
        <MarkdownElement text={doc}/>
      </div>
    );
  }
}

export default RadioFieldsetDoc;
