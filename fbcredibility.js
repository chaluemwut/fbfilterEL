// var base_url = "http://127.0.0.1:9090/";
var base_url = "https://www.fbcredibility.com:8080/";
var server_url = base_url+"fbfilterel";

function createAssessmentButton(divId){
	ret = '<div id=assessment_div_'+divId+' class="right_div">';
	// ret += ' <div class="inline" style="position: relative; margin-top: 3px;">Agree</div>';
	ret += ' <button id=feedback_yes_'+divId+' class="inline">Yes</button>';
	ret += ' <button id=feedback_no_'+divId+' class="inline">No</button>';
	ret += '</div>';
	return ret
}

function createFBfilterELDiv(divId, message, feature){
	ret = '<div id=kku_'+divId+' style="position: relative; margin-top: 5px; width:100%; height:18px;">';
	ret += '<div class="inline" style="position: relative; margin-top: 5px; color:#FF8000;">FB Filter</div>';
	ret += '<div id=fb_result_'+divId+' class="inline" style="position: relative; margin-top: 4px; margin-left: 10px;">: </div>';
	ret += '<div class="inline" style="position: relative; margin-top: 5px; margin-left: 10px; color:#FF8000;"> ข้อความนี้สมควรวัดความน่าเชื่อถือหรือไม่?</div>';
	ret += createAssessmentButton(divId);
	ret += '</div>';
	return ret;
}

function get_user_name(){
	// fbxWelcomeBoxName
	var user_name = $("a[class='fbxWelcomeBoxName']");
	// console.log(user_name);
	return user_name.text();
}

$(document).ready(function () {

	setInterval(function(){
		$("[class*='userContentWrapper']").each(function(i){
			var sub_stream = $(this);
			var clearfix = $(sub_stream).find("[class='clearfix _5x46']");
			var user_content = $(sub_stream).find("div[class='_5pbx userContent']");

			var out_data = 'test';

			if($(clearfix).find("[id^='kku_']").length){
				// console.log('found');
			} else {
				clearfix.append(createFBfilterELDiv(i, out_data, ''));

				$("#feedback_yes_"+i).click(function(){
					var obj = $(this);
					var ret_id_obj = obj.attr('id');
					var ret_id = ret_id_obj.replace('feedback_yes_','');
					var urlCall =  server_url+"?user_post="+get_user_name()+"&return_id="+ret_id+"&sholdbe=yes"+"&message="+user_content.text();
					console.log(urlCall);
					$.ajax({
						type: "GET",
						async: true,
						url: urlCall,
						withCredentials: true,
						success: function(result){
							console.log(result);
							var ret_id = result['return_id'];
							// console.log(ret_id)
							// console.log($('#assessment_div_'+ret_id))
							$('#assessment_div_'+ret_id).append('<span class="inline" style="position: relative; color:green; margin-top 5px; margin-left: 5px;">'+result['description']+'</span>');
						}
					});
				});

				$("#feedback_no_"+i).click(function(){
					var obj = $(this);
					var ret_id_obj = obj.attr('id');
					var ret_id = ret_id_obj.replace('feedback_no_','');
					var urlCall =  server_url+"?user_post="+get_user_name()+"&return_id="+ret_id+"&sholdbe=no"+"&message="+user_content.text();
					console.log(urlCall);
					$.ajax({
						type: "GET",
						async: true,
						url: urlCall,
						withCredentials: true,
						success: function(result){
							console.log(result);
							var ret_id = result['return_id'];
							// console.log(ret_id)
							// console.log($('#assessment_div_'+ret_id))							
							$('#assessment_div_'+ret_id).append('<span class="inline" style="position: relative; color:green; margin-top 5px; margin-left: 5px;">'+result['description']+'</span>');
						}
					});
				});

			}
		});
	}, 3000);
 
});
console.log('end script');
