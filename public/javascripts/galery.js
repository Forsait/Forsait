var thumbs = document.getElementById( 'thumbs' );
var large = document.getElementById( 'large' );
      
thumbs.onclick = function() {
var target = event.target;
(target.tagName == 'IMG') ? large.src = target.src.replace( 'thumb', 'lg' ) : null;
}