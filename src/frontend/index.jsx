import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Heading, Box } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    invoke('getApiKey').then(({ apiKey }) => {
      setApiKey(apiKey);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Heading as="h2">Admin Configuration</Heading>
      <Box>
        <Text>API Key: {loading ? 'Loading...' : (apiKey ? apiKey : 'Not configured')}</Text>
      </Box>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
