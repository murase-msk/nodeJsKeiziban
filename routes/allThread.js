/**
 * スレッド一覧を表示する処理
 */
exports.allThread = function(req, res){
	// pgオブジェクトをロードする(postgresqlを使えるようにする).
	var pg = require('pg');
	// postgres://ユーザ名@ホスト名:ポート番号/データベース名.
	var connectionString = "postgres://postgres:murase@localhost:5432/a_keiziban";
	// データベースに接続する.
	pg.connect(connectionString, function(err, client){
		// SQLクエリ実行.
		var query = client.query(
				'select id, title, user_name from all_thread_table;');
		var rows = [];	// クエリの結果を入れるための変数.
		query.on('row', function(row){	// rowの取得イベント.
			rows.push(row);	// クエリの結果を入れる.
		});
		query.on('end', function(row, err){	// 終了イベント.
			// view/allThread.ejsをレンダリングする処理.
			res.render('allThread', {
				// viewへ必要なデータを渡す.
				title: 'allThread',
				data: rows
			});
		});
		query.on('error', function(error){	// エラーイベント.
			console.log("ERROR!!" + error);
		});
	});
};