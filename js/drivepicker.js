
 /**
  * Google Drive picker
  * https://developers.google.com/drive/api/v3/picker
  * Dynamic Option passed from Unity3D 
  */


let isMultipleSelection = false;
let dataType; // for example : dataType =  "image/png,image/jpeg,image/jpg";
let unityJson = "";
var Data = {
    links: []
};

// The Browser API key obtained from the Google API Console.
// Replace with your own Browser API key, or your own key.
var developerKey = 'AIzaSyBFNVLq0DHG7NkgrGyeSmpG8PqjBT7ba50';

// The Client ID obtained from the Google API Console. Replace with your own Client ID.
var clientId = "194984934173-vn4v0ca9vbqgrtm024t7691dak88k9l1.apps.googleusercontent.com"

// Replace with your own project number from console.developers.google.com.
// See "Project number" under "IAM & Admin" > "Settings"
var appId = "psychic-trainer-324111";

// Scope to use to access user's Drive items.
var scope = ['https://www.googleapis.com/auth/drive.file'];

var pickerApiLoaded = false;
var oauthToken;

// Use the Google API Loader script to load the google.picker script.
function loadPicker() {
    gapi.load('auth', {
        'callback': onAuthApiLoad
    });
    gapi.load('picker', {
        'callback': onPickerApiLoad
    });
}

function onAuthApiLoad() {
    window.gapi.auth.authorize({
            'client_id': clientId,
            'scope': scope,
            'immediate': false
        },
        handleAuthResult);
}

function onPickerApiLoad() {
    pickerApiLoaded = true;
    createPicker();
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
    }
}

// Create and render a Picker object for searching images.
function createPicker() {
    if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        // view.setMimeTypes("image/png,image/jpeg,image/jpg");
        view.setMimeTypes(dataType);

        if (isMultipleSelection) {
            var picker = new google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.NAV_HIDDEN)
                .disableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setAppId(appId)
                .setOAuthToken(oauthToken)
                .addView(view)
                .addView(new google.picker.DocsUploadView())
                .setDeveloperKey(developerKey)
                .setCallback(pickerCallback)
                .build();

        } else {
            var picker = new google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.NAV_HIDDEN)
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setAppId(appId)
                .setOAuthToken(oauthToken)
                .addView(view)
                .addView(new google.picker.DocsUploadView())
                .setDeveloperKey(developerKey)
                .setCallback(pickerCallback)
                .build();
        }

        picker.setVisible(true);


    }
}

// A simple callback implementation.
function pickerCallback(data) {
    //console.log("List of data : "+JSON.stringify(data))
     data.docs.forEach(function(file) {
        var link = file.url;
        l = link.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
        if(l !== link) {
          console.log(l);
            Data.links.push({
              "url": l,
          });
        } 
     });

}

function UpdatePickerButton(multiselectType, extensionsType) {

    isMultipleSelection = false;
    dataType = extensionsType.data_Type;

    // alert(isMultipleSelection);
    // alert(dataType);

   let drivePicker = document.getElementById("drivepicker-button");
   drivePicker.disabled = false;
   return dataType;
}



function CloseWebView() {
    window.location.href = "uniwebview://selection-over?data=" + unityJson;
}