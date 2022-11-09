var saveBtn = $('.saveBtn')

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

var now = dayjs();

var currentDate = now.format('dddd, MMMM D, YYYY');
$('#currentDay').text(currentDate);

var allTasks = [];

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

function buildTasks() {
  for (var i = 0; i < 8; i++) {
    var tasks = $('#text-' + i);
    var tasksText = tasks.val();

    if (tasksText !== null) {
      allTasks.push(tasksText)
    } else {
      return;
    }
  }
}

function displayTasks() {
  for (var i = 0; i < allTasks.length; i++) {
    $('#text-' + i).val(allTasks[i]);
  }
}

function getTasks() {
  var retrieveTasks = JSON.parse(localStorage.getItem('tasks'));
  if (retrieveTasks !== null) {
    allTasks = retrieveTasks;
  } return;
}

function setTasks() {
  if (allTasks.length > 0) {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  } return;
}

function saveTasks() {
  for (var i = 0; i < 8; i++) {
    var text = $('#text-' + i).val();
    allTasks[i] = text;
  }
  setTasks();
}

changePPFClass();

buildTasks();

getTasks();

displayTasks();

saveBtn.on('click', saveTasks);

