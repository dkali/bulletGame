#pragma strict

var speed : float = 3.0;

var angleVertical = 0;
var angleHorizont = 0;
var v3Direction : Vector3;
var gvnbfr : GameObject;

function Start () {
	v3Direction = Vector3(0, 0, speed);
	gvnbfr = GameObject.Find("govnoBuffer");
}

function FixedUpdate () {
  var h : int;
  var v : int;
#if UNITY_IPHONE || UNITY_ANDROID
  h = ((gvnbfr.transform.position.x>=0) ? ((gvnbfr.transform.position.x==0) ? 0 : 1) : -1);
  v = ((gvnbfr.transform.position.y>=0) ? ((gvnbfr.transform.position.y==0) ? 0 : 1) : -1);
#else
  h = Input.GetAxisRaw("Horizontal");
  v = Input.GetAxisRaw("Vertical");
#endif
  
  //rotate bullet
  angleHorizont += h;
  angleVertical -= v;
  
  var targetQ : Quaternion = Quaternion.Euler(angleVertical, angleHorizont, 0);
  var smooth = 10; // скорость поворота градусов в секунду
  transform.rotation = Quaternion.Slerp(transform.rotation, targetQ, Time.deltaTime * smooth);

  //move bullet
  transform.Translate(v3Direction * Time.deltaTime);
}

function OnCollisionEnter(collision : Collision) {
    // Debug-draw all contact points and normals
    for (var contact : ContactPoint in collision.contacts) {
        Debug.DrawRay(contact.point, contact.normal, Color.white, 2, true);
    }
    
    //transform local direction to world coordinates
	var v3DirectionW = transform.TransformDirection(v3Direction);
    
    //reflect world direction from wall normal
    v3DirectionW = Vector3.Reflect(v3DirectionW, collision.contacts[0].normal);
    
    transform.rotation = Quaternion.LookRotation(v3DirectionW);
    
    angleHorizont = transform.rotation.eulerAngles.y;
    angleVertical = transform.rotation.eulerAngles.x;
}