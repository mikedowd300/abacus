var beadHeight = parseInt($('.bead').css('height'));
var slideTime = .5;
var myVal = 0;
var actualVal;	
var counting = true;
var addition = false;
var addSubtract = false;
var multiply = false;
var divide = false;
var multiple = 1.3; // This is how fast the problems increase in size
var initial = 6; // the initial add problem max-size

function counter() {
	initBoard();
	counting = true;
	setBools('x');
	myVal = 0;	
	$('#nextProblem').fadeOut(1000);	
	$("#UserAnsLabel").fadeOut(1000);
	$("#ansLabel").fadeOut(1000);
	$("#actualValue").fadeOut(1000);
	$('#message').fadeOut(1000);
	$('.add-these').fadeOut(1000);
	$('.results').fadeOut(1000);
	$('.my-buttons').fadeOut(1000);
	$('.abacus').css('margin-top', '30px');
	$('#display').css('width','40%').css('height', '35px').css('background-color','rgba(22,255,111,.2)').fadeOut(1000);
}

function setBools(op) {
	addition = false;
	addSubtract = false;
	multiply = false;
	divide = false;
	counting = false;

	if(op === 'a') {
		addition = true;
	} else if(op === 's') {
		addSubtract= true;
	} else if (op === 'm') {
		multiply = true;
	} else if (op === 'd') {
		divide = true;
	} else if (op === 'c') {
		counting = true;
	}
}

function doMath(operation) {
	setBools(operation);	
	initBoard();	
	myVal = 0;	
	$('#submitButton').css('margin','65px 30px 0 0' ).fadeIn(2000);
	$('#nextProblem').css('margin','10px 20px 0 0');
	$('.abacus').css('margin-top','5px')
	$('#display').css('height','120px').css('width','70%').css('background-color','rgba(22, 200, 100, .3)');
	$('#display').css('color','white').css('margin-top','10px').css('line-height','22px').fadeIn(2000);
	$('#usersValue').fadeOut(2000);	
	$('.add-these').fadeIn(1000);
	$('.results').fadeIn(1000);
	$('.my-buttons').fadeIn(1000);
	getNumbers2(operation);
}

function slideBead($x,zeros,beadVal) {
	var topPos = 0;
	var botPos = -(beadHeight);
	if(!($x.hasClass('up')) && ($x.hasClass('four') || $x.hasClass('three') || $x.hasClass('two'))) {
		if(!($x.prev().hasClass('up'))) {
			slideBead($x.prev(), zeros, 1);			
		}
	}
	if($x.hasClass('up')) {
		if($x.next().hasClass('up')) {
			slideBead($x.next(), zeros, 1);
		}
		$x.css('top', topPos);
		$x.removeClass('up');
		myVal -= beadVal * Math.pow(10,zeros);
	} else {
		$x.css('top', botPos);
		$x.addClass('up');
		myVal += beadVal * Math.pow(10,zeros);
	}
	if(counting) {
		$('#display').css('margin-top', '30px').fadeIn(500);
		$('.results').css('padding', '5px 0 0 20px').fadeIn(500);
		$('#usersValue').text(myVal).fadeIn(1000);
		console.log('counting is true', myVal);
	}
}

function getNumbers() {
	$('#submitButton').delay(1000).fadeIn(1000);
	$('#nextProblem').fadeOut(1500);
	var myOp = getOpBool();
	getNumbers2(myOp);	
	$("#UserAnsLabel").fadeOut(1000);
	$("#usersValue").fadeOut(1000);
	$("#ansLabel").fadeOut(1000);
	$("#actualValue").fadeOut(1000);
	$('#message').fadeOut(1000);
	initBoard();
	myVal = 0;
}

function getOpBool() {
	if(addition){
		var op = 'a';
	}else if(addSubtract) {
		var op = 's';
	}
	else if(multiply) {
		var op = 'm';
	}
	else if(divide) {
		var op = 'd';
	}

	return op;
}

