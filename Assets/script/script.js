// set variable for current date and time
var now = dayjs();
// set varible to format current date being displayed at top of page
var currentDate = now.format('dddd, MMMM D, YYYY');
// set variable for the current hour to adjust color coding
var currentHour = now.format('H');
$('#currentDay').text(currentDate);
// blank array to store all the tasks for each hour
var allTasks = ['', '', '', '', '', '', '', ''];
// function to set color coding for each hour
function changePPFClass() {
  // for loop cycles through 9 am (9) and 5 pm (17)
  for (var i = 9; i < 17; i++) {
    // variable to point to the element for each hour
    var hourIndexNumEl = $('#hour-' + i);
    // variable to define hour in 24 hour format for each element containing the hour number, converts to number type
    var hourIndexNum = parseInt(hourIndexNumEl.attr('data-index'));
    // converts the current hour from dayjs to number type
    var nowHour = parseInt(currentHour);
    // if hour index of the element matches the current time hour from dayjs, the class present is added and past and future are removed
    if (hourIndexNum === nowHour) {
      hourIndexNumEl.addClass('present');
      hourIndexNumEl.removeClass('past');
      hourIndexNumEl.removeClass('future');
      // if hour index of the element is less than the current time hour from dayjs, the class past is added and present and future are removed
    } else if (hourIndexNum < nowHour) {
      hourIndexNumEl.addClass('past');
      hourIndexNumEl.removeClass('present');
      hourIndexNumEl.removeClass('future');
      // if neither equal or less than, the hour index of the element must be greater than the current time hour from dayjs, the class future is added and past and present are removed
    } else {
      hourIndexNumEl.addClass('future');
      hourIndexNumEl.removeClass('past');
      hourIndexNumEl.removeClass('present');
    }
  }
}
// this function checks the current hour from dayjs every second, if the hour from day js matches the current hour, nothing happens, but if it's different, than then function to color code the hours is run
function testHour() {
  // the interval is set to run this function every second
  setInterval(function () {
    // pulls the present hour from dayjs
    var checkHour = dayjs().format('H');
    // checks if the present dayjs hour matches the currentHour variable set at the beginning of the script, the checkHour is in the interval so it gets checked every second, the currentHour variable is not in the interval so it remains the same until the it gets changed, does nothing if they match
    if (checkHour === currentHour) {
      return;
      // if they don't match, the currenthour is set to the hour pulled from dayjs in this interval, then the function to color code the hours is run
    } else {
      currentHour = checkHour;
      changePPFClass();
    }
    // interval is set to every second
  }, 1000);
}
// function to store the array of all the hourly tasks into local storage, stringify might not be necessary but is kept in just in case
function setTasks() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  return;
}
// function to retrieve the array of all the hourly tasks from local storage, parse is used just in case, if the stored array is not null, the allTasks array is set equal to the stored array from local storage
function getTasks() {
  var storedTasks = JSON.parse(localStorage.getItem('allTasks'));
  if (storedTasks !== null) {
    allTasks = storedTasks;
  } return;
}
// function with for loop to go through each textarea by their id and set the value equal to the index of the allTasks array, basically reprints all the saved tasks
function renderTasks() {
  for (var i = 0; i < 8; i++) {
    $('#text-' + i).val(allTasks[i]);
  } return;
}
// event listener for all the save buttons, basiclaly, when any save button is clicked, the this keyword points to the save button that was clicked, then it looks for it's sibling with the class description which is the textarea and identifies it's value (the text typed into the textarea), then it looks for the data-index attribute for that element which corresponds to it's index value in the allTasks array, the array with that index is set equal to the text value in text area, finally the setTasks array is saved to local storage
// my previous code did not differentiate between which button was clicked, therefore if there was text in a different hour, it still got saved when any save button was clicked, i could've made 8 different event listeners but spent many hours trying to find a method to assign 1 event listener to all the buttons that worked on a sibling element, the TA helped me to understand that using the sibling function utilizes a relative relationship instead of an absolute relationship, and by incorporating "this" that helped to develop this code
$('.saveBtn').on('click', function () {
  var savedTask = $(this).siblings('.description').val();
  var indexNum = parseInt($(this).siblings('.description').attr("data-index"));
  allTasks[indexNum] = savedTask;
  setTasks();
  return;
})
// runs the following functions: color coding each hour for past/present/future, pulls the stored tasks from local storage and saves to the allTasks array, displays all the values from the allTasks array to their corresponding hourly textarea by matching index numbers, and runs the interval to check for a hour change from dayjs every second, for whatever reason, this did not want to run in
function init() {
  changePPFClass();
  getTasks();
  renderTasks();
  testHour();
}
// runs when the page first loads
init();

