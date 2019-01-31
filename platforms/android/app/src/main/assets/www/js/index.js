/*ExperienceSampler License

The MIT License (MIT)

Copyright (c) 2014-2015 Sabrina Thai & Elizabeth Page-Gould

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* activate localStorage */
var localStore = window.localStorage;
/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
var surveyQuestions = [
						/*0*/
                       {
                       "type": "mult1",
                       "variableName": "snooze",
                       "questionPrompt": "Are you able to take the survey now?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"}
                                ],
                       },
                    	/*1*/
                       {
                       "type": "instructions",
                       "variableName": "generalInstructions",
                       "questionPrompt": "On the following screens, we will be asking you questions about your experiences since we last beeped you.",
                       },
                       /*2*/
                       {
                       "type": "mult2",                       
                       "variableName": "mood",
                       "questionPrompt": "Please indicate how you feel right now.",
                       "minResponse": -3,
                       "maxResponse": 3,
                       "labels":[
                                {"label": "3 Very positive"},
                                {"label": "2 Somewhat positive"},
                                {"label": "1 A little positive"},
                                {"label": "0 Neutral"},
                                {"label": "-1 A little negative"},
                                {"label": "-2 Somewhat negative"},
                                {"label": "-3 Very negative"},  
                                ]
                       },
                       /*3*/
                       {
                       "type": "text",
                       "variableName": "mostStressfulEvent",
                       "questionPrompt": "What the most stressful thing you experienced today?",
                       },
                       /*4*/
                       {
                       "type": "slider",
                       "variableName": "stressThermometer",
                       "questionPrompt": "Please indicate the amount of stress you are experiencing at the moment by moving the slider up or down. 0 means you are experiencing no stress and 100 means you are experiencing the highest amount of stress. You can see the value to the right of the slider.",
                       "minResponse": 0,
                       "maxResponse": 100,
                       },
                       /*5*/
                       {
                       "type": "mult1",
                       "variableName": "experienceConflict",
                       "questionPrompt": "Did you experience any conflicts since the last time you completed the survey?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"}
                                ],
                       },
                       /*6*/
                       {
                       "type": "text",
                       "variableName": "conflictParticipant",
                       "questionPrompt": "Who was the primary person involved in this conflict?",
                       },
                       /*7*/
                       {
                       "type": "mult1",
                       "variableName": "otherConflictParticipant",
                       "questionPrompt": "Was anyone else involved?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"}
                                ],                       
                       },
                       /*8*/
                       {
                       "type": "text",
                       "variableName": "otherConflictParticipantNames",
                       "questionPrompt": "Who else was involved in this conflict? Please list the names of the other people involved in the conflict.",
                       },
                       /*9*/
                       {
                       "type": "mult1",
                       "variableName": "closeness",
                       "questionPrompt": "How close do you feel to NAME right now?",
                       "minResponse": 0,
                       "maxResponse": 6,
                       "labels": [
                                {"label": "0 Not at all close"},
                                {"label": "1"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                {"label": "6 Extremely close"}
                                ],
                       },
                       /*10*/
                       {
                       "type": "mult1",
                       "variableName": "conflictTopic",
                       "questionPrompt": "What was the conflict about? Please select from the list of options below.",
                       "minResponse": 1,
                       "maxResponse": 11,
                       "labels":[
                                {"label": "Money"},
                                {"label": "Sex"},
                                {"label": "Work"},
                                {"label": "Children"}, 
                            	{"label": "Chores"},
                            	{"label": "Communication"},
                            	{"label": "Jealousy"},
                            	{"label": "Lack of Consideration"}, 
                            	{"label": "Lack of Respect"},  
                            	{"label": "Differences in Opinions"},                 
                            	{"label": "Other"},                                       
                                ],
                       },
                       /*11*/
                       {
                       "type": "text",
                       "variableName": "conflictTopicOther",
                       "questionPrompt": "Please specify what you mean by 'other.'",
                       },
                       /*12*/
                       {
                       "type": "mult1",
                       "variableName": "conflictResolution",
                       "questionPrompt": "Was the conflict resolved?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"},
                                ],
                       },
                       /*13*/
                       {
                       "type": "mult1",
                       "variableName": "conflictSupport",
                       "questionPrompt": "Did you seek support or talk to anyone after the conflict?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"},
                                ],
                       },
                       /*14*/
                       {
                       "type": "text",
                       "variableName": "conflictSupporter",
                       "questionPrompt": "Who did you seek support from following this conflict? Please also indicate your relationship to this person. (e.g., Mike S. - Coach)",
                       }, 
                       /*15*/                                             
                       {
                       "type": "checklist",
                       "variableName": "typeOfSupport",
                       "questionPrompt": "Please tell us what kind of support this person provided. Please select as many as applicable.",
                       "minResponse": 1,
                       "maxResponse": 4,
                       "labels": [
                                {"label": "Emotional support (e.g., listened to you, cheered you up)"},
                                {"label": "Esteem support (e.g., encouraged you, boosted your confidence)"},
                                {"label": "Informational support (e.g., gave you advice, offered ideas and suggestions)"},
                                {"label": "Tangible support (e.g., helped you with tasks)"},                                
                                ],
                       },	 		                    
                       /*16*/
                       {
                       "type": "mult1",
                       "variableName": "otherConflictSupporters",
                       "questionPrompt": "Did you seek support from anyone else following this conflict?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"},
                                ],
                       }
];
var lastPage = [
                {
                "message": "Thank you for completing today’s questions. Please wait while the data is sent to our servers..."
                },
                {
                "message": "That's cool! I'll notify you again in 10 minutes!"
                },
                {
                "message": "Thank you for installing our app. Please wait while the data is sent to our servers..."
                }
                ];
