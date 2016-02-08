'use strict';

var enableDarkMode = false;
chrome.runtime.onInstalled.addListener(function(details) {
  console.log('previousVersion', details.previousVersion);

  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL equal to the conditions
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { 
              hostContains: 'typetalk', 
              pathContains:'topics', 
              schemes: ['https'] }
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });

  // Called when the user clicks on the page action.
  // Refs:
  // https://developer.chrome.com/extensions/tabs#method-insertCSS
  // https://developer.chrome.com/extensions/content_scripts#pi
  chrome.pageAction.onClicked.addListener(function(tab) {
    if (enableDarkMode) {
      chrome.tabs.insertCSS(tab.id, {
        file: 'css/typetalk-light-theme.css',
        allFrames: false,
        runAt: 'document_end'
      });
      chrome.pageAction.setIcon({path: 'images/icon-19.png', tabId: tab.id});
    }
    else {
      chrome.tabs.insertCSS(tab.id, {
        file: 'css/typetalk-dark-theme.css',
        allFrames: false,
        runAt: 'document_end'
      });
      chrome.pageAction.setIcon({path: 'images/icon-19-dark.png', tabId: tab.id});
    }
    enableDarkMode = (!enableDarkMode);
  });
});
