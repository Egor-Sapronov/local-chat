import React, { PropTypes } from 'react';
import styles from './app.css';

const App = ({ navbar, content, footer }) => (
  <div className={styles.app}>
    { navbar && navbar }
    { content && content }
    { footer && footer }
  </div>
);

App.propTypes = {
  navbar: PropTypes.element,
  content: PropTypes.element,
  footer: PropTypes.element,
};

export default App;
