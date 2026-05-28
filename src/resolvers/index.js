import Resolver from '@forge/resolver';
import { kvs } from '@forge/kvs';

const resolver = new Resolver();

resolver.define('getApiKey', async () => {
  const apiKey = await kvs.get('apiKey');
  return { apiKey: apiKey || null };
});

resolver.define('saveApiKey', async (req) => {
  const { apiKey } = req.payload;
  await kvs.set('apiKey', apiKey);
  return { success: true };
});

export const handler = resolver.getDefinitions();
