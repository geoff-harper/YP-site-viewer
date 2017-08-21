var Name = decodeURI(new File(findScript())).replace(/\.[^\.]+$/, '');
var scriptPath = "";

while(Name.indexOf("/") != -1 ) {
  scriptPath = scriptPath + Name.substr(0, Name.indexOf("/") + 1);
  Name = Name.substr(Name.indexOf("/") + 1,);
}

jpgSaveOptions = new JPEGSaveOptions()
jpgSaveOptions.embedColorProfile = true
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE
jpgSaveOptions.matte = MatteType.NONE

var startTypeUnits = app.preferences.typeUnits
app.preferences.typeUnits = TypeUnits.PIXELS

var allImages = Folder(scriptPath + "images/screenshots_raw/").getFiles(/\.(jpe?g|png?)$/i );

for(var i = 0; i < allImages.length; i++) {
  var fileRef = File(allImages[i]),
      stringIndex = i + 1,
      optimFileRef = new File(scriptPath + "images/screenshots/site-" + stringIndex + ".jpg"),
      thumbFileRef = new File(scriptPath + "images/screenshots_thumb/site-" + stringIndex + ".jpg"),
      docRef = "";

  docRef = app.open(fileRef)
  docRef.resizeImage(1920)
  saveJPEG(optimFileRef, 6)
  docRef.resizeImage(1140)
  docRef.resizeCanvas(1140, 600, AnchorPosition.TOPCENTER)
  saveJPEG(thumbFileRef, 8)
  docRef.close(SaveOptions.DONOTSAVECHANGES)
}

app.preferences.typeunits = startTypeUnits

function saveJPEG(jpgFile, quality) {
  jpgSaveOptions.quality = quality || 6
  docRef.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE)
}

function findScript() {
  var where = "";
  try {
    FORCEERROR = FORCERRROR;
  }
  catch(err) {
    where = File(err.fileName);
  }
  return where;
}