var participantSetup = [
                        {
                        "type": "text",
                        "variableName": "participant_id",
                        "questionPrompt": "Please enter your participant ID:"
                        },
                        {
                    	"type": "timePicker",
                        "variableName": "weekdayWakeTime",
                        "questionPrompt": "Please select the time that you usually wake up on WEEKDAYS:"
                        },
                        {
                    	"type": "timePicker",
                        "variableName": "weekdayDinnerTime",
                        "questionPrompt": "Please select the time that you usually have dinner on WEEKDAYS:"
                        },
                        {
                        "type": "timePicker",
                        "variableName": "weekendWakeTime",
                        "questionPrompt": "Please select the time that you usually wake up on WEEKENDS:"
                        },
                        {
                        "type": "timePicker",
                        "variableName": "weekendDinnerTime",
                        "questionPrompt": "Please select the time that you usually have dinner on WEEKENDS:"
                        },
                        ];

/*Populate the view with data from surveyQuestion model*/
// Making mustache templates
//Here you declare global variables are well 
var NUMSETUPQS = participantSetup.length;
var SNOOZEQ = 0;
var questionTmpl = "<p>{{{questionText}}}</p><ul>{{{buttons}}}</ul>";
var questionTextTmpl = "{{{questionPrompt}}}";
var buttonTmpl = "<li><button id='{{id}}' value='{{value}}'>{{label}}</button></li>";
var textTmpl = "<li><textarea cols=50 rows=5 id='{{id}}'></textarea></li><li><button type='submit' value='Enter'>Enter</button></li>";
var checkListTmpl =  "<li><input type='checkbox' id='{{id}}' value='{{value}}'>{{label}}</input></li>";
var instructionTmpl = "<li><button id='{{id}}' value = 'Next'>Next</button></li>";
var sliderTmpl = "<li><input type='range' min='{{min}}' max='{{max}}' value='{{value}}' orient=vertical id='{{id}}' oninput='outputUpdate(value)'></input><output for='{{id}}' id='slider'>50</output><script>function outputUpdate(slidervalue){document.querySelector('#slider').value=slidervalue;}</script></li><li><button type='submit' value='Enter'>Enter</button></li>";
var datePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var dateAndTimePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY-HH-mm" data-template="D MMM YYYY  HH:mm" name="datetime24"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var timePickerTmpl = "<li><input id ='{{id}}' type='time'></input><br /><br /></li><li><button type='submit' value='Enter'>Enter</button></li>";
var lastPageTmpl = "<h3>{{message}}</h3>";
var uniqueKey; 
var name;
var db;
var _currentQuestion;
var _response;
var _tableData;
var logOb;


