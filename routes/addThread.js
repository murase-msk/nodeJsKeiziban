/**
 * 新規でスレッドを作成したときの処理
 */
exports.addThread = function(request, response){
	// POSTリクエストのパラメータを受け取る.
	var title = request.param("title");
	var name = request.param("name");
	var comment = request.param("comment");
	
	var pg = require('pg');	// pgオブジェクトをロードする(postgresqlを使えるようにする).
	// postgres://ユーザ名@ホスト名:ポート番号/データベース名.
	var connectionString = "postgres://postgres:murase@localhost:5432/a_keiziban";
	pg.connect(connectionString, function(err, client) {
		var query = client.query(
				// all_thread_table(スレッド一覧用テーブル)へ新規でスレッドを立てた時のデータを格納.
				"insert into all_thread_table (title, user_name) values('"+ title + "','" + name + "');" +
				// title_table(各スレッド用テーブル)の作成.
				"create table "+title+"_table (id serial, comment text, user_name text, image_path text);" +
				// 各スレッド用のテーブルへ必要なデータの格納.
				"insert into "+title+"_table (comment, user_name) values('"+ comment + "','" + name + "');"
				);
		query.on('end', function(row,err) {
			response.redirect("/allThread");	// スレッド一覧のページへリダイレクト.
			console.log("query complete");
		});
		query.on('error', function(error) {
			console.log(error);
			console.log("ERROR!");
		});
	});
};