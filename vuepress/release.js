const execa = require('execa')

const release = async () => {
  console.log("========== release begin")

  await execa('vuepress', ['build', 'docs'], { stdio: 'inherit' })

  await execa.shell('echo ceil.top > ../docs/CNAME');

  await execa('git', ['add', '-A'])
  await execa('git', ['commit', '-m', 'via release.js'], { stdio: 'inherit' })
  await execa('git', ['push'], { stdio: 'inherit' })
  
  await console.log("========== release end")
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})