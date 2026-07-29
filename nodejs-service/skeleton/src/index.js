import express from 'express';

const app = express();
const port = process.env.PORT || ${{ values.port }};

app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));

app.get('/', (_req, res) =>
  res.json({
    service: '${{ values.name }}',
    description: '${{ values.description }}',
  }),
);

app.listen(port, () => {
  console.log(`${{ values.name }} listening on :${port}`);
});
