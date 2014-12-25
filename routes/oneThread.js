/**
 * 各スレッドのページを表示する処理
 */
exports.oneThread = function(req, res){
	var threadName= req.query.title;	// GETリクエストのパラメータを受け取る.
	var pg = require('pg');	// pgオブジェクトをロードする(postgresqlを使えるようにする).
	// postgres://ユーザ名@ホスト名:ポート番号/データベース名.
	var connectionString = "postgres://postgres:murase@localhost:5432/a_keiziban";
	pg.connect(connectionString, function(err, client){	// データベースに接続する.
		// SQLクエリ実行.
		var query = client.query(
				"select id, comment, user_name, image_path from "+threadName+"_table ;");
		var rows = [];	// クエリの結果を入れるための変数.
		query.on('row', function(row){	// rowの取得イベント.
			rows.push(row);	// クエリの結果を入れる.
		});
		query.on('end', function(row, err){	// 終了イベント.
			// viewへ必要なデータを渡す.
			res.render('oneThread', {
				thread_name: threadName,
				data: rows
			});
		});
		query.on('error', function(error){	// エラーイベント.
			console.log("ERROR!!" + error);
		});
	});
};