function getNumbers2(op) {
	var margTop = $('#num1').css('margin-top'); 
	var margBot = $('#num1').css('margin-bottom');
	var margLeft = $('#num2').css('margin-left')

	$('#num2').css('margin-top', margTop).css('margin-bottom', margBot);
	$('#num1').css('margin-left', margLeft);
	if(op === 'a') {
		var a = Math.ceil(Math.random() * initial);
		var b = Math.ceil(Math.random() * initial);
		var c = Math.ceil(Math.random() * initial);
		var d = Math.ceil(Math.random() * initial);
		var e = Math.ceil(Math.random() * initial);
		actualVal = a + b + c + d + e;
		$('#num1').text(a).fadeIn(1000);	
		$('#num2').text(b).fadeIn(1000);
		$('#num3').text(c).fadeIn(1000);
		$('#num4').text(d).fadeIn(1000);
		$('#num5').text(e).fadeIn(1000);
	} else if(op === 's') {		
		// refactor this with an array and a loop		
		var a = Math.ceil(Math.random() * initial);
		var sum = a;
		var b = Math.ceil(Math.random() * initial);
		if(b < a+1) {
			b = 0 - b;
		}		
		sum += b;
		var c = Math.ceil(Math.random() * initial);
		if(c < sum) {
			var rand = Math.ceil(Math.random() * 2);
			if(rand === 1) {
				c = 0 - c; 
			}
		}
		sum += c;
		var d = Math.ceil(Math.random() * initial);
		if(d < sum) {
			var rand = Math.ceil(Math.random() * 2);
			if(rand === 1) {
				d = 0 - d; 
			}
		}
		sum += d;

		var e = Math.ceil(Math.random() * initial);
		if(e < sum) {
			var rand = Math.ceil(Math.random() * 2);
			if(rand === 1) {
				e = 0 - e; 
			}
		}
		sum += e;
		actualVal = a + b + c + d + e;
		$('#num1').text(a).fadeIn(1000);	
		$('#num2').text(b).fadeIn(1000);
		$('#num3').text(c).fadeIn(1000);
		$('#num4').text(d).fadeIn(1000);
		$('#num5').text(e).fadeIn(1000);

	} else if(op === 'm') {
		var a = Math.ceil(Math.random() * initial);
		var b = Math.ceil(Math.random() * initial);		
		var temp = b;
		a = Math.max(a, b);
		b = Math.min(a, temp);
		actualVal = a * b;		
		$('#num1').css('margin-left', '17px').text(a).fadeIn(1000);	
		$('#num2').text('x ' + b).fadeIn(1000);
		$('#num3').text('_________').fadeIn(1000);
		$('#num4').text('').fadeIn(1000);
		$('#num5').text('').fadeIn(1000);
	} else if(op === 'd') {
		var a = Math.ceil(Math.random() * initial);
		var b = Math.ceil(Math.random() * initial);		
		var c = a * b;
		actualVal = b;		
		$('#num1').text(c).fadeIn(1000);	
		$('#num2').css('margin-top', '-14px').css('margin-bottom', '3px').text('_________').fadeIn(1000);
		$('#num3').text(a).fadeIn(1000);
		$('#num4').text('').fadeIn(1000);
		$('#num5').text('').fadeIn(1000);
	}
}

function doSubmit() {
	$('#nextProblem').delay(1000).fadeIn(1000);
	$('#submitButton').fadeOut(1500);
	$("#UserAnsLabel").fadeIn(400);
	$("#usersValue").text(myVal).fadeIn(800);
	$("#ansLabel").fadeIn(1200);
	$("#actualValue").text(actualVal).fadeIn(2000);
	if(myVal === actualVal) {
		$('#message').text('NICE!!!').fadeIn(2200);
		initial = Math.min(10000000000, initial * multiple);
		console.log(initial);
	} else {		
		$('#message').text('SORRY!').fadeIn(2200);
	}
}

function initBoard() {
	$('.bead').removeClass('up').css('top', '0px');
}