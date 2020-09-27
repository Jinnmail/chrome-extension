// const JM_API_URL = 'https://jinnmail.com/api/v1';
const JM_API_URL = 'https://api.testling.xyz/api/v1/';
// const JM_API_URL = 'http://localhost:3000/api/v1/';

let url = JM_API_URL;

let aliasList = {};

// this is how you can get the chrome extesion id
// alert(chrome.runtime.id)
chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
  if (request) {
    if (request.message) {
      if (request.message == "version") {
        sendResponse({ version: '1.0' });
      } else if (request.message == "login") {
        localStorage.setItem('jinnmailToken', request.token)
        props.history.push('/signedin');
      }
    }
  }
  return true;
}
);

let stoken = () => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('jinnmailToken')) {
      resolve(localStorage.getItem('jinnmailToken'));
    } else {
      reject('no token');
    }
  })
}

let registerAlias = (siteurl, sourceType = '') => {
  return new Promise((resolve, reject) => {
    stoken().then((token) => {
      let data = { url: siteurl, source: sourceType };
      let json = JSON.stringify(data);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url + 'alias', true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Authorization', token)
      xhr.onload = function () {
        let alias = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
          resolve(alias.data.alias)
        } else {
          console.error(alias);
          reject();
        }
      }
      xhr.send(json);
    })
  }).catch((err) => {
    resolve('')
  })
}

chrome.runtime.onMessage.addListener(async (response, sender, sendResponse) => {
  if (response.from == 'content_script') {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var js = `localStorage.setItem('jinnmailToken', '${response.message}');`;
      chrome.tabs.executeScript({
        allFrames: true,
        code: js
      });
    });
  } else if (response.buttonIcon == 'cust') {
    registerAlias(response.url, response.source).then((data) => {
      let email_address = data;
      let js = "if (document.activeElement != undefined) if(document.getElementsByClassName('jnmbtn-inpt').length){document.getElementsByClassName('jnmbtn-inpt')[0].value= '" + email_address + "';document.getElementsByClassName('jnmbtn-inpt')[0].dispatchEvent(new Event('input'))}";
      chrome.tabs.executeScript(null, {
        allFrames: true,
        code: js
      });
    })
  } else {
    if (localStorage.getItem('jinnmailToken')) {
      registerAlias(response.url).then((data) => {
        let email_address = data;
        let js = `if (document.activeElement != undefined) if(document.getElementsByClassName('jnmbtn-inpt').length){document.querySelector('input[temp = "${response.value}"]').value='${email_address}';document.querySelector('input[temp = "${response.value}"]').dispatchEvent(new Event('input'))}`;
        chrome.tabs.executeScript(null, {
          allFrames: true,
          code: js
        });
        aliasList[response.value] = email_address;
      });
    } else {
      alert("Please login to Jinnmail to continue...")
    }
  }
});

let getHostName = (url) => {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  }
  else {
    return null;
  }
}

let randomString = (string_length) => {
  let chars = "0123456789abcdefghiklmnopqrstuvwxyz";
  let randomstring = '';
  for (let i = 0; i < string_length; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

let getDomain = (url) => {
  let hostName = getHostName(url);
  let domain = hostName;

  if (hostName != null) {
    let parts = hostName.split('.').reverse();

    if (parts != null && parts.length > 1) {
      domain = parts[1] + '.' + parts[0];

      if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
        domain = parts[2] + '.' + domain;
      }
    }
  }

  return domain.split('.')[0];
}

// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//   switch (msg.type) {
//       case 'popupInit':
//           response(tabStorage[msg.tabId]);
//           break;
//       default:
//           response('unknown request');
//           break;
//   }
// });

// let generateMaskHandler = (info, tab) => {
//   // let domain = getDomain(info.pageUrl);
//   // let token = randomString(6);
//   // let email_address = domain + '.' + token + '@jinnmail.com'
//   registerAlias(info.pageUrl).then((data) => {
//     let email_address = data;
//     var js = "if (document.activeElement != undefined) document.activeElement.value = '" + email_address + "';document.activeElement.dispatchEvent(new Event('input'))";
//     chrome.tabs.executeScript(null, {
//       allFrames: true,
//       code: js
//     });
//   })
// }