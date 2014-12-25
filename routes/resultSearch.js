/**
 * スレッドの検索を行う
 */
exports.resultSearch = function(req, res){
	var searchWord = req.param("search_word");// POSTリクエストのパラメータを受け取る.
	var pg = require('pg');	// pgオブジェクトをロードする(postgresqlを使えるようにする).
	// postgres://ユーザ名@ホスト名:ポート番号/データベース名.
	var connectionString = "postgres://postgres:murase@localhost:5432/a_keiziban";
	pg.connect(connectionString, function(err, client){	// データベースに接続する.
		var query = client.query(
				"select id, title, user_name, child_id " +
				" from all_thread_table where title like '%"+searchWord+"%';");	// SQLクエリ実行.
		var rows = [];	// クエリの結果を入れるための変数.
		query.on('row', function(row){	// rowの取得イベント.
			//  文字列解析をする.
			var s = row.title;
			s = s.split(searchWord);	//  タイトルを検索文字列で区切った配列にする.
			row.splitWordBySearchWord = s;
			rows.push(row);	// クエリの結果を入れる.
		});
		query.on('end', function(row, err){	// 終了イベント.
			// viewへ必要なデータを渡す.
			res.render('resultSearch', {
				titleHightLight: searchWord,	// 検索文字列.
				data: rows	// 画面へ出力するデータ.
			});
		});
		query.on('error', function(error){	// エラーイベント.
			console.log("ERROR!!" + error);	// エラー内容の表示.
		});
	});
	
	
};