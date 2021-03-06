
        
function details() {

  return {
    id: "Tdarr_Plugin_x7ac_Remove_Closed_Captions",
    Name: "Remove closed captions",
    Type: "Video",
    Operation: "Remux",
    Description: "If detected, closed captions (XDS,608,708) will be removed.",
    Version: "1.00",
    Link: "https://github.com/HaveAGitGat/Tdarr_Plugin_x7ac_Remove_Closed_Captions"
  }



}

function plugin(file) {


  //Must return this object

  var response = {

     processFile : false,
     preset : '',
     container : '.mp4',
     handBrakeMode : false,
     FFmpegMode : false,
     reQueueAfter : true,
     infoLog : '',

  }

  
  if (file.fileMedium !== "video") {

    console.log("File is not video")
  
    response.infoLog += "☒File is not video \n"
    response.processFile = false;
  
    return response
  
  } else { 


    if(file.hasClosedCaptions === true){


       response = {
          
        processFile : true,
        preset : ',-codec copy -bsf:v "filter_units=remove_types=6"',
        container : '.' + file.container ,
        handBrakeMode : false,
        FFmpegMode : true,
        reQueueAfter : true,
        infoLog : '☒This file has closed captions \n',
   
     }
   
     return response
       
    }else{

      response.infoLog += "☑Closed captions have not been detected on this file \n"
      response.processFile = false;
    
      return response


    }
  
  
  }
}

module.exports.details = details;

module.exports.plugin = plugin;

        