var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    document.addEventListener("resume", this.onResume, false);
    document.addEventListener("pause", this.onPause, false);
},
onDeviceReady: function() {


    // Creating Database
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
    app.init();

   window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(dir) {
      console.log("got main dir csv", dir);
      dir.getFile("surveyData.csv", {
        create: true
      }, function(file) {
        console.log("got the file", file);
        logOb = file;
        var csv = "";
        //we should have the same amount of name/cookie fields
        var name = "testdata1";
        var cookies = "testdata2",
          csv = csv + "" + name + "," + cookies + "\n";
        console.log("csv-" + csv);
        writeLog(csv);
      });
    });

    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dirEntry) {
        console.log('file system open: ' + dirEntry.name);
        var isAppend = true;
        //createFile(dirEntry, "survey.txt", isAppend);
    });





},
onResume: function() {app.sampleParticipant();},
onPause: function() {app.pauseEvents();},
//Beginning our app functions
/* The first function is used to specify how the app should display the various questions. You should note which questions 
should be displayed using which formats before customizing this function*/
renderQuestion: function(question_index) {
    //First load the correct question from the JSON database
    var question;
    if (question_index <= -1) {question = participantSetup[question_index + NUMSETUPQS];}
    else {question = surveyQuestions[question_index];}
    var questionPrompt = question.questionPrompt;
	if (questionPrompt.indexOf('NAME') >= 0) {
		questionPrompt = questionPrompt.replace("NAME", function replacer() {return name;});
      	}
    question.questionText = Mustache.render(questionTextTmpl, {questionPrompt: questionPrompt});
    
    //Now populate the view for this question, depending on what the question type is
    switch (question.type) {
    	case 'mult1': // Rating scales (i.e., small numbers at the top of the screen and larger numbers at the bottom of the screen).
    		question.buttons = "";
        	var label_count = 0;
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	question.buttons += Mustache.render(buttonTmpl, {
                                                id: question.variableName+i,
                                                value: i,
                                                label: label
                                                });
        	}
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;
        case 'mult2': // Rating scales (i.e., positive numbers at the top of the screen and negative numbers at the bottom of the screen).
    		question.buttons = "";
            var label_count = 0;
            for (var j = question.maxResponse; j >= question.minResponse; j--) {
                var label = question.labels[label_count++].label;
                question.buttons += Mustache.render(buttonTmpl, {
                                                    id: question.variableName+j,
                                                    value: j,
                                                    label: label
                                                    });
            }
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;		
        case 'checklist':
        	question.buttons = "";
        	var label_count = 0;
        	var checkboxArray = [];
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	question.buttons += Mustache.render(checkListTmpl, {
                                                	id: question.variableName+i,
                                                	value: i,
                                                	label: label
                                                	});
        	}
        	question.buttons += "<li><button type='submit' value='Enter'>Enter</button></li>";
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click( function(){
                                          checkboxArray.push(question.variableName);
                                          $.each($("input[type=checkbox]:checked"), function(){checkboxArray.push($(this).val());});
                                          app.recordResponse(String(checkboxArray), question_index, question.type);
            });
            break;
        case 'slider':
        	question.buttons = Mustache.render(sliderTmpl, {id: question.variableName+"1"}, {min: question.minResponse}, {max: question.maxResponse}, {value: (question.maxResponse)/2});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var slider = [];
        	$("#question ul li button").click(function(){
        			slider.push(question.variableName);
        			slider.push($("input[type=range]").val());
        			app.recordResponse(String(slider), question_index, question.type);
        	});
        	break;
        case 'instructions':
        	question.buttons = Mustache.render(instructionTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var instruction = [];
        	$("#question ul li button").click(function(){ 
        		instruction.push(question.variableName);
        		instruction.push($(this).val());
        		app.recordResponse(String(instruction), question_index, question.type);
        	});
        	break;
        case 'text': //default to open-ended text
        	 question.buttons = Mustache.render(textTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				if (app.validateResponse($("textarea"))){
        		 	app.recordResponse($("textarea"), question_index, question.type);
                } 
                else {
                    alert("Please enter something.");
                }
            });
            break;
        case 'datePicker':
        	question.buttons = Mustache.render(datePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;    
        case 'dateAndTimePicker':
        	question.buttons = Mustache.render(dateAndTimePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;
        case 'timePicker':
        	question.buttons = Mustache.render(timePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var time, timeSplit, variableName = [], timeArray = [];
        	$("#question ul li button").click(function(){
				if (app.validateTime($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                } 
                else {
                    alert("Please enter a time.");
                }
        	});
        	break;	        		                 
        }
},

renderLastPage: function(pageData, question_index) {
    $("#question").html(Mustache.render(lastPageTmpl, pageData));
    if ( question_index == SNOOZEQ ) {
        app.snoozeNotif();
        localStore.snoozed = 1;
        app.saveData();        
    }
    else if ( question_index == -1) {
    	app.saveDataLastPage();
    }
    else {
    	var datestamp = new Date();
    	var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
    	localStore[uniqueKey + '.' + "completed" + "_" + "completedSurvey"  + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds] = 1;	
    	app.saveDataLastPage();
    }
},
    /* Record User Responses */
recordResponse: function(button, count, type) {
    //Record date (create new date object)
    var datestamp = new Date();
    var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
    //Record value of text field
    var response, currentQuestion, uniqueRecord;
    if (type == 'text') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }
    else if (type == 'slider') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record the array
    else if (type == 'checklist') {
        response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    else if (type == 'instructions') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record value of clicked button
    else if (type == 'mult1') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    //Record value of clicked button
    else if (type == 'mult2') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    else if (type == 'datePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'dateAndTimePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'timePicker') {
    	response = button.val();
        currentQuestion = button.attr('id').slice(0,-1);
    }
    if (count == 6) {name = response;}
    if (count <= -1) {uniqueRecord = currentQuestion;}
    else {uniqueRecord = uniqueKey + "_" + currentQuestion + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds;}
//     //Save this to local storage
    localStore[uniqueRecord] = response;
    _currentQuestion=currentQuestion;
    _response=response;
    db.transaction(insertDB, errorCB, successCB);
    db.transaction(allRows, errorCB, successCB);



    console.log(_tableData);

    //Identify the next question to populate the view
    //This is where you do the Question Logic
    if (count <= -1) {console.log(uniqueRecord);}
   	if (count == -1) {app.scheduleNotifs(); app.renderLastPage(lastPage[2], count);}
    else if (count == SNOOZEQ && response == 0) {app.renderLastPage(lastPage[1], count);}
    else if (count == 5 && response == 0) {app.renderLastPage(lastPage[0], count);}
    else if (count == 5 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(6);});}
    else if (count == 7 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(9);});}
    else if (count == 7 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(8);});}
    else if (count == 10 && response < 11) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(12);});}
    else if (count == 10 && response == 11) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(11);});}
    else if (count == 13 && response == 0) {app.renderLastPage(lastPage[0], count);}
    else if (count == 13 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});}
    else if (count == 16 && response == 0) {app.renderLastPage(lastPage[0], count);}
    else if (count == 16 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});}
    else if (count < surveyQuestions.length-1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});}
    else {app.renderLastPage(lastPage[0], count);}
},
    /* Prepare for Resume and Store Data */
    /* Time stamps the current moment to determine how to resume */
