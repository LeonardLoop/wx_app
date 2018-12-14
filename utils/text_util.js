function getTextUrl(title, value, refreshName, placeholder, confirm){
  let url = '/pages/text/index?';
  url += 'title='+encodeURIComponent(title);
  url += '&value='+encodeURIComponent(value);
  url += '&refreshFunc='+encodeURIComponent(refreshName);
  url += '&placeholder=' + encodeURIComponent(placeholder ? placeholder : '选填');
  confirm ? url+='&confirm=true':null;
  console.log(url);
  return url;
}

module.exports = getTextUrl