console.log('from background')
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url)
    });
});
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
  
      // do your things
  
    }
  })
//chrome.tabs.executeScript(null,{file: './foreground,js'},()=> console.log('foreground_injected'))