pauseEvents: function() {
    localStore.pause_time = new Date().getTime();
    app.saveData();
}, 
    /* Initialize the whole thing */
init: function() {
//// testing in browser



    //alert("Participant id :"+localStore.participant_id);

    uniqueKey = new Date().getTime();
    if (localStore.participant_id === " " || !localStore.participant_id) {app.renderQuestion(-NUMSETUPQS);}
    else {
    	uniqueKey = new Date().getTime();
        localStore.uniqueKey = uniqueKey;
	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;	
        app.renderQuestion(0);
    }


    localStore.snoozed = 0;
    db.transaction(allRows, errorCB, successCB);
    alert("rows are: "+ _tableData);
    console.log(_tableData);

 //   createFile();

//     var path = "file:///C:/Users/Jubayed/IdeaProjects/helloIntelij/www";
//     var filename = "myfile.txt";
//
//
//     window.resolveLocalFileSystemURL(path, function(dir) {
//                    	dir.getFile(filename, {create:true}, function(fileEntry) {
//                                // The file has been succesfully created. Use fileEntry to read the content or delete the file
//                    	});
//
//                    });
//












},


//createDB: function(tx){
//
//    //tx.executeSql('DROP TABLE IF EXISTS survey_db');//This will delete database everytime when app installed or program runs
//    tx.executeSql('CREATE TABLE IF NOT EXISTS survey_db (id, uniqueKey, snoozedTime)');
//},
//
//errorCB: function(err){
//    alert("error processing sql "+err.code);
//},
//
//successCB: function(){
//    alert("Yeah!!");
//},

