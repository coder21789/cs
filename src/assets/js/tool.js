export function loginHandle (res) {
  let result = res.body
  if (result.code === 20000) {
    this.$message({
      message: '请登录',
      type: 'error',
      duration: '2000'
    })
    this.$router.push('/login')
  }
  if (result.code === 10000) {
    return res
  } else {
    return res
  }
}
export function errorRequestHandle (res) {
  let result = res.body
  if (result.code !== 10000) {
    this.$message({
      message: result.result,
      type: 'error',
      duration: '2000'
    })
  }
}
