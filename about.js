var cow = $("#cow"),
    foo = $("#mask"),
    bang = $("#bang"),
    drop = $(".drop"),
    legL = $(".legl"),
    legR = $(".legr"),
    overlapThreshold = "20%",
    animation = moo().pause(),
    boundingBox = document.getElementById("boundingBox"); 

TweenMax.set(cow, {
  svgOrigin:"321.05, 323.3", 
  rotation:50
});

TweenMax.set(foo, {
  y:0
});

TweenMax.set([legL, legR], {
  rotation:0
});

TweenMax.set(bang, {
  visibility:"visible",
  opacity: 0
});

Draggable.create(cow, {
  type:"rotation",
  throwProps:true,
  onDrag: test,
  onThrowUpdate:test
});

function test(e) {
    var rotation = this.target._gsTransform.rotation % 360;
  if (rotation < -180) { 
    rotation += 360;
  }
    updateBounds(this.target);
    if (rotation < 12 && rotation > -12 && !animation.isActive()) {
      animation.restart();
    }
}

function updateBounds(element) {
  var bounds = element.getBoundingClientRect(),
        style = boundingBox.style,
        doc = document.documentElement,
        scrollY = Math.max(doc.scrollTop, document.body.scrollTop);
    style.top = (bounds.top + scrollY) + "px";
    style.left = bounds.left + "px";
    style.width = bounds.width + "px";
    style.height = bounds.height + "px";
}

function moo() {
  var tl = new TimelineMax();
  tl.add("woah");
  tl.fromTo(bang, 0.75, {opacity:0}, {opacity:1, ease:Back.easeOut}, "woah")
  .fromTo(mask, 0.75, {y:0}, {y:-6, ease:Back.easeOut}, "woah")
  .fromTo(legR, 0.75, {rotation:0}, {rotation:-8, transformOrigin:"0 100%", ease:Back.easeOut}, "woah")
  .fromTo(legL, 0.75, {rotation:0}, {rotation:8, transformOrigin:"100% 100%", ease:Back.easeOut}, "woah")
  .fromTo(bang, 0.25, {opacity:1}, {opacity:0, ease:Circ.easeIn}, "woah+=0.75")
   .fromTo(mask, 0.25, {y:-6}, {y:0, ease:Circ.easeIn}, "woah+=1")
  .fromTo(legR, 0.25, {rotation:-8}, {rotation:0, transformOrigin:"0 100%", ease:Circ.easeOut}, "woah+=1")
  .fromTo(legL, 0.25, {rotation:8}, {rotation:0, transformOrigin:"100% 100%", ease:Circ.easeOut}, "woah+=1");
  return tl;
}

updateBounds(cow[0]);