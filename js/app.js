//Global variable
const sColumn = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const sRow = ["1", "2", "3", "4", "5", "6", "7", "8"];
const sFruitName = ["A", "B", "C", "D", "E", "F"];
const sSteps = new Array(72);
    
// Colors
const cBorder = fullColorHex(169, 169, 169);
const cTable = fullColorHex(211, 211, 211);
const cStoneColor = [ 
	fullColorHex(255, 185, 244), 
	fullColorHex(188, 255, 162), 
    fullColorHex(121, 252, 250), 
    fullColorHex(255, 253, 79), 
    fullColorHex(250, 250, 250), 
    fullColorHex(252, 191, 111) 
];

// Lists of objects
let sel = new Array(); // StoneList
let skl = new Array(); // StockList

let sc = Scores;

let pageNum = 1;
let aManuals = new Array();

// Call functions for first game
BuildTable();
StartGame();
	  
// Custom Confrim Dialog with Custom message and callback handler
function ConfirmDialog(title, message, handler){
			
	$('<div class="modal" id="myModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' + title + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>' + message + '</p></div><div class="modal-footer"><button type="button" class="btn btn-primary btn-yes">Yes</button><button type="button" class="btn btn-secondary btn-no" data-dismiss="modal">No</button></div></div></div></div>').appendTo('body');
 
	//Trigger the modal
	$("#myModal").modal({
		backdrop: 'static',
		keyboard: false
	});
		
	//Pass true to a callback function
	$(".btn-yes").click(function () {
		handler(true);
		$("#myModal").modal("hide");
	});
    
	//Pass false to callback function
	$(".btn-no").click(function () {
		handler(false);
		$("#myModal").modal("hide");
	});
  
	//Remove the modal once it is closed.
	$("#myModal").on('hidden.bs.modal', function () {
		$("#myModal").remove();
	});
}

	  
$('#btnNewGame').on('click', function(event) {
	event.preventDefault(); 
		
	ConfirmDialog("New Game", "Do you want to start a new game?", (ans) => {
		if (ans) {
			StartGame();
		}
	});	
});


$('#btnSaveGame').on('click', function(event) {
	event.preventDefault(); 
		
	ConfirmDialog("Save Game", "Do you want to save this game?", (ans) => {
		if (ans) {
			let data = new Array();
			data.push(sel);
			data.push(skl);
			data.push(Object.entries(sc));

			download(JSON.stringify(data), 'game.txt', 'text/plain');
		}														
	});
});
      

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


$('#btnLoadGame').on('change', function(event) {
	event.preventDefault(); 
		
	ConfirmDialog("Load Game", "Do you want to load a game?",  (ans) => {
		
		if (ans) {
			
			let fileIndex = this.files.length;
			let fileToLoad = this.files[fileIndex -1];
			let fileReader = new FileReader();
          
			fileReader.onload = function(fileLoadedEvent){
				let textFromFileLoaded = fileLoadedEvent.target.result;
				restoreGame(textFromFileLoaded);

				//delete files from input after it's loaded
				fileIndex.value = "";
			};

			fileReader.readAsText(fileToLoad, "UTF-8");
		}	
    });
});


$('#btnTop10').on('click', function(event) {
	event.preventDefault();

	$.ajax({
		url: "http://localhost/FruitIshido_PHP/server_files/GetTopTen.php",
		context: document.body
		}).done(function(result) {
			
			let table = '<table class="table"><thead><tr><th scope="col">Nick name</th><th scope="col">Score</th></tr></thead><tbody>';
			
			JSON.parse(result).forEach( function(item) {
			table += '<tr><td>' + item.NickName + '</td><td>' + item.Score + '</td></tr>';
			});
			
			table += '</tbody></table>';
			
			$('#dTop10').append(table);
			
			$('#top10Modal').modal('show');
	});
});


function addManual() {
	
	let cPage = aManuals.find(x => x.PageNumber === pageNum);
			
	// HTML content encoded to base64, so we need decode them "atob"
	$('#dManual').html(decodeURIComponent(escape(atob(cPage.ManualHTML))));

}


// Use global array to get pages from database once when manual clicked
$('#btnManual').on('click', function(event) {
	event.preventDefault();	
	
	pageNum = 1;
	aManuals.length = 0;
	
	$.ajax({
		url: "http://localhost/FruitIshido_PHP/server_files/GetManual.php",
		context: document.body
		}).done(function(result) {
									
			JSON.parse(result).forEach( function(item) {
				
				aManuals.push(item);
			
			});
			
			addManual();
			
			// Hide Prev button
			$('#btnPrevManual').hide();
			
			$('#manualModal').modal('show');
	});
		
	$('#manualModal').modal('show');
});

$('#btnAbout').on('click', function(event) {
	event.preventDefault();
			
	$('#aboutModal').modal('show');
});

$('#btnPrevManual').on('click', function(event) {
	event.preventDefault();
			
	pageNum--;
	
	if (pageNum == 5) {
		$('#btnNextManual').hide();
	}
	else {
		$('#btnNextManual').show();
	}
	
	if (pageNum == 1) {
		$('#btnPrevManual').hide();
	}
	else {
		$('#btnPrevManual').show();
	}
	
	addManual();
	
});

$('#btnNextManual').on('click', function(event) {
	event.preventDefault();
			
	pageNum++;
	
	if (pageNum == 5) {
		$('#btnNextManual').hide();
	}
	else {
		$('#btnNextManual').show();
	}
	
	if (pageNum == 1) {
		$('#btnPrevManual').hide();
	}
	else {
		$('#btnPrevManual').show();
	}
	
	addManual();
});

$('#btnSubmit').on('click', function(event) {
	event.preventDefault();
	
	if($('#txtNickName').val() == "") {
		alert("Nick name required !");
	}
	else {	
		
		$.ajax({
			method: "POST",
			url: "http://localhost/FruitIshido_PHP/server_files/SetTopTen.php",
			dataType: "text",
			async: true,
			data: { NickName: $('#txtNickName').val(),
				Score: $('#hScore').val()},
			success: function(resultData) { 
				alert(resultData);
				$('#top10FormModal').modal('hide');
			},
			error: function (xhr, ajaxOptions, thrownError) {
				//alert("AJAX Error: " + thrownError);
			}
			
			
		});		
	}	
});







