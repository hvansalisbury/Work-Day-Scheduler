var now = dayjs();

var currentDate = now.format('dddd, MMMM D, YYYY');
var currentHour = now.format('H');
$('#currentDay').text(currentDate);

var allTasks = ['', '', '', '', '', '', '', ''];

function changePPFClass() {
  for (var i = 9; i < 17; i++) {
    var hourIndexNumEl = $('#hour-' + i)
    var hourIndexNum = parseInt(hourIndexNumEl.attr('data-index'));
    var currentHour = parseInt(dayjs().format('H'));
    if (hourIndexNum === currentHour) {
      hourIndexNumEl.addClass('present');
      hourIndexNumEl.removeClass('past');
      hourIndexNumEl.removeClass('future');
    } else if (hourIndexNum < currentHour) {
      hourIndexNumEl.addClass('past');
      hourIndexNumEl.removeClass('present');
      hourIndexNumEl.removeClass('future');
    } else {
      hourIndexNumEl.addClass('future');
      hourIndexNumEl.removeClass('past');
      hourIndexNumEl.removeClass('present');
    }
  }
}

function testHour() {
setInterval(function () {
var checkHour = dayjs().format('H');
console.log(checkHour);
console.log(currentHour);
    if (checkHour === currentHour) {
      return;
    } else {
      currentHour = checkHour;
      changePPFClass();
    }
  }, 1000);
}

function setTasks() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  return;
}

function getTasks() {
  var storedTasks = JSON.parse(localStorage.getItem('allTasks'));
  if (storedTasks !== null) {
    allTasks = storedTasks;
  } return;
}

function renderTasks() {
  for (var i = 0; i < 8; i++) {
    $('#text-' + i).val(allTasks[i]);
  } return;
}

$('.saveBtn').on('click', function () {
  var savedTask = $(this).siblings('.description').val();
  var indexNum = parseInt($(this).siblings('.description').attr("data-index"));
  allTasks[indexNum] = savedTask
  setTasks()
  return;
})

changePPFClass();
getTasks();
renderTasks();
testHour();