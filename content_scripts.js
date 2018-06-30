(function(){
	var moveMode=false;
	var cursor_position=[0,0];
	var start_cursor_position=null;
	var start_scroll_position=null;
	var target=null;
	document.addEventListener("DOMContentLoaded", function(e) {
		var cs=document.body.appendChild(document.createElement("style"));
		cs.textContent="html.reset-all-cursors *{cursor: move !important;}";
		document.appendChild(cs);
	});
	var html=document.getElementsByTagName("html")[0];
	window.addEventListener("keydown",function(e){
		if(e.keyCode===32&&(document.activeElement===document.body||e.target===document.body)){
			if(!moveMode){
				moveMode=true;
				html.classList.add("reset-all-cursors");
				document.body.style.cursor="move";
				target=document.scrollingElement;
				start_cursor_position=Array.prototype.slice.call(cursor_position);
				start_scroll_position=[target.scrollLeft,target.scrollTop];
			}
			e.preventDefault();
			return false;
		}
	});
	window.addEventListener("keypress",function(e){
		if(moveMode){
			e.preventDefault();
			return false;
		}
	})
	window.addEventListener("mousemove",function(e){
		cursor_position=[e.clientX,e.clientY];
		if(moveMode){
			if(start_cursor_position===null)start_cursor_position=Array.prototype.slice.call(cursor_position);
			target.scrollLeft=start_scroll_position[0]+start_cursor_position[0]-cursor_position[0];
			target.scrollTop=start_scroll_position[1]+start_cursor_position[1]-cursor_position[1];
		}
	});
	window.addEventListener("keyup",function(e){
		if(e.keyCode===32&&moveMode){
			moveMode=false;
			html.classList.remove("reset-all-cursors");
			document.body.style.cursor="";
		}
	});
})();