//New Game function
//==============================
function StartGame()
{
    Reset();
    StonesInOrder();
    MixingStones();
    DisplayFirstSixStone();
    //EndOfGame(145); //Debug only
}

function BuildTable()
{
    for (i = 0; i < sRow.length; ++i)
    {
        for (j = 0; j < sColumn.length; ++j)
        {
            let b = document.createElement('button');

            let bwidth = $('#panGame').width() / 12 + 'px';
            let bheight = $('#panGame').height() / 8 + 'px';
			
            //console.log(bwidth);
            //b.style.width = bwidth;
            //b.style.height = bheight;
			
			b.classList.add("stone");
            b.style.left = j * bwidth;
            b.style.top = i * bheight;
            b.setAttribute("ID", sColumn[j] + sRow[i]);
            b.setAttribute("Text", "");
            b.setAttribute("data-fruit", "");
            b.setAttribute('onclick', 'StoneClick(' + sColumn[j] + sRow[i] + ')');

            //console.log(b);
            $('#panGame').append(b);

            if (i == 0 || i == 7 || j == 0 || j == 11)
            {
                b.style.backgroundColor = cBorder;
            }
            else
            {
                b.style.backgroundColor = cTable;
            }
        }
    }
}

function Reset()
{
    //Clear load button 
    $("#btnLoadGame").val("");
    
    //Reset scores
    $("#txtMessageDisplay").val("New game");

    sc.usedStoneNum = 0;
    sc.score = 0;
    sc.fourWayScore = 0;
    sc.endScore = 0;
    sc.finalScore = 0;
    sc.recentScore = 0;
    sc.fourWay = 0;
    sc.fourWayBonus = 0;
    sc.recentFourWay = 0;
        
    // Empty arrays
    sel.length = 0;
    skl.length = 0;

    //Rebuild stone list and remove classes and background colors
    for (i = 0; i < sRow.length; ++i)
    {
        for (j = 0; j < sColumn.length; ++j)
        {
            let b = $('#' + sColumn[j] + sRow[i])[0];
            b.setAttribute("data-fruit", "");
            b.style.backroundImage = "none";
            b.removeAttribute("class");
			b.classList.add("stone");

            if (i == 0 || i == 7 || j == 0 || j == 11)
            {
                b.style.backgroundColor = cBorder;
            }
            else
            {
                b.style.backgroundColor = cTable;
            }

            let stone = new Stone(sColumn[j] + sRow[i], "", fullColorHex(0, 0, 0));
            sel.push(stone);
        }
    }
}

function StonesInOrder()
{
    //skl = new StockList();

    //Stones set to stock on order 
    for (k = 0; k < 2; ++k)
    {
        for (i = 0; i < 6; ++i)
        {
            for (j = 0; j < 6; ++j)
            {
                let s = new Stock(k * 36 + (i) * 6 + j, sFruitName[i], cStoneColor[j]);
                skl.push(s);
            }
        }
    }
}

function MixingStones()
{
    //Stones mixing in store
    for (k = 0; k < 1000; ++k)
    {
        let randi = Math.floor(Math.random() * 72);
        let randj = Math.floor(Math.random() * 72);

        let refName = skl[randi]["name"];
        let refCol = skl[randi]["color"];
       
        skl[randi]["name"] = skl[randj]["name"];
        skl[randi]["color"] = skl[randj]["color"];

        skl[randj]["name"] = refName;
        skl[randj]["color"] = refCol;
    }
        
    /*
    // Debug Only
    skl.forEach(function(x) 
    {
        console.log("Mixed Order: " + x.ToString());
    })*/
}

function DisplayFirstSixStone()
{
    //Display the first six stone, all must be different color and fruit
    let sStarterStones = [...sFruitName];
    let cStarterStones = [...cStoneColor];    

    const sStartingPositions = ["A1", "L1", "A8", "L8", "F4", "G5"];
    let iRef1, iRef2;

    sc.usedStoneNum = -1;

    for (k = 0; k < 72; ++k)
    {
        if (sc.usedStoneNum < 6)
        {
            iRef1 = sStarterStones.map(function (x) {return x;}).indexOf(skl[k]["name"]);
            iRef2 = cStarterStones.map(function (y) {return y;}).indexOf(skl[k]["color"]);

            //console.log(skl[k]["name"] +", " + iRef1 + "," + iRef2);

            if (iRef1 > -1 && iRef2 > -1)
            {
                sc.usedStoneNum = sc.usedStoneNum + 1;
                let ThisStone = $('#' + sStartingPositions[sc.usedStoneNum])[0];
                
                sRef = skl[k]["name"];

                ThisStone = SetBackgroundImage(ThisStone, sRef);

                ThisStone.setAttribute("data-fruit", skl[k]["name"]);
                ThisStone.style.color =  skl[k]["color"];
                ThisStone.style.backgroundColor = skl[k]["color"];
                   
                let s = sel.find( ({ name }) => name === sStartingPositions[sc.usedStoneNum]);
                s.text = skl[k]["name"];
                s.stoneColor = skl[k]["color"];                                    

                sSteps[sc.usedStoneNum] = sStartingPositions[sc.usedStoneNum];
                sStarterStones[iRef1] = "";
                cStarterStones[iRef2] = cTable;   //point is that this is not among the properties

                if (k != sc.usedStoneNum)
                {
                    //Change stones in stock as in use order
                    let refName = skl[k]["name"];
                    let refCol = skl[k]["color"];

                    skl[k]["name"] = skl[sc.usedStoneNum]["name"];
                    skl[k]["color"] = skl[sc.usedStoneNum]["color"];

                    skl[sc.usedStoneNum]["name"] = refName;
                    skl[sc.usedStoneNum]["color"] = refCol;
                }
            }
        }
    }

    NextStep();
}

