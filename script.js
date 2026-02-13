// Galloper2 One-page interactions

function getTimelineText() {
  const items = Array.from(document.querySelectorAll('.tl'));
  return items.map((it) => {
    const title = it.querySelector('b')?.textContent?.trim() || '';
    const meta = it.querySelector('.tl__meta')?.textContent?.trim() || '';
    const text = it.querySelector('.tl__text')?.textContent?.trim() || '';
    return `• ${title} (${meta})\n  ${text}`;
  }).join('\n\n');
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    ta.remove();
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const btn = document.getElementById('copyLog');
  if (btn) {
    btn.addEventListener('click', async () => {
      const text = `ЖУРНАЛ ОБСЛУЖИВАНИЯ (Galloper2)\n\n${getTimelineText()}`;
      await copyToClipboard(text);
      btn.textContent = 'Скопировано';
      setTimeout(() => (btn.textContent = 'Скопировать журнал'), 1200);
    });
  }

  const printBtn = document.getElementById('print');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
});
