var remote = require('remote');
var dialog = remote.require('dialog');
var browserWindow = remote.require('browser-window');
/**
 * 読み込みするためのファイルを開く
 */
function openLoadFile() {
    var win = browserWindow.getFocusedWindow();

    dialog.showOpenDialog(
        win,
        // どんなダイアログを出すかを指定するプロパティ
        {
            properties: ['openFile'],
            filters: [
                {
                    name: 'Documents',
                    extensions: ['txt', 'text', 'html']
                }
            ]
        },
        // [ファイル選択]ダイアログが閉じられた後のコールバック関数
        function (filenames) {
            if (filenames) {
                readFile(filenames[0]);
            }
        });
}
var fs = require('fs');
/**
 * テキストを読み込み、テキストを入力エリアに設定する
 */
function readFile(path) {
    currentPath = path;
    fs.readFile(path, function (error, text) {
        if (error != null) {
            alert('error : ' + error);
            return ;
        }
        // フッター部分に読み込み先のパスを設定する
        footerArea.innerHTML = path;
        // テキスト入力エリアに設定する
        editor.setValue(text.toString(),-1);
    });
}
/**
 * ファイルを保存する
 */
function saveFile() {

    //　初期の入力エリアに設定されたテキストを保存しようとしたときは新規ファイルを作成する
    if (currentPath == "") {
        saveNewFile();
        return;
    }

    var win = browserWindow.getFocusedWindow();

    dialog.showMessageBox(win,
        {
            title: 'ファイルの上書き保存を行います。',
            type: 'info',
            buttons: ['OK', 'Cancel'],
            detail: '本当に保存しますか？'
        },
        // メッセージボックスが閉じられた後のコールバック関数
        function (respnse) {
            // OKボタン(ボタン配列の0番目がOK)
            if (respnse == 0) {
                var data = editor.getValue();
                writeFile(currentPath, data);
            }
        }
        );
}