//Next Step function
//============================
function NextStep()
{
    let sRef;
    let bEndOfGame = false;

    if (sc.usedStoneNum < 71)
    {
        //btnNextStone.Text = skl.Stocks.ElementAt(sc.UsedStoneNum + 1).Name;
        let bNextStone = $("#btnNextStone")[0];

        bNextStone.setAttribute("data-fruit", skl[sc.usedStoneNum + 1]["name"]);
        bNextStone.style.color = skl[sc.usedStoneNum + 1]["color"];
        bNextStone.style.backgroundColor = skl[sc.usedStoneNum + 1]["color"];
        sRef = skl[sc.usedStoneNum + 1]["name"];

        bNextStone = SetBackgroundImage(btnNextStone, sRef);            

        if (!Usable()) bEndOfGame = true;
    }
    else { bEndOfGame = true; }

    if (bEndOfGame)
    {
        txtMessageDisplay.Text = "End";

        if (sc.usedStoneNum == 69) sc.EndScore = 100;
        if (sc.usedStoneNum == 70) sc.EndScore = 500;
        if (sc.usedStoneNum == 71) sc.EndScore = 1000;
    }

    //Score contest, the test must be carried before him, because here we have to end point
    $("#txtUsedStoneDisplay").val(sc.usedStoneNum + 1);
    $("#txtLeftStoneDisplay").val(72 - sc.usedStoneNum - 1);

    sc.finalScore = sc.score + sc.fourWayScore + sc.endScore;

    $("#txtScoreDisplay").val(sc.finalScore);
    $("txtFourWayDisplay").val(sc.fourWay);

    if (bEndOfGame)
    {
        EndOfGame(sc.finalScore);
    }
}

// Usable function
function Usable()
{
    if (sc.usedStoneNum >= 5)
    {
        for (ii = 0; ii < sColumn.length; ++ii)
        {
            for (jj = 0; jj < sRow.length; ++jj)
            {
                ThisStone = $('#' + sColumn[ii] + sRow[jj])[0];

                if (ThisStone.getAttribute("data-fruit") == "" && Landing(ThisStone))
                {
                    return true;
                }
            }
        }

        return false;
    }
    else { return true; }
}

//End of game
function EndOfGame(piFinalScore)
{

    $("#txtMessageDisplay").val("Your final score " + piFinalScore);

    //alert('No more step', 'Game End');
    
    //check higher scores
    let iScore = new Array();
	
	$.ajax({
		url: "http://localhost/frankofamily.info/FruitIshido/GetTopTen.php",
		context: document.body
		}).done(function(result) {
			
			let table = '<table class="table"><thead><tr><th scope="col">Nick name</th><th scope="col">Score</th></tr></thead><tbody>';
			
			JSON.parse(result).forEach( function(item) {
				iScore.push(item.Score);
			});
			
			CheckTop10(iScore, piFinalScore);
	});
}

function CheckTop10(iScore, piFinalScore) {

    // Check the scores
    let iRef = 0;

    for (i = 0; i < 10; i++)
    {
        if (piFinalScore > iScore[i])
        {
            $("#txtMessageDisplay").val("Your final score " + piFinalScore + " in Top 10");
            iRef++;
        }
    }

    if (iRef > 0)
    {
			
		$.ajax({
			url: "http://localhost/frankofamily.info/FruitIshido/GetTopTen.php",
			context: document.body
			}).done(function(result) {
			
				let table = '<table class="table"><thead><tr><th scope="col">Nick name</th><th scope="col">Score</th></tr></thead><tbody>';
			
				JSON.parse(result).forEach( function(item) {
					table += '<tr style="line-height: 15px; min-height: 15px; height: 15px;"><td>' + item.NickName + '</td><td>' + item.Score + '</td></tr>';
				});
			
				table += '</tbody></table>';			
			
				$('#dTop10Form').append(table);
				
				$('#dTop10Message').html("<h5>Congratulation your score " + piFinalScore + " in TOP 10</h5>");
				
				$('#hScore').val(piFinalScore);
			
				$('#top10FormModal').modal('show');
		});
    }
}


