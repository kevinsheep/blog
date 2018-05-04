---
layout: single
title: 微信接口测试
permalink: /wechat/
---

微信接口测试

<script src="/BGYUI/js/jquery.min.js"></script>
<script>
    
    $.ajax({
    type : "GET",
    dataType : "jsonp",
    url : "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx407bd1c616d74e89&secret=46d5fde8120476f4b4bc94f814fe58e0",
    success : function(data) {
            console.log(data);
        }//success
    });
</script>