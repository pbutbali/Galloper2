function serviceText(){
  const items = Array.from(document.querySelectorAll('.tl'));
  return items.map(it => {
    const date = it.querySelector('.tl__date')?.textContent?.trim() || '';
    const km = it.querySelector('.tl__km')?.textContent?.trim() || '';
    const title = it.querySelector('.tl__title')?.textContent?.trim() || '';
    const text = it.querySelector('.tl__text')?.textContent?.trim() || '';
    return `• ${date} | ${km}\n  ${title}\n  ${text}`;
  }).join('\n\n');
}

async function copy(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  }catch(e){
    const ta=document.createElement('textarea');
    ta.value=text;
    document.body.appendChild(ta);
    ta.select();
    try{document.execCommand('copy')}catch(_){}
    ta.remove();
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  const copyBtn = document.getElementById('copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      await copy('ИСТОРИЯ ОБСЛУЖИВАНИЯ\n\n' + serviceText());
      copyBtn.textContent = 'Скопировано';
      setTimeout(()=> copyBtn.textContent='Скопировать блок обслуживания', 1200);
    });
  }

  const printBtn = document.getElementById('print');
  if (printBtn) printBtn.addEventListener('click', ()=> window.print());
});
