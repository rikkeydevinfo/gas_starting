function myFunction() {
  // スプレッドシートオブジェクトを作る
  var spreadSheet = SpreadsheetApp.getActive();
   
  // シートにアクセスする
  var sheet       = spreadSheet.getActiveSheet();
  
  // 範囲(Range)にアクセスする
//  var range = sheet.getRange('B3:C10');
  var range = sheet.getRange(3,2,sheet.getLastRow()-2,2);
  var values = range.getValues();
  
  for (var i in values) {
    var birthday = new Date(values[i][1]);
    var today = new Date();
    
    Logger.log(today.getFullYear() - birthday.getFullYear());
  }
//  var rawData = range.getValues();  
}
