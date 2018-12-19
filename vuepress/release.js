process.env.VUE_CLI_RELEASE = true

const execa = require('execa')

const release = async () => {
  console.log("auto release")
  await execa('cd', ['..'], { stdio: 'inherit' })
  // await execa('git', ['init'], { stdio: 'inherit' })
  await execa('git', ['add', '-A'])
  await execa('git', ['commit', '-m', 'release by js'])
  await execa('git', ['push'])
  console.log("auto release end ?")
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})