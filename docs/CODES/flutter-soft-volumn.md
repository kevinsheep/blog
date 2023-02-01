---
title: Flutter 实现音量软按键
updateTime: '2023/02/01'
---

## Introduction

这个在我在自己的老安卓手机上正常运作，启动飞快。iOS 未经测试哈。

为什么不直接使用手机自带的音量按钮？如果你的手机，音量键不幸地老化或损坏了，以至于无法使用物理按钮控制音量，这个就能派上用场了。

真是折腾啊，那么为什么不在应用市场下载一个呢？下过的都知道，他们都是在广告APP中加了个音量控制功能。

## Codes

设备底层控制就不慢慢研究了，直接用现成的：

```yaml
dependencies:
  volume_controller: ^2.0.4
```

主文件不到100行的代码：

```dart
/// main.dart
import 'package:flutter/material.dart';
import 'package:volume_controller/volume_controller.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  double _volumeValue = 0;
  bool _showSystemUI = VolumeController().showSystemUI;

  @override
  void initState() {
    super.initState();

    // Listen to system volume change
    VolumeController().listener((volume) {
      setState(() => _volumeValue = volume);
    });
  }

  @override
  void dispose() {
    VolumeController().removeListener();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: const Text('音量控制'),
            actions: [
              const Text('系统UI', style: TextStyle(
                  color: Colors.white54,
                  fontSize: 14.0,
                  height: 3,
              )),
              Switch(
                value: _showSystemUI,
                activeColor: Colors.cyanAccent,
                inactiveThumbColor: Colors.lightBlueAccent,
                onChanged: (value) {
                  _showSystemUI = value;
                  setState(() => VolumeController().showSystemUI = value);
                },
              ),
            ],
          ),
          body: Padding(
            padding: const EdgeInsets.only(top: 40),
            child: Column(
              children: [
                Row(
                  children: [
                    Flexible(
                      child: Slider(
                        label: '${_volumeValue * 100 ~/ 1}%',
                        divisions: 100,
                        value: _volumeValue,
                        min: 0,
                        max: 1,
                        onChanged: (value) =>
                            VolumeController().setVolume(value),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton.icon(
                      onPressed: () => VolumeController().muteVolume(),
                      label: const Text(''),
                      icon: const Icon(Icons.volume_off_rounded),
                    ),
                    TextButton.icon(
                      onPressed: () => VolumeController().maxVolume(),
                      label: const Text(''),
                      icon: const Icon(Icons.volume_up_rounded),
                    ),
                  ],
                ),
              ],
            ),
          )),
    );
  }
}
```

## Resources

实现效果：

![soft_volumn.jpg](../public/assets/docs/soft_volumn.jpg)

代码中引用到的库：[volume_controller](https://pub.dev/packages/volume_controller)

完整代码库见：[https://github.com/kevinsheep/flutter_soft_volume](https://github.com/kevinsheep/flutter_soft_volume)

有空了优化下样式，打个 apk 包上来，方便有共同需要却又懒得动手的。