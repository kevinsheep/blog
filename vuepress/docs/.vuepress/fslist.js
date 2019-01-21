const YAML = require('yamljs')
const fs = require('fs')

/**
 * @description 取得文件夹中的文章列表元数据
 */
module.exports = (folder) => {
    const path = './docs/' + folder + '/';
    const files = fs.readdirSync(path);
    let list = [];
    for (let file of files) {
        let item = {}
        item.filename = file.split('.').slice(0, -1).join('.')
        if (item.filename.toLowerCase() === "readme") {
            continue
        }
        let fstr = fs.readFileSync(path + file).toString().replace('\r\n', '')
        let stat = fs.statSync(path + file)
        fs.closeSync(2)
        item.createTime = stat.birthtime
        item.mTime = stat.mtime
        if (fstr.indexOf('---') !== -1) {
            let cstr = fstr.split('---')
            let fobj = YAML.parse(cstr.length ? cstr[1] : cstr[0])
            item.title = fobj.title
            item.description = fobj.description
            item.pic = fobj.pic
        }

        list.push(item)
    }
    console.log("list==", list)
    return list;
}
