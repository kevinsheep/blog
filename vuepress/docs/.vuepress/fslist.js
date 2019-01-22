const YAML = require('yamljs')
const fs = require('fs')

/**
 * @description 取得文件夹中的文章列表元数据
 */
module.exports = function fslist(folder) {
    const path = './docs/' + folder + '/';
    const files = fs.readdirSync(path);
    let list = [];
    for (let item of files) {
        let file = {}
        file.filename = item.split('.').slice(0, -1).join('.')
        if (file.filename.toLowerCase() === "readme") {
            continue
        }

        let fstr
        let stat = fs.statSync(path + item)
        // 暂不考虑文件夹与文件混合的情况
        // if (stat.isDirectory()) {
        //    file.children = fslist(folder + '/' + item)
        // }
        // else {
            fstr = fs.readFileSync(path + item).toString().replace('\r\n', '')
            file.createTime = stat.birthtime
            file.mTime = stat.mtime
            if (fstr.indexOf('---') !== -1) {
                let cstr = fstr.split('---')
                let fobj = YAML.parse(cstr.length ? cstr[1] : cstr[0])
                file.title = fobj.title
                file.description = fobj.description
                file.pic = fobj.pic
            }
        // }
        fs.closeSync(2)

        list.push(file)
    }
    //console.log("list==", list)
    return list;
}
