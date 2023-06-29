export const publishedDateHandler = (string:string) => {
  return string.substring(0, 10);
};

export const newsSourceHandler = (string:string) => {
  const pattern = /^(.*)\.(com|co\.uk)$/;
  const matches = string.match(pattern);
  if (matches) {
    return matches[1];
  } else {
    return string;
  }
};
export const getSentimentColor = (sentiment:number)=> { 
  if(sentiment >= -10 && sentiment < 0.5){
    return '#786BE4'
  } else if (sentiment >= 0.5 && sentiment < 1.5){
    return '#759DEB'
  } else if (sentiment >= 1.5 && sentiment < 3.5 ){
    return '#91DF75'
  } else if (sentiment >= 3.5 && sentiment < 4.5){
    return '#F6DD52'
  } else if (sentiment >= 4.5 && sentiment < 10){
    return '#FD954A'
  } return '#000'
}