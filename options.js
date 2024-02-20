// Saves options to chrome.storage
const saveOptions = () => {
    const allowedUrl = document.getElementById('allowedUrl').value;
    const cmd = document.getElementById('cmd').value;
    const prefix = document.getElementById('prefix').value;
    const suffix = document.getElementById('suffix').value;
  
    chrome.storage.sync.set(
      { cmd, prefix, suffix, allowedUrl },
      () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { cmd: '', prefix: '', suffix: '', allowedUrl: '' },
      (items) => {
        document.getElementById('allowedUrl').value = items.allowedUrl;
        document.getElementById('cmd').value = items.cmd;
        document.getElementById('prefix').value = items.prefix;
        document.getElementById('suffix').value = items.suffix;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('saveOptions').addEventListener('click', saveOptions);