sampleParticipant: function() {
    var current_moment = new Date();
    var current_time = current_moment.getTime();
    if ((current_time - localStore.pause_time) > 600000 || localStore.snoozed == 1) {
        uniqueKey = new Date().getTime();
    	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;		    
        localStore.snoozed = 0;
        app.renderQuestion(0);
    }
    else {
        uniqueKey = localStore.uniqueKey;
    }
    alert(localStore.participant_id);
    app.saveData();

},


saveData:function() {



    alert(localStore);

    $.ajax({
           type: 'get',
           url: 'https://script.google.com/macros/s/AKfycbzzbp0437BkTqx95W9THF9JhWcydzn-K-FJTbwIHF23-S0JbDXG/exec',
           data: localStore,
           crossDomain: true,
           success: function (result) {
           var pid = localStore.participant_id, snoozed = localStore.snoozed,
           		uniqueKey = localStore.uniqueKey, pause_time = localStore.pause_time;
           localStore.clear();
           localStore.participant_id = pid;
           localStore.snoozed = snoozed;
           localStore.uniqueKey = uniqueKey;
           localStore.pause_time = pause_time;
           },
           error: function (request, error) {console.log(error);},
           });




},
saveDataLastPage:function() {
    $.ajax({
           type: 'get',
           url: 'https://script.google.com/macros/s/AKfycbzzbp0437BkTqx95W9THF9JhWcydzn-K-FJTbwIHF23-S0JbDXG/exec',
           data: localStore,
           crossDomain: true,
           success: function (result) {	
           		var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey;
           		localStore.clear();
            	localStore.participant_id = pid;
           		localStore.snoozed = snoozed;
           		localStore.uniqueKey = uniqueKey;


           		$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey.</h3>");

           },
           error: function (request, error) {
           		console.log(error);
                $("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers.</h3><br><button>Resend data</button>");
                $("#question button").click(function () {app.saveDataLastPage();});           		
           	},
           });
},

