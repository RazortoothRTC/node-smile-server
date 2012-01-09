var js = require('../js');
var question = exports;

var Questions = function Questions() {
  this.currentQuestions = {};
  this.numberOfQuestions = 0;
  this.listOfQuestions = [];
  this.listOfQuestionPictures = {};
}

Questions.prototype.addQuestion = function addQuestion(question) {
  if (!question.NAME) {
    return js.JumboError.unexpected('Question registration message must contain a valid NAME property.');
  }
  var questionUserName = this.currentQuestions[question.NAME];
  if (question.PIC) {
    var questionNumber = this.listOfQuestions.length;
    question.PICURL = '/smile/questionview/' + questionNumber + '.jpg';
    this.listOfQuestionPictures[questionNumber] = question.PIC;
    delete question.PIC;
  }
  if (questionUserName) {
    questionUserName.push(question);
  } else {
    this.currentQuestions[question.NAME] = [question];
  }
  this.listOfQuestions.push(question);
  this.numberOfQuestions++;
}

Questions.prototype.getQuestionPicture = function (questionNumber) {
  return this.listOfQuestionPictures[questionNumber];
}

Questions.prototype.getQuestions = function getQuestions(name) {
  var questions = this.currentQuestions[name];
  if (!questions) {
    return js.JumboError.notFound('There are no questions associated with: ' + name);
  }
  return questions;
}

Questions.prototype.getAll = function getAll() {
  return this.currentQuestions;
}

Questions.prototype.getList = function getList() {
  return this.listOfQuestions;
}

Questions.prototype.getRightAnswers = function getRightAnswers() {
  var rightAnswers = [];
  var questions = this.listOfQuestions;
  for (var key in questions) {
    var question = questions[key];
    rightAnswers.push(parseInt(question.A));
  }
  return rightAnswers;
}

Questions.prototype.getAll = function getAll() {
  return this.currentQuestions;
}

Questions.prototype.getNumberOfQuestions = function getNumberOfQuestions() {
  return this.numberOfQuestions;
}

question.Questions = Questions;