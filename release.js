const execa = require('execa')
const inquirer = require('inquirer')

const release = async () => {
  console.log("========== release begin")

  await execa('vuepress', ['build', 'docs'], { stdio: 'inherit' })
  await execa.shell('echo ceil.top > ../docs/CNAME');

  const { msg } = await inquirer.prompt([{
    name: 'msg',
    message: `Enter Commit Message:`,
    type: 'input'
  }])

  const cmsg = msg || 'via release.js'
  
  await execa('git', ['add', '-A'])
  await execa('git', ['commit', '-m', cmsg], { stdio: 'inherit' })
  await execa('git', ['push'], { stdio: 'inherit' })

  await console.log("========== release end")
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})