function SetBackgroundImage(ThisStone, sRef)
{
    
    switch (sRef)
    {
        case 'A':
            ThisStone.removeAttribute("class");
            ThisStone.classList.add("apple");
			ThisStone.classList.add("stone");
            break;
        case 'B':
            ThisStone.removeAttribute("class");
            ThisStone.classList.add("apricot");
			ThisStone.classList.add("stone");
            break;
        case 'C':
            ThisStone.removeAttribute("class");
            ThisStone.classList.add("kiwi");
			ThisStone.classList.add("stone");
            break;
        case 'D':
            ThisStone.removeAttribute("class");
            ThisStone.classList.add("cherry");
			ThisStone.classList.add("stone");
            break;
        case 'E':
            ThisStone.removeAttribute("class");
            ThisStone.classList.add("pear");
			ThisStone.classList.add("stone");
            break;
        case 'F':
            ThisStone.removeAttribute("class");
            ThisStone.classList.add("strawberry");
			ThisStone.classList.add("stone");
            break;
    }

    return ThisStone;
}

function StoneClick(id) {    

    let ThisStone = $('#' + id.id)[0];
    let sRef;


    if (ThisStone.getAttribute("data-fruit") == "" && sc.usedStoneNum < 71)
    {

        if (Landing(ThisStone))
        {
            // What is clicked and how many points
            $("#txtMessageDisplay").val("Position: " + ThisStone.getAttribute("id") 
                + " / Points: " + sc.recentScore);

            sc.usedStoneNum = sc.usedStoneNum + 1;

            ThisStone.setAttribute("data-fruit", skl[sc.usedStoneNum]["name"]);
            ThisStone.style.color = skl[sc.usedStoneNum]["color"];

            let s = sel.find( ({ name }) => name === ThisStone.getAttribute("id"));

            s.text = ThisStone.getAttribute("data-fruit");
            s.stoneColor = skl[sc.usedStoneNum]["color"];

            // Fruit display statement
            sRef = skl[sc.usedStoneNum]["name"];

            ThisStone = SetBackgroundImage(ThisStone, sRef);

            // Background color setting
            ThisStone.style.backgroundColor = skl[sc.usedStoneNum]["color"];

            sSteps[sc.usedStoneNum] = ThisStone.ID;

            sc.fourWay = sc.fourWay + sc.recentFourWay; // FourWay bonus calculation
            sc.fourWayBonus = 0;

            if (sc.recentFourWay == 1)
            {

                ThisStone.style.backgroundColor = fullColorHex(0,0,139);
                ThisStone.style.color = fullColorHex(0,0,139);
                BonusScores();  // Bonus scores calculation
            }

            sc.score = sc.score + sc.recentScore;
            sc.fourWayScore = sc.fourWayScore + sc.fourWayBonus;
            
            NextStep();
        }
        else
        {
            $("#txtMessageDisplay").val("Invalid stone!");
        }
    }  
}



