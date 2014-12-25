# nodejsExSample

## 概要
+ Node.js
+ Express4
+ EJS
+ PostgreSQL
+ eclipse(Nodeclipseプラグインを使用)

を使った掲示板プログラム

## ディレクトリ構造
+ node_modules(node.js に必要な各種モジュールが入っている．)
+ public(外部に公開するファイルをこのフォルダに入れる．uploaded ファイルにアップロードされた画像を格納しておく．)
+ routes(Web ページでの処理を行う各種 js ファイル)
	+ addReply.js(返信機能)
	+ addThread.js(新規スレッド追加機能)
	+ allThread.js(スレッド一覧表示機能)
	+ index.js
	+ oneThread.js(角スレッド内部表示機能)
	+ resultSearch.js(スレッド検索機能)
	+ user.js
+views(画面表示関係のテンプレートをこのフォルダに入れる．)
	+ allThread.ejs(スレッド一覧画面)
	+ index.ejs
	+ oneThread.ejs(各スレッド内部画面)
	+ resultSearch.ejs(スレッド検索結果画面)
+ app.js(メインのスクリプトファイル．)

## 使用するデータベース
all_thread_table(スレッド一覧テーブル)  

|フィールド名|説明|
|--------|-----------|
|id|スレッドを識別するID|
|title|スレッドのタイトル|
|user_name|スレッドを立てた人の名前|


..._table(各種レッドテーブル("..."はスレッド名), スレッド作成時に自動で作成される)

|フィールド名|説明|
|--------|-----------|
|id|投稿したコメントを識別するID|
|comment|投稿した内容|
|user_name|投稿した人の名前|
|image_path|アップロードされた画像のパス|


[image](keiziban.png)

## 参考URL
[「ビギナーのための Node.js プログラミング入門」グループ](http://libro.tuyano.com/index2?id=1115003)  
[Node.js/ExpressJS でのファイルのアップロード Add Star](http://d.hatena.ne.jp/zebevogue/20120828/1346140796)


### Tools

Created with [Nodeclipse v0.5](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   
