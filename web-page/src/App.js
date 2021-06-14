import React from 'react';
import './App.css';
import PageContent from './components/PageContent';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

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
