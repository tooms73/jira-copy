chrome.action.onClicked.addListener((tab) => {
    async function getInfoFromDOM() {
        const items = await chrome.storage.sync.get({ cmd: '', prefix: '', suffix: '', allowedUrl: '' });
        if (!document.location.href.startsWith(items.allowedUrl)) {
            return 'Url not allowed';
        }
        const ticket = document.querySelector('a[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]')?.innerText;
        const title = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]')?.innerText;
        const cleaned = `${ticket}-${title}`.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/g, '').replace(/\s+/g, '-').toLowerCase();  
        const encoded = encodeURIComponent(cleaned); 
        if (ticket === undefined || title === undefined){
            return "Info not present";
        }

        const final = `${items.cmd ? items.cmd + ' ' : ''}${items.prefix ? items.prefix : ''}${encoded}${items.suffix ? items.suffix : ''}`;
        
        let res = undefined;
        await navigator.clipboard.writeText(final).catch((err) => {
            res = err.toString();
        } );

        return res;
    }

    function setBadge(text) {
        chrome.action.setBadgeBackgroundColor({color: '#FF0000'}, () => {
            chrome.action.setBadgeText({ tabId: tab.id, text: text ? 'Fail' : ''});
        });
        chrome.action.setTitle({
            tabId: tab.id,
            title: text ? text : '',
        });
    }
    
    function runScript(){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getInfoFromDOM
        }).then((res)=> {
            const text = res[0]?.result;
            setBadge(text);

            setTimeout(() => {
                setBadge();
            }, 5000)
        }).catch((err) => console.log('ERROR: ', err));
    }
    runScript();
});