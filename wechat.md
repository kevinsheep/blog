---
layout: single
title: 微信接口测试
permalink: /wechat/
---

微信接口测试

<script src="./BGYUI/js/jquery.min.js"></script>
<script>
    
    $.ajax({
    type : "GET",
    url : "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxcea822749e1de7bb&secret=865e00ef65bd0de3930016a7cd1def6f",
    success : function(data) {
            console.log(data);
        }//success
    });
</script>