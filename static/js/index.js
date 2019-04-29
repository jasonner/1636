$(function(){
	
	$('.nav').on('click',function(e){
		e.preventDefault()
  		$(this).tab('show')
  		
	})
	
	$('.footer .nav li').on('click',function(e){
		$('.footer .nav li').eq(2).addClass('active')
		$(this).addClass('avtive')
  		console.log('footer')
	})
	
})
