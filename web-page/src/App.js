import React from 'react';
import './App.css';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import PageContent from './components/PageContent';

function App() {
  return (
    <React.Fragment>
      <PageHeader />
      <PageContent />
      <PageFooter />
    </React.Fragment>
  );
}

export default App;
