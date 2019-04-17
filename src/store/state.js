let token = ''
let auth = []
try {
  if (localStorage.token) {
    token = localStorage.token
  }
  if (localStorage.auth) {
    auth = localStorage.auth.split(',')
  }
} catch (e) {}

export default {
  token: token,
  auth: auth
}
