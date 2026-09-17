export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const scriptUrl =
    process.env.GOOGLE_APPS_SCRIPT_URL ||
    'https://script.google.com/macros/s/AKfycbxWocxJi8ApEuAsXGGxwD-e3CRD2vGphLvTIcT3nwbEyjHtKFSewLF7MgUs-XZIxx7D/exec'

  const payload = typeof req.body === 'string' ? Object.fromEntries(new URLSearchParams(req.body)) : req.body || {}

  const formBody = new URLSearchParams({
    guestName: String(payload.guestName ?? ''),
    guestCount: String(payload.guestCount ?? 1),
    cannotAttend: String(payload.cannotAttend === true || payload.cannotAttend === 'true'),
    submittedAt: String(payload.submittedAt ?? new Date().toISOString()),
    source: String(payload.source ?? 'graduation_invitation'),
  })

  try {
    const upstreamResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody.toString(),
    })

    const upstreamText = await upstreamResponse.text()

    if (!upstreamResponse.ok) {
      return res.status(502).json({
        ok: false,
        error: 'Upstream Google Apps Script request failed',
        status: upstreamResponse.status,
        details: upstreamText.slice(0, 500),
      })
    }

    return res.status(200).json({ ok: true, message: 'Submitted successfully' })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown server error',
    })
  }
}
