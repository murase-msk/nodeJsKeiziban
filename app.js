
/**
 * Module dependencies.
 */

var express = require('express')	// expressモジュールをロードする.
	, routes = require('./routes')	
	, user = require('./routes/user')
	, http = require('http')		// httpモジュールをロードする(http各種機能を使えるようにする).
	, path = require('path')		// ファイルパスを扱うためのモジュールをロードする.
	, allThread = require('./routes/allThread')			// route/allThread.js(スレッド一覧用モジュール)のロード.
	, oneThread = require('./routes/oneThread')			// スレッド内部閲覧用モジュールのロード.
	, resultSearch = require('./routes/resultSearch')	// 検索モジュールのロード.
	, addThread = require('./routes/addThread')			// スレッド追加モジュールのロード.
	, addReply = require('./routes/addReply');			// 返信モジュールのロード.

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);	// ポート番号の指定.
app.set('views', __dirname + '/views');	// /viewsフォルダをviewとして使用する.
app.set('view engine', 'ejs');	// テンプレートエンジンの指定.
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname, 'public'));	// /publicを公開フォルダにする.
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());	// エラーの出力をする.
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/allThread', allThread.allThread);			// routes/allThread.jsで作成したオブジェクトを/allThreadのURIとして設定する(getリクエストを受け付ける).
app.get('/oneThread', oneThread.oneThread);			// URLの設定をする(getリクエストを受け付ける).
app.post('/resultSearch', resultSearch.resultSearch);// URLの設定をする(postリクエストを受け付ける).
app.post('/addThread', addThread.addThread);		// URLの設定をする(postリクエストを受け付ける).
app.post('/addReply', addReply.addReply);			// URLの設定をする(postリクエストを受け付ける).
app.get('public/uploaded');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