//insertDB: function(tx){
//    var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey;
//     localStore.clear();
//     localStore.participant_id = pid;
//     localStore.snoozed = snoozed;
//     localStore.uniqueKey = uniqueKey;
//
//     var sql='INSERT INTO survey_db (id, uniqueKey, snoozedTime) VALUES (?,?,?)';
//     tx.executeSql( sql, [pid, uniqueKey, snoozed], null , errorCB );
//
//},
//
//successQueryDB: function(){
//
//},
scheduleNotifs:function() {
	//cordova.plugins.backgroundMode.enable();
   	var interval1, interval2, interval3, interval4, interval5, interval6, interval7
   	var a, b, c, d, e, f, g;
   	var date1, date2, date3, date4, date5, date6, date7;
   	var currentMaxHour, currentMaxMinutes, currentMinHour, currenMinMinutes, nextMinHour, nextMinMinutes;
   	var currentLag, dinnerLag, maxInterval;
   	var day = 86400000;
   	var minDiaryLag = 5400000;
   	var randomDiaryLag = 1800000;
	var weekendDinnerTime = localStore.weekendDinnerTime.split(":");
	var weekendWakeTime = localStore.weekendWakeTime.split(":");
	var weekdayDinnerTime = localStore.weekdayDinnerTime.split(":");
	var weekdayWakeTime = localStore.weekdayWakeTime.split(":");
	var dateObject = new Date();
    var now = dateObject.getTime(); 
    var dayOfWeek = dateObject.getDay(), currentHour = dateObject.getHours(), currentMinute = dateObject.getMinutes();
   	for (i = 0; i < 7; i ++) {
   		var alarmDay = dayOfWeek + 1 + i; 
   			if (alarmDay > 6) {alarmDay = alarmDay - 7;}
   			if (alarmDay == 0 || alarmDay == 6) {
   				currentMaxHour = weekendDinnerTime[0];
   				currentMaxMinutes = weekendDinnerTime[1];
   				currentMinHour = weekendWakeTime[0];
   				currenMinMinutes = weekendWakeTime[1];
   				if (alarmDay == 0) {
   					nextMinHour = weekdayWakeTime[0];
   					nextMinMinutes = weekdayWakeTime[1];
   				}
   				else {
   					nextMinHour = weekendWakeTime[0];
   					nextMinMinutes = weekendWakeTime[1];
   				}
   				currentLag = (((((24 - parseInt(currentHour) + parseInt(weekendWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekendWakeTime[1]))*60)*1000);
				
   			}
   			else {
   				currentMaxHour = weekdayDinnerTime[0];
   				currentMaxMinutes = weekdayDinnerTime[1];
   				currentMinHour = weekdayWakeTime[0];
   				currenMinMinutes = weekdayWakeTime[1];   				
   				if (alarmDay == 5) {
   					nextMinHour = weekendWakeTime[0];
   					nextMinMinutes = weekendWakeTime[1];
   				}
   				else {
   					nextMinHour = weekdayWakeTime[0];
   					nextMinMinutes = weekdayWakeTime[1];   				
   				}
                currentLag = (((((24 - parseInt(currentHour) + parseInt(weekdayWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekdayWakeTime[1]))*60)*1000);
   			}
   			if (alarmDay == 5 || alarmDay == 0) {nightlyLag = currentLag;}
   			else {
            	nightlyLag= (((((24 - parseInt(currentHour) + parseInt(nextMinHour))*60) - parseInt(currentMinute) + parseInt(nextMinMinutes))*60)*1000);
   			}
   			maxInterval = (((((parseInt(currentMaxHour) - parseInt(currentMinHour))*60) + parseInt(currentMaxMinutes) - parseInt(currenMinMinutes))*60)*1000);
   			interval1 = parseInt(currentLag) + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag)) + day*i;
   			interval2 = interval1 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval3 = interval2 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval4 = interval3 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval5 = interval4 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval6 = interval5 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			dinnerInterval = parseInt(currentLag) + parseInt(maxInterval) + day*i;
   			
   			a = 101+(parseInt(i)*100);
            b = 102+(parseInt(i)*100);
            c = 103+(parseInt(i)*100);
            d = 104+(parseInt(i)*100);
            e = 105+(parseInt(i)*100);
            f = 106+(parseInt(i)*100);
            
        	date1 = new Date(now + interval1);
        	date2 = new Date(now + interval2);
        	date3 = new Date(now + interval3);
        	date4 = new Date(now + interval4);
        	date5 = new Date(now + interval5);
        	date6 = new Date(now + interval6);
        	
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: a, at: date1, text: 'Time for your next Diary Survey!', title: 'Diary Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: b, at: date2, text: 'Time for your next Diary Survey!', title: 'Diary Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: c, at: date3, text: 'Time for your next Diary Survey!', title: 'Diary Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: d, at: date4, text: 'Time for your next Diary Survey!', title: 'Diary Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: e, at: date5, text: 'Time for your next Diary Survey!', title: 'Diary Survey'});
        	cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: f, at: date6, text: 'Time for your next Diary Survey!', title: 'Diary Survey'}); 

        	localStore['notification_' + i + '_1'] = localStore.participant_id + "_" + a + "_" + date1;
        	localStore['notification_' + i + '_2'] = localStore.participant_id + "_" + b + "_" + date2;
        	localStore['notification_' + i + '_3'] = localStore.participant_id + "_" + c + "_" + date3;
        	localStore['notification_' + i + '_4'] = localStore.participant_id + "_" + d + "_" + date4;
        	localStore['notification_' + i + '_5'] = localStore.participant_id + "_" + e + "_" + date5;
        	localStore['notification_' + i + '_6'] = localStore.participant_id + "_" + f + "_" + date6;
        	}
},
snoozeNotif:function() {
    var now = new Date().getTime(), snoozeDate = new Date(now + 600*1000);
    var id = '99';
    cordova.plugins.notification.local.schedule({
                                         icon: 'ic_launcher',
                                         id: id,
                                         title: 'Diary Survey',
                                         text: 'Please complete survey now!',
                                         at: snoozeDate,
                                         });
  //console.log(snoozeDate);                                       
},     
validateResponse: function(data){
        var text = data.val();
//         console.log(text);
        if (text === ""){
        	return false;
        } else { 
        	return true;
        }
    }, 
