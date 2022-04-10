module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('----登入----')
      return next()
    }
    
    console.log('----無法登入----')
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  }
}
