import * as React from 'react';
import style from './table_layout.module.css';

const TableLayout = ({ children }) => {
  return <div className={style.layout}>{children}</div>;
};

export default TableLayout;
