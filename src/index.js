import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';

import Amplify from 'aws-amplify';
import config from './aws-exports';

// link front-end and aws backend together
Amplify.configure(config);

ReactDOM.render(<Application />, document.getElementById('root'));
