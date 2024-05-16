import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
  const data = { someOther: 'data' };
  return data;
});

