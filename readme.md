Changing app name

- ios
  |- change CFBundleDisplayName
  |- npm install
  |- pod install
  |- reinstall app to phone
- android
  |- /android/app/src/main/res/values/string.xml
  | |- change name
  |- cd android
  |- gradlew clean
  |- cd ..
  |- reinstall app to phone

Changing Bundle or package name

- ios
  |- open ios/Exchange.xcodeproj
- android
  |- android/app/src/main/java/../../MainActivity.java
  | |- package My.App.NewId
  |- android/app/src/main/java/../../MainApplication.java
  | |- package My.App.NewId
  |- android/app/src/main/AndroidManifest.xml
  | |- package="My.App.NewId"
  |- android/app/build.gradle
  | |- applicationId "My.App.NewId"
  |- android/app/BUCK
  | |- `| | android_build_config( | | package = "My.App.NewId", | | ) | | `
  | |- `| android_resource( | package = "My.App.NewId", | ) | `
  |- gradlew clean

Change icon

- ios
  |- open ios/Exchange.xcodeproj
- android
  |- change png at /android/app/src/main/res/midmap...
