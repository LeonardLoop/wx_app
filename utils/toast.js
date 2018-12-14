// icon可选值： "success", "loading", "none"
function toast(title, icon, duration){
  var _title = title
  var _icon = icon || 'none';
  var _duration = duration || 3000
  wx.showToast({
    title: title,
    icon: _icon,
    duration: _duration
  })
} 
module.exports = toast