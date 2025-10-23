let deferredPrompt;
const installBtn=document.getElementById('installBtn');
const notifyBtn=document.getElementById('notifyBtn');
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferredPrompt=e;
  installBtn.hidden=false;
  installBtn.addEventListener('click',async()=>{
    installBtn.hidden=true;deferredPrompt.prompt();
    const choice=await deferredPrompt.userChoice;
    console.log('User choice',choice);
    deferredPrompt=null;
  });
});
if(notifyBtn){notifyBtn.addEventListener('click',async()=>{
  if(!('Notification'in window)){alert('Notifications not supported.');return;}
  if(Notification.permission==='granted'){new Notification('Hello from your PWA!');}
  else if(Notification.permission!=='denied'){
    const perm=await Notification.requestPermission();
    if(perm==='granted')new Notification('Thanks! Notifications enabled.');
  }else alert('Notifications are blocked.');
});}
