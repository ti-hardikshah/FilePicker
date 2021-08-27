 /**
  * Chooser (Drop Box)
  * https://www.dropbox.com/developers/dropins/chooser/js
  * Dynamic Option passed from Unity3D
  */


  let unityJson = "";
  let multiselect = false;
  let extensions = [];
  var Data = {
      links: []
  };

  let call = false;
  
 
  function CloseWebView() {
      //console.log(unityJson);
      window.location.href = "uniwebview://selection-over?data=" + unityJson;
  }


  function UpdatePickerButton(multiselectType, extensionsType) 
  {
    multiselect = multiselectType;
    extensions = extensionsType.data_Type;
    
    options = {
        success: function(files) {
            files.forEach(function(file) {
                Data.links.push({
                    "url": file.link,
                });
            });
   
            unityJson = JSON.stringify(Data);
   
            if (files.length > 0) {
                let doneButton = document.getElementById("done-button");
                doneButton.disabled = false;
            }
        },
        cancel: function() {
            //optional
        },
        linkType: "direct",           // "preview" or "direct"
        multiselect: multiselect,     // true or false
        extensions: extensions,       //['.png', '.jpg', '.jpeg'],
    };
   
    if (!call) {

        var button = Dropbox.createChooseButton(options);
        document.getElementById("dropbox-container").appendChild(button);

    }

    call = true;
    return extensions;
  }