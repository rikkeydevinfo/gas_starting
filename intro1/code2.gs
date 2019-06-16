function myFunction() {
  var today = new Date("2019-05-01");
  
  // 月初日取得
  var firstDate = new Moment.moment(new Date(today.getFullYear(), today.getMonth(), 1));
  var thisMonthDates = getThisMonthDates(firstDate);  

  // setValuesで入れる用の2次元配列を生成
  var data = [];

  thisMonthDates.forEach(function(val) {
    data.push([val.format("YYYY年-MM月-DD日(ddd)")]);
  });
 
  var sheet = SpreadsheetApp.getActive().getSheetByName('稼働実績');

  // 対象範囲は、B3 ~ B列33(thisMonthDatesの配列の数だけ)
  var range = sheet.getRange(3, 2, thisMonthDates.length, 1);
    
  range.setValues(data);
}

function getThisMonthDates(firstDate)
{
  var daysInMonth = firstDate.daysInMonth();
  var thisMonthDates = [];
    
  for (var i = 0; i < daysInMonth; i++) {
    var targetDate = firstDate.clone().add(i, 'days');
    // 休日だったらスキップ
    if (isHoliday(targetDate)) continue;
    thisMonthDates.push(targetDate);
  }
 
  return thisMonthDates;
}

// 休日だったらtrueを返す
function isHoliday(targetDate) {
  
  // 土日なら返す
  // moment.jsのdayメソッドは、0(日) ~ 6(土)の数値で返すので、土日である0か6が含まれてたらtrueを返す
  if ([0, 6].indexOf(targetDate.day()) !== -1) return true;
  
  if (isLegalHoliday(targetDate)) return true;
  
  return false;
}

// 祝祭日だったらtrueを返す
function isLegalHoliday(targetDate) {
  // 日本の祝日を表すカレンダーID
  var cal = CalendarApp.getCalendarById("ja.japanese#holiday@group.v.calendar.google.com");

  // getEventForDayは、引数にDateオブジェクトで渡す必要がある
  // この戻り値が1以上だったら祝日ということになる
  return cal.getEventsForDay(new Date(targetDate)).length > 0;
}
