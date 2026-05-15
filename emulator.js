const screen = document.getElementById('screen');
const emulator = document.getElementById('emulator');
const runBtn = document.getElementById('runBtn');
let z = 10;

function log(msg){
  screen.innerHTML += '<br>' + msg;
  screen.scrollTop = screen.scrollHeight;
}

function openWin(title, html){
  let win = document.createElement('div');
  win.className='window';
  win.style.zIndex = z++;
  win.innerHTML = `<h3>${title} <span class="close" onclick="this.closest('.window').remove()">X</span></h3><div>${html}</div>`;
  emulator.appendChild(win);
}

function runCmd(cmd){
  cmd = cmd.toLowerCase().trim();
  if(!cmd.startsWith('çağır')) return;
  let mod = cmd.split(' ')[1];

  const cmds = {
    os: '[YOS] Cekirdek baslatildi',
    btl: '[YOS] Bootloader yuklendi',
    mem: '[YOS] Bellek: 2048MB aktif',
    sch: '[YOS] Scheduler calisiyor',
    fsy: '[YOS] Dosya sistemi baglandi',
    dvr: '[YOS] Suruculer yuklendi',
    syc: '[YOS] Syscall arayuzu hazir',
    lib: '[YOS] Kutuphaneler yuklendi',
    ns: '[YOS] Network: Baglanti yok'
  };

  if(cmds[mod]) log(cmds[mod]);
  else if(mod==='shl') openWin('YOS Shell','<p>Shell acildi. Hosgeldin!</p>');
  else if(mod==='gui') openWin('YOS GUI','<p>Grafik arayuz yuklendi.</p><button onclick="alert(\'Calisiyor!\')">Test</button>');
  else if(mod==='pl') openWin('YOS App Store','<p>1. Not Defteri<br>2. Hesap Makinesi<br><button>Indir</button></p>');
  else log(' Bilinmeyen modul: '+mod);
}

runBtn.onclick = () => {
  emulator.style.display='block';
  screen.innerHTML = 'YOS Emulator basladi<br>----------------------';
  let lines = document.getElementById('code').value.split('\n');
  lines.forEach(line=>{ if(line.trim()) runCmd(line); });
}