//Landing function
function Landing(NeighborStone)
{
    let iNeighborStoneNum = 0;     // Number of adjacent stones 
    let iMatchedFruitNum = 0;     // Number of properties matching fruit 
    let iMatchedColorNum = 0;     // Number of properties matching color 
    let iNeighborFruit = 0;
    let iNeighborColor = 0;

    sc.recentScore = -1;  //If that stay on this value not be held down 
    sc.recentFourWay = 0;

    let sNeighborName = new Array(4);
    let NeighborField;

    let FieldName = NeighborStone.id;

    // Order: left, right, top, bottom 
    sNeighborName[0] = Neighbor(FieldName, -1, 0);
    sNeighborName[1] = Neighbor(FieldName, 1, 0);
    sNeighborName[2] = Neighbor(FieldName, 0, -1);
    sNeighborName[3] = Neighbor(FieldName, 0, 1);

    for (i = 0; i < 4; ++i)
    {
        iNeighborFruit = 0;
        iNeighborColor = 0;

        // This is a cube, and if so is there a stone frame, and if their properties match
        if (sNeighborName[i] != "x")
        {
            NeighborField = $('#' + sNeighborName[i])[0];

            

            if (NeighborField.getAttribute("data-fruit") != "")
            {
                iNeighborStoneNum = iNeighborStoneNum + 1;  //Add one to adjacent stones

                if (NeighborField.getAttribute("data-fruit") == btnNextStone.getAttribute("data-fruit"))
                {
                    //console.log("same fruit");
                    iMatchedFruitNum = iMatchedFruitNum + 1;
                    iNeighborFruit = 1;
                }

                if (NeighborField.style.color == btnNextStone.style.color)
                {
                    //console.log("same color");
                    iMatchedColorNum = iMatchedColorNum + 1;
                    iNeighborColor = 1;
                }

                if (iNeighborFruit + iNeighborColor == 0)
                {
                    return false;  // With this neighbor is not same property
                }
            }
        }
    }

    if (iNeighborStoneNum == 1) sc.recentScore = 1;

    if ((iNeighborStoneNum == 2 || iNeighborStoneNum == 3) && iMatchedFruitNum * iMatchedColorNum > 0) sc.recentScore = 1;

    if (iNeighborStoneNum == 4 && iMatchedFruitNum >= 2 && iMatchedColorNum >= 2)
    {
        sc.recentScore = 1;
        sc.recentFourWay = 1;
    }

    if (sc.recentScore == 1) 
    {
        sc.recentScore = Math.pow(2, (iNeighborStoneNum - 1)) * Math.pow(2, sc.fourWay); 
    }

    // On the border has not score
    if (sc.RecentScore > 0 && (sNeighborName[0] == "x" || sNeighborName[1] == "x" || sNeighborName[2] == "x" || sNeighborName[3] == "x"))
    {
        sc.recentScore = 0;
    }

    if (sc.recentScore > -1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function Neighbor(FieldName, v, f)
{
    if (FieldName == "")
    {
        return "";
    }
    else 
    {
        let vv = sColumn.indexOf(FieldName.substring(0, 1));
        vv += v;

        let ff = sRow.indexOf(FieldName.substring(1, 2)); 
        ff += f;
    
        if (vv > -1 && ff > -1 && vv < 12 && ff < 8) 
        {
            return sColumn[vv] + sRow[ff];
        }
        else
        {
            return "x";
        }
    }    
}

// Bonus scores
function BonusScores()
{
    if (sc.fourWay == 1) sc.fourWayBonus = 25;
    if (sc.fourWay == 2) sc.fourWayBonus = 50;
    if (sc.fourWay == 3) sc.fourWayBonus = 100;
    if (sc.fourWay == 4) sc.fourWayBonus = 200;
    if (sc.fourWay == 5) sc.fourWayBonus = 400;
    if (sc.fourWay == 6) sc.fourWayBonus = 600;
    if (sc.fourWay == 7) sc.fourWayBonus = 800;
    if (sc.fourWay == 8) sc.fourWayBonus = 1000;
    if (sc.fourWay == 9) sc.fourWayBonus = 5000;
    if (sc.fourWay == 10) sc.fourWayBonus = 10000;
    if (sc.fourWay == 11) sc.fourWayBonus = 25000;
    if (sc.fourWay == 12) sc.fourWayBonus = 50000;
}


function restoreGame(textFromFileLoaded)
{
    Reset();

    let obj = JSON.parse(textFromFileLoaded);
    
    // Restore table
    obj[0].forEach(function(item) 
    {
            
        ThisStone = $('#' + item.name)[0];

        if (item.text != "")
        { 
            ThisStone.setAttribute("data-fruit", item.text);
            ThisStone.style.color =  item.stoneColor;
            ThisStone.style.backgroundColor = item.stoneColor;

            ThisStone = SetBackgroundImage(ThisStone, item.text);
                
        }
        else
        {
            ThisStone.setAttribute("data-fruit", "");
            ThisStone.style.backroundImage = "none";
            ThisStone.removeAttribute("class");
			ThisStone.classList.add("stone");
        }           
    })


    //Restore stock list
    obj[1].forEach(function(item) 
    {
        skl.push(item);
    })

    //console.log(JSON.stringify(skl));
    
    // Restore and display scores

    sc.usedStoneNum = obj[2][0][1];
    sc.score = obj[2][1][1];
    sc.fourWayScore = obj[2][2][1];
    sc.endScore = obj[2][3][1];
    sc.finalScore = obj[2][4][1];
    sc.recentScore = obj[2][5][1];
    sc.fourWay = obj[2][6][1];
    sc.fourWayBonus = obj[2][7][1];
    sc.recentFourWay = obj[2][8][1];

    //console.log(Object.entries(sc));

    $("#txtMessageDisplay").val("Game loaded");
    $("#txtScoreDisplay").val(sc.score);
    $("#txtUsedStoneDisplay").val(sc.usedStoneNum + 1);
    $("#txtLeftStoneDisplay").val(72 - sc.usedStoneNum - 1);
    $("#txtScoreDisplay").val(sc.finalScore);
    $("#txtFourWayDisplay").val(sc.fourWay);

    NextStep();
    
}