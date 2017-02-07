	$(document).ready(function(){
		$('.TableHeadFilter').each(function(){
			$(this).append("<i class='fa ml5 fa-angle-down filterIcon'></i>"); 
			$('.filterIcon').each(function(){
				$(this).attr("onclick","TableFilt(this)");
			});
		});
	});
	
	function TableFilt(y){
		$(y).attr("data-sort-ignore", "true");
		if (($(".FilterBox").length) >= 1){
			if ($(".FilterBox").is(":visible")){
				if (($(y).parent().find(".FilterBox").length) >= 1){
					$(".FilterBox").each(function(){
						$(".FilterBox").remove();
					});
					$(y).parent().find(".FilterBox").show();
				}
				else{
					$(".FilterBox").each(function(){
						$(".FilterBox").remove();
					});
				}
			}
			else{
				$(y).parent().find(".FilterBox").show();
			}
		}
		else{
			$(y)
				.after($("<div class='FilterBox admin-form'></div>").html("<div class='mb5' style='height: 40px; background: #1fa7d4;'><h5 style='margin-top: 0px; color: white;'>Filter</h5></div><div class='section'><div class='option-group field'><label class='option'><input type='radio' value='Asec' class='FiltCheck' name='FiltCheckBox'><span class='radio'></span>A to Z</label><label class='option'><input type='radio' value='Desc' class='FiltCheck' name='FiltCheckBox'><span class='radio'></span>Z to A</label></div></div>"));
			var ColumnNo = $(y).parent().attr("column-no");
			$(y).parent().find(".FilterBox")
				.append("<div class='mb5' style='height: 40px; background: #1fa7d4;'><h5 style='margin-top: 0px; color: white;'>Values To Show</h5></div><div style='border-bottom: 1px solid #000;' class='text-center'><input style='width: 50%;height: 20px;'id='ValueFilter' type='text' class='mb5'></div><div id='ValueToShow' class='clt' style='max-height: 80px; overflow-y: scroll;'><ul><li><label class='option'><input type='checkbox' checked value='SelectAll' class='ValueSelectAll' name='SelectAllCheckBox'><span class='checkbox'></span>Select All</label></li></ul></div>");
			$(y).parent().find(".FilterBox")
				.append("<div><button onclick='SubmitFilt(this, " + ColumnNo + ")'>Submit</button></div>");
			SearchValues(y, ($(y).parent().find(".FilterBox")));
			$(".FilterBox").show();
		}
		$('.ValueSelectAll').click(function(){
			if ($(this).is("checked")){
				return false;
			} 
			else{
				$('.ValueCheck').each(function(){
					$(this).prop('checked', true);
				});
			}
		});
		
		$('.ValueCheck').click(function(){
			if ($('.ValueCheck:checked').length == $('.ValueCheck').length){
				$('.ValueSelectAll').prop('checked', true);
			}
			else{
				$('.ValueSelectAll').prop('checked', false);
			}
		});
	  }
	  
	  function SearchValues(y, filter){
		var column = $(y).parent().attr("column-no");
		var Checker = $(y).parent().parent().find(".FiltCheck:checked").val(),
		TableArray = [];
		$(y).closest("table").find("tbody").find("tr").each(function(){
			var Object = $(this);
			var ColumnByName = $(Object).find("td:nth-child(" + column + ")").text();
			var found = false;
			for(var i = 0; i < TableArray.length; i++) {
				if (TableArray[i].name == ColumnByName) {
					found = true;
					
				}
			}
			if (found == true) {
				return true;
			} 
			else {
				TableArray.push({
					name: ColumnByName,
					body: Object
				});
			}
			
		});
		
		TableArray.sort(function (a, b) {
			if (a.name == b.name) { return 0; }
			if (a.name > b.name) { return 1; }
			else { return -1; }
		});
		for( i = 0; i < TableArray.length; i++) {
			var AutoTable = $(filter).find("#ValueToShow");
			
			$(AutoTable).children().append("<li><label class='option'><input type='checkbox' checked value=" + TableArray[i].name + " class='ValueCheck' name=" + TableArray[i].name + "CheckBox'><span class='checkbox'></span>" + TableArray[i].name + "</label></li>");
		}
		$("#ValueFilter" ).keyup(function() {
		  var Value = $(this).val();
		  SearchFilter(Value, TableArray, y);
		});
	  }
	  
	  function SearchFilter(x, TableArray, y){
		var NewArray = [];
		for( i = 0; i < TableArray.length; i++) {
			var ArrayStr = (TableArray[i].name).replace("'", "").toLowerCase();
			var ArrayStr =  ArrayStr.replace(",", "");
			if (ArrayStr.indexOf(x.replace(" ", "").toLowerCase()) > -1)
			{
				NewArray.push({
					name: TableArray[i].name,
					body: TableArray[i].body
				});
			};
		}
		$(y).parent().parent().find("#ValueToShow").children().html("");
		$(y).parent().parent().find("#ValueToShow").children().append("<li><label class='option'><input type='checkbox' checked value='SelectAll' class='ValueCheck' name='SelectAllCheckBox'><span class='checkbox'></span>Select All</label></li>")
		for( i = 0; i < NewArray.length; i++) {
			
			$(y).parent().parent().find("#ValueToShow").children().append("<li><label class='option'><input type='checkbox' checked value=" + NewArray[i].name + " class='ValueCheck' name=" + NewArray[i].name + "CheckBox'><span class='checkbox'></span>" + NewArray[i].name + "</label></li>");
		}
	  }
	  
	  function FilterValues(y){
		var ArrayCh = [];
		$(y).parent().parent().find(".ValueCheck:checked").each(function(){
			var Checker = $(this).val();
			ArrayCh.push(Checker);
		});
			
		var TableArray = [];
		var column = $(y).parent().parent().parent().attr("column-no");
		$(y).closest("table").find("tbody").find("tr").each(function(){
			var Object = $(this);
			var ColumnByName = $(Object).find("td:nth-child(" + column + ")").text();
			TableArray.push({
				name: ColumnByName,
				body: Object
			
			});
		
		});
		TableArray.sort(function (a, b) {
			if (a.name == b.name) { return 0; }
			if (a.name > b.name) { return 1; }
			else { return -1; }
		});
		var TableArrayHide = [];
		var TableArrayShow = [];
		$(y).closest("table").find("tbody").html("");
		var AutoTable = $(y).closest("table").find("tbody");
		for (x = 0; x < ArrayCh.length; x++){
			for( i = 0; i < TableArray.length; i++) {
				if (TableArray[i].name.indexOf(ArrayCh[x]) > -1)
				{
					TableArrayShow.push({
						body: TableArray[i].body
					});
				}
				else{
					TableArrayHide.push({
						body: TableArray[i].body
					});
				}
			}
		}
		for (x = 0; x < TableArrayHide.length; x++){
			$(AutoTable).append(TableArrayHide[x].body);
			$(TableArrayHide[x].body).hide();
		}
		for (x = 0; x < TableArrayShow.length; x++){
			$(AutoTable).append(TableArrayShow[x].body);
			$(TableArrayShow[x].body).show();
		}
	  }
	  
	  function SubmitFilt(y, column){
		FilterValues(y);
		var Checker = $(y).parent().parent().parent().find(".FiltCheck:checked").val(),
		TableArray = [];
		$(y).closest("table").find("tbody").find("tr").each(function(){
			var Object = $(this);
			var ColumnByName = $(Object).find("td:nth-child(" + column + ")").text();
			TableArray.push({
				name: ColumnByName,
				body: Object
			
			});
		});	
		if (Checker == "Asec"){
			TableArray.sort(function (a, b) {
                if (a.name == b.name) { return 0; }
                if (a.name > b.name) { return 1; }
                else { return -1; }
            });
		}
		else {
			TableArray.sort(function (a, b) {
                if (a.name == b.name) { return 0; }
                if (a.name < b.name) { return 1; }
                else { return -1; }
            });
		}
		$(y).closest("table").find("tbody").html("");
		for( i = 0; i < TableArray.length; i++) {
			var AutoTable = $(y).closest("table").find("tbody");
			
			$(AutoTable).append(TableArray[i].body);
		}
	  }