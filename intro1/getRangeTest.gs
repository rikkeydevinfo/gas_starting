function myFunction() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('fortest');

  // B2 (2行目の2列目)から
  // 縦に5行分
  // 横に3列分
  // の範囲を取得する
  var range = sheet.getRange(2, 2, 5, 3);

  // setValuesを使うときは２次元配列にする 
  var data = [
    ["田中"    , "男性", "44歳"],
    ["山田"    , "男性", "32歳"],
    ["大仁田"  , "男性", "56歳"],
    ["二階堂"  , "女性", "21歳"],
    ["山市"    , "男性", "18歳"]
  ];  

  range.setValues(data);  
}
