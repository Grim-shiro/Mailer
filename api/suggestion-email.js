const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { text, id, createdAt } = req.body || {};
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text required' });

  const user = process.env.GMAIL_USER;     // apiradev@gmail.com
  const pass = process.env.GMAIL_APP_PASS;  // 16-char App Password

  if (!user || !pass) return res.status(500).json({ error: 'Email not configured' });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Budget App" <${user}>`,
    to: user,
    subject: 'Budget app: new suggestion',
    text: `Anonymous suggestion\n\n${text}\n\nSubmitted at ${new Date(createdAt || Date.now()).toISOString()}`,
    html: `<p><strong>Anonymous suggestion</strong></p><pre>${escapeHtml(text)}</pre><p><small>Submitted at ${new Date(createdAt || Date.now()).toISOString()}</small></p>`,
  });

  res.status(200).json({ ok: true });
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