validateTime: function(data){
	var time = data.val();
	if (time=== ""){
		return false	
	}
	else {
		return true
	}
}       
};




function allStorage() {

    var values = [],
        keys = Object.keys(localStore),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

 function populateDB(tx) {
        // tx.executeSql('DROP TABLE IF EXISTS DEMO');
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (question, response)');

//         alert("Participant id from populateDB:"+localStore.participant_id);
//         alert("Unique Key "+localStore.uniqueKey);


    }

     function insertDB(tx) {
             var sql='INSERT INTO DEMO ( question, response) VALUES (?,?)';
             tx.executeSql(sql,[_currentQuestion,_response],successCB,errorCB);
//             tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1 , "First row")');
//             tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
//             alert("Participant id from populateDB:"+localStore.participant_id);
//             alert("Unique Key "+localStore.uniqueKey);
//             alert("Current Question: "+_currentQuestion);
//             alert("response: "+_response);


        }


       //Read all database file


      function allRows(tx){

           tx.executeSql('SELECT * FROM DEMO', [], function (tx, results) {
             var len = results.rows.length, i;


             for (i = 0; i < len; i++) {

                   // questions=questions+results.rows.item(i).question.text;
                    //responses=responses+results.rows.item(i).response.text;

                    _tableData += results.rows.item(i).question;
//                    alert("rows are: "+ _tableData);


             }
           });


      }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }

//    function createFile(){
//
//        var path = "file:///C:/Users/Jubayed/IdeaProjects/helloIntelij/www";
//        alert("Creating file");
//        var filename = "myfile.txt";
//
//            window.resolveLocalFileSystemURL(path, function(dir) {
//            	dir.getFile(filename, {create:true}, function(fileEntry) {
//                        // The file has been succesfully created. Use fileEntry to read the content or delete the file
//            	});
//
//            });
//
//
//
//    }


function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            //readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data edited'], { type: 'text/plain' });
            console.log("data Obj writing");

        }

        fileWriter.write(dataObj);
    });
}





 function writeLog(str) {
   if (!logOb) return;
   logOb.createWriter(function(fileWriter) {
     fileWriter.seek(fileWriter.length);

     var blob = new Blob([str], {
       type: 'text/plain'
     });
     fileWriter.write(blob);
     console.log("ok, in theory i worked");
   });
 }

//
// function createFile(dirEntry, fileName, isAppend) {
//     // Creates a new file or returns the file if it already exists.
//     console.log("Inside CreateFile");
//     dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
//
//         writeFile(fileEntry, null, isAppend);
//
//     });
//
// }

function writeLog(str) {
	if(!logOb) return;
	var log = str + " [" + (new Date()) + "]\n";
	console.log("going to log "+log);
	logOb.createWriter(function(fileWriter) {

		fileWriter.seek(fileWriter.length);

		var blob = new Blob([log], {type:'text/plain'});
		fileWriter.write(blob);
		console.log("ok, in theory i worked");
	}, fail);
}

function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

        writeFile(fileEntry, _tableData, isAppend);

    });

}
