/**
 * あるスレッドのコメントに対しての返信用の処理
 */
exports.addReply = function(request, response){
	// POSTリクエストのパラメータを受け取る.
	var title = request.param("title");
	var name = request.param("user_name");
	var comment = request.param("comment");
	
	var imagePath = "";	// ファイルのある場所を表すパス.
	
	var pg = require('pg')	// pgオブジェクトをロードする(postgresqlを使えるようにする).
		, fs = require('fs');	// ファイルの読みをできるようにする.
	
	// 画像があれば保存.
	if(request.files.image.size > 0){
		// 一時ファイルのパス
		var tmp_path = request.files.image.path;
		// uploaded以下に置くパス
		var target_path = 'public/uploaded/' + request.files.image.name;
		imagePath = target_path;
		// uploaded以下に移動
		fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;
			// 一時ファイルを削除
			fs.unlink(tmp_path, function() {
				if (err) throw err;
			});
		});
	}	
	
	// postgres://ユーザ名@ホスト名:ポート番号/データベース名.
	var connectionString = "postgres://postgres:murase@localhost:5432/a_keiziban";
	pg.connect(connectionString, function(err, client) {
		var query = client.query(
				// 各スレッド用のテーブルへ必要なデータの格納.
				"insert into "+title+"_table (comment, user_name, image_path) " +
						" values('"+ comment + "','" + name + "','"+imagePath+"');"
				);
		query.on('end', function(row,err) {	// クエリーの結果が返ってきた時の処理.
			response.redirect("/oneThread?title="+title+"");	// スレッドのページへリダイレクト.
			console.log("query complete");
		});
		query.on('error', function(error) {
			console.log(error);
		});
	});
};