import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Heading, Textfield, Button, Box } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    invoke('getApiKey').then(({ apiKey }) => {
      if (apiKey) setApiKey(apiKey);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await invoke('saveApiKey', { apiKey });
    setSaving(false);
    setSaved(true);
  };

  return (
    <>
      <Heading as="h2">Configure API Key</Heading>
      <Box>
        <Textfield
          label="API Key"
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
            setSaved(false);
          }}
        />
      </Box>
      <Box>
        <Button appearance="primary" onClick={handleSave} isDisabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Box>
      {saved && <Text>Configuration saved.</Text>}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
