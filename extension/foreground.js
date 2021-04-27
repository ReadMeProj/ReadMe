/*const ogp_parser = require("./ogp_parser")

const ogp = ogp_parser(document)
*/ 
if(document.querySelector("property=\"og:type\" content=\"article\"")){
  console.log("Its an article")
}
else{
  console.log("Its NOT an article")
}

/* if(document.querySelector("meta[property=og:type]")){

    if(document.querySelector("metaproperty=og:type]").getAttribute("content") === "article")
  
      console.log("found an article");
      // do something
  
  }
  else{
  
    console.log("meta description not found");
    // do something
  
  } */