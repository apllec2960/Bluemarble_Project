//------------------플레이어 선택 --------------------
		
		// 2인 플레이 
		$("#2people").click( function() {		
			person = maxState = 2;
			console.log("2인 스타트!");
			alert("2인 스타트!");
			gameStart(person);
		});
		
		// 3인 플레이
		$("#3people").click( function() {
			person = maxState = 3;
			console.log("3인 스타트!");
			alert("3인 스타트!");
			gameStart(person);
		});
		
		// 4인 플레이
		$("#4people").click( function() {
			person = maxState = 4;
			console.log("4인 스타트!");
			alert("4인 스타트!");
			gameStart(person);
		});
		//-------------- 도시 및 건물 구매 ---------------------
		// 도시
		$("#country").click(function(){
			tower = 0;
			console.log("도시 선택!");
			buyCountry(tower)
			$("#buuild").hide();
		})
		
		// 별장
		$("#villa").click(function(){
			tower = 1;
			console.log("별장 선택!");
			buyCountry(tower)
			$("#buuild").hide();
		})
		
		// 빌딩
		$("#building").click(function(){
			tower = 2;
			console.log("빌딩 선택!");
			buyCountry(tower)
			$("#buuild").hide();
		})
		
		// 호텔
		$("#hotel").click(function(){
			tower = 3;
			console.log("호텔 선택!");
			buyCountry(tower)
			$("#buuild").hide();
		})
		
		//--------------플레이어 전광판 ---------------------
		$("#1pMoney").val(Pprice[0]);
		//console.log(Pprice[0]);
		$("#2pMoney").val(Pprice[1]);
		$("#3pMoney").val(Pprice[2]);
		$("#4pMoney").val(Pprice[3]);
		
		$("#1pt").val(Pturn[0]);
		$("#2pt").val(Pturn[1]);
		$("#3pt").val(Pturn[2]);
		$("#4pt").val(Pturn[3]);
		
		$("#Cturn").val(turn);

//게임 시작 
function gameStart(person) {
	//console.log("person"+person) 
	$("#gameAlert").addClass("no_hover");
	//console.log(this)	
	$("#p1").empty();
	for (let i = 0; i < person; i++) {
	//console.log("person[i]"+i);F
		$("#p1").append(player[i]);
	}	
}

//각각의 도시에 도착했을때 구매 및 경유비를 지출하는 함수.
function alertCountry(state){
	console.log("플레이어state"+state);
	//도시      lands[0].length : 40
	for(let i=0; i<lands[0].length; i++){
		if(i == afterPoint[state]){
			console.log("i == afterPoint[state]"+i);
			console.log("beforePoint"+beforePoint);
			console.log("afterPoint"+afterPoint);
			console.log("땅 :"+lands[0][i-1]) //<-- 2인이상 게임시 i가 1이 나오는 문제.
			//alert(lands[0][i-1]+"땅 구매?"); <--이동하기전에 먼저 알림되는 문제
			//1.알림창으로 어디에 도착했는지 알림.
			
			if(lands[6][i-1]==0){
				console.log("구매가능"); // 소유자가 없을때 
				$("#buuild").show()
				
			}else if(lands[6][i-1]==1){
				console.log("소유자 있음"); // 소유자가 있을때 (안에서 한번더 조건걸기(내가 산건지 아닌지))
				$("#buuild").hide();
				//1.소유자 확인(몇번째 플레이어 인지)//2.비용 지출()
				
				for(let n=0; n<4; n++){
					if(dCity[n][i-1] ==1){
						Pprice[state]= Pprice[state] - tollFee[n][i-1];
						Pprice[n] = Pprice[n] + tollFee[n][i-1];
						console.log("통행료지불"+Pprice[state]);
						console.log("통행료 받음"+Pprice[n]);
					}
				}
			}else{
				console.log("구매할수 없는 지역입니다.")
				$("#buuild").hide();

				//1.비용을 내야하는곳인지
				//2.그냥 통과가 가능한 곳인지
				//3.다른 기능이 있는지.
			}
		}
		
	}
	
}

// 플레이어는 건물 선택 및 구매.
function buyCountry(tower){
	alertCountry(state);
	console.log("buyCounter() 실행");
	/*
	 * console.log("건물"+tower); console.log((1+state)+"번마");
	 * console.log("위치값"+afterPoint[state])
	 */
	i = afterPoint[state] -1;
	// console.log("i는"+i);

	/********************************
	*추가 해야할 기능*
	*처음엔 땅만 살수 있다.
	*그 후엔 건물 하나씩만 구매 가능(별장만 2개 가능)
	*다른 유저가 도착하면 구매 불가.
	*******************************/
	
	// 땅 구매 비용지불
	if(tower ==0){
		//땅
		console.log("건물번호"+tower)
		//내 자본이 건물구매비용 보다 많다면.
		if(Pprice[state] >= lands[1][i]){
			console.log("내 자본"+Pprice[state]);
			console.log("건물가격"+lands[1][i])
			
			//건물비용 지불
			Pprice[state] = Pprice[state] - lands[1][i];
			//통행료 저장
			tollFee[state] = tollFee[state]+ lands[1][i]
			//구매한 도시지명 저장.
			dCity[state][i] = dCity[state][i] + 1;
			//도시 구매 유무
			lands[6][i]+=1;
			
			console.log("[1:내도시]"+dCity[state][i]);
			console.log("[1:구매됨]"+lands[6][i]);
			
				let afterId = "#p" + afterPoint[state];
					$(afterId).append(Bbuild[tower]);
						console.log("위치"+afterId);
						console.log("땅 구매완료")
						console.log("구매후 잔액"+Pprice[state]);
						//--------------플레이어 자금초기화  ---------------------
						$("#1pMoney").val(Pprice[0]);
						$("#2pMoney").val(Pprice[1]);
						$("#3pMoney").val(Pprice[2]);
						$("#4pMoney").val(Pprice[3]);
						
			}else{
				alert("돈이 부족합니다.")
				console.log("돈이 부족합니다");
				return
		}
		
	}else if(tower ==1){
		//별장
		if( (Pprice[state] >= lands[2][i])&&(Pturn[state]>=1)){
			console.log("내 자본"+Pprice[state]);
			console.log("건물가격"+lands[2][i])
			
			//건물비용 지불
			Pprice[state] = Pprice[state] - lands[2][i];
			//통행료 저장
			tollFee[state] = tollFee[state]+ lands[2][i]
				let afterId = "#p" + afterPoint[state];
					$(afterId).append(Bbuild[tower]);
						console.log("땅 구매완료")
						console.log("구매후 잔액"+Pprice[state]);
						//--------------플레이어 자금초기화 ---------------------
						$("#1pMoney").val(Pprice[0]);
						$("#2pMoney").val(Pprice[1]);
						$("#3pMoney").val(Pprice[2]);
						$("#4pMoney").val(Pprice[3]);
						
			}else if((Pprice[state] >= lands[2][i])&&(Pturn[state]<1)){
				alert("아직 1턴미만 입니다.")
				console.log("1턴미만");
				
			}else{
				alert("돈이 부족합니다");
				console.log("돈부족");
			}
	}else if(tower ==2){
		//빌딩
		if( (Pprice[state] >= lands[4][i])&&(Pturn[state]>=2)){
			console.log("내 자본"+Pprice[state]);
			console.log("건물가격"+lands[4][i])
			
			//건물비용 지불
			Pprice[state] = Pprice[state] - lands[4][i];
			//통행료 저장
			tollFee[state] = tollFee[state]+ lands[4][i]
				let afterId = "#p" + afterPoint[state];
					$(afterId).append(Bbuild[tower]);
						console.log("땅 구매완료")
						console.log("구매후 잔액"+Pprice[state]);
						//--------------플레이어 자금초기화  ---------------------
						$("#1pMoney").val(Pprice[0]);
						$("#2pMoney").val(Pprice[1]);
						$("#3pMoney").val(Pprice[2]);
						$("#4pMoney").val(Pprice[3]);
						
			}else if((Pprice[state] >= lands[4][i])&&(Pturn[state]<2)){
				alert("아직 2턴미만 입니다.")
				console.log("2턴미만");
				return
				
			}else{
				alert("돈이 부족합니다");
				console.log("돈부족");
			}
	}else{
		//호텔
		if( (Pprice[state] >= lands[5][i])&&(Pturn[state]>=3) ){
			console.log("내 자본"+Pprice[state]);
			console.log("건물가격"+lands[5][i])
			
			//건물비용 지불
			Pprice[state] = Pprice[state] - lands[5][i];
			//통행료 저장
			tollFee[state] = tollFee[state]+ lands[5][i]
			
				let afterId = "#p" + afterPoint[state];
					$(afterId).append(Bbuild[tower]);
						console.log("땅 구매완료")
						console.log("구매후 잔액"+Pprice[state]);
						//--------------플레이어 자금초기화 ---------------------
						$("#1pMoney").val(Pprice[0]);
						$("#2pMoney").val(Pprice[1]);
						$("#3pMoney").val(Pprice[2]);
						$("#4pMoney").val(Pprice[3]);
						
			}else if((Pprice[state] >= lands[5][i])&&(Pturn[state]<3)){
				alert("아직 3턴미만 입니다.")
				console.log("3턴미만");
				return
				
			}else{
				alert("돈이 부족합니다");
				console.log("돈부족");
			}
	}
	// 건물 세우기
	// 끝
	console.log("--------------end-------------")
}

//말이 이동.
function move(state, Sran) {
	//위치 배열에 위치 지정.
	if (beforePoint[state] + Sran < 41) {
		afterPoint[state] = beforePoint[state] + Sran;
		console.log("이동지점"+afterPoint[state]);
		
		
	} else {
		//beforePoint[state] + Sran 값이 40보다 크다면
		afterPoint[state] = beforePoint[state] + Sran - 40;
		console.log("이동지점"+afterPoint[state]);
		
		//각 말들의 턴 회수를 구함.
			Pturn[state]++;
			console.log("플레이어별 턴 수 ["+Pturn[state]+"]");
		
		//플레이어 월급
			console.log("입금전 잔액"+Pprice[state]);
			Pprice[state] +=lands[1][0] ;
			console.log("월급이 지급되었습니다 입금후 잔액"+Pprice[state]);
			
	}
	
	//이동위치.
	$("#point").val(afterPoint[state]);

	// 말을 이동시킵니다.
	let afterId = "#p" + afterPoint[state];
	$(afterId).append(player[state]);
	
	// 말을 지움.
	let beforeId = "#p" + beforePoint[state];
	$(beforeId).children("b").remove("#"+(state+1)+"p");
	
	beforePoint[state] = afterPoint[state];
}