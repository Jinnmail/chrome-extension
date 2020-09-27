$(document).ready(() => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let count = 0, mailCount = 0;
  let buttonIcon;
  let forms = document.getElementsByTagName('form');
  let body = document.getElementsByTagName('body')[0];

  $(body).on('click', () => {
    start();
  });

  function start() {
    setTimeout(() => {
      dispButton(body)

      function dispButton(elem) {
        elem = (elem == undefined) ? document : elem;
        let inputs = elem.querySelectorAll("input[type=email], input[type=text][placeholder*=email i], input[type=text][placeholder*=e-mail i], input[type=text][name*=email i], input[type=text][id*=email i], input[type=text][autocomplete*=email i]");
        for (let j = 0; j < inputs.length; j++) {
          let input = inputs[j];
          if (!$(input).hasClass("jnmbtn-inpt")) {
            $(input).addClass("jnmbtn-inpt");
            let divIcon = document.createElement("div");
            divIcon.className = "jinnmail-icon-div";
            $(divIcon).attr("tabindex", "-1");

            divIcon.style.height = ((input.offsetHeight == 0) ? input.style.height : input.offsetHeight + "px");
            divIcon.style.width = ((input.offsetWidth == 0) ? input.style.width : input.offsetWidth + "px");

            let pos = $(input).position();
            divIcon.style.top = (pos.top + parseInt($(input).css('marginTop'))) + "px";
            divIcon.style.left = pos.left + "px";

            if (input.type === "hidden" || input.style.display === "none") {
              divIcon.style.display = "none";
            }
            buttonIcon = document.createElement('div');
            buttonIcon.className = "jinnmail-icon-button";

            buttonIcon.style.height = ((parseInt(divIcon.style.height) - 5) < 28.2 ? (parseInt(divIcon.style.height) - 5) : 28.2) + "px";
            buttonIcon.style.width = buttonIcon.style.height;
            $(buttonIcon).attr("tabindex", "-1");
            $(input).removeAttr('onFocus');

            buttonIcon.value = count;
            $(input).attr("temp", count++);
            divIcon.appendChild(buttonIcon);
            input.appendChild(divIcon);
            input.parentNode.insertBefore(divIcon, input.nextSibling);

            if ($(input).parent().css("display") === "none" || $(input).parent().css("display") === "inline" || $(input).parent().css("display") === "") {
              input.parentNode.style.display = "block";
            }
          }
          else if ($('.jinnmail-icon-div').css("width") === "0px" || $('.jinnmail-icon-div').css("height") === "0px") {
            $('.jinnmail-icon-div').css("height", ((input.offsetHeight == 0) ? input.style.height : input.offsetHeight + "px"));
            $('.jinnmail-icon-div').css("width", ((input.offsetWidth == 0) ? input.style.width : input.offsetWidth + "px"))
          }
        }
      }
    }, 1500);
  }
  start();
  let init = () => {
    $(".loader-container").hide();
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('jinnmailToken')) {
        resolve(localStorage.getItem('jinnmailToken'));
      }
      else
        reject('no token');
    }).then((token) => {
      $.ajax({
        type: "GET",
        url: url + 'alias',
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", token);
        },
        success: (success) => {
          // console.log("Data Retrieved: "+JSON.stringify(success.data));
          mailCount = 0;
          for (let index = 0; index < success.data.length; index++) {
            let status = success.data[index].status ? 'on' : 'off';
            mailCount += success.data[index].mailCount;
            let data = '<div id="row-content" class="d-lg-flex justify-content-between px-3">' +
              '<div class="mb-2 cols-1">' +
              '<span>' +
              ' <span>' + success.data[index].alias + '</span>' +
              ' </span>' +
              '<div class="heading"></div>' +
              ' </div>' +
              '<div class="mb-2 cols-2">' +
              '<span data-toggle="tooltip" data-placement="top" title="' + success.data[index].refferedUrl + '">' + success.data[index].alias.substring(0, (success.data[index].alias.indexOf('.') < success.data[index].alias.indexOf('@')) ? success.data[index].alias.indexOf('.') : success.data[index].alias.indexOf('@')) + '</span>' +
              '<div class="heading">Description</div>' +
              '</div>' +
              '<div class="mb-2 cols-3">' +
              '<div>' + new Date(success.data[index].created).getDate() + ' ' + monthNames[new Date(success.data[index].created).getMonth()] + '</div>' +
              '<div class="heading">Created At</div>' +
              '</div>' +

              '<div class="mb-2 cols-4">' +
              '<div>' + ((success.data[index].mailCount) ? (success.data[index].mailCount) : 0) + '</div>' +
              '<div class="heading">Forwarded</div>' +
              '</div>' +
              ' <div class="mb-2 cols-5">' +
              '<div>0</div>' +
              '<div class="heading">Blocked</div>' +
              ' </div>' +

              ' <div class="mb-2 cols-6">' +
              '<div>2 January 2019</div>' +
              '<div class="heading">Last Used date</div>' +
              ' </div>' +

              '<div class="mb-2 cols-7">' +
              '<div class="td-actions text-center">' +
              '<button type="button" rel="tooltip" class="btn btn-info btn-icon btn-sm btn-neutral  copy-clip" ><i class="fa fa-copy"></i></button>' +
              '<div  class="onoff bootstrap-switch wrapper bootstrap-switch-' + status + '" id=' + success.data[index].aliasId + ' style="width: 100px;">' +
              '<div  class="bootstrap-switch-container" style="width: 150px; margin-left: 0px;"><span class="bootstrap-switch-handle-on bootstrap-switch-primary" style="width: 50px;">ON</span><span class="bootstrap-switch-label" style="width: 50px;"> </span><span class="bootstrap-switch-handle-off bootstrap-switch-default" style="width: 50px;">OFF</span></div>' +
              '</div>' +
              '<button type="button" rel="tooltip" class="remAlias btn btn-icon btn-sm btn-neutral"><i id="remAlias" class="fa fa-times ui-1_simple-remove"></i></button>' +
              '</div>' +
              '<div class="confirmation">' +
              '<div colspan="2"><span>Are you sure?</span><button id="yes_' + success.data[index].aliasId + '" class="yes_cnfrm btn btn-danger btn-sm">Yes</button><button class="no_cnfrm btn btn-sm">No</button></div>' +
              '</div>'
            '</div>' +
              '</div>';

            $('#append-mails-web').append(data);
          }
          $("p.title")[2].innerHTML = mailCount;
          $('#userDetails').text(((success.data.length == 0) ? "No Data" : success.data[0].email))
          $('#no-of-jinn').text(success.data.length);

        },
        error: (err) => {
          // alert(err.responseJSON.error)
          // console.log(err)
        },
        contentType: 'application/json'
      });
    }).catch((err) => {
      // console.log(err);
    })

  }

  $(document).on('click', '.jinnmail-icon-button', (e) => {
    // console.log(e)
    // console.log(e.target.value)
    e.preventDefault();
    chrome.runtime.sendMessage({ url: location.hostname, value: e.target.value, res: 'ok', buttonIcon: buttonIcon }, (res) => {
    });
  });
});

