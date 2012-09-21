#pragma strict

var speed : float = 3.0;

var angleVertical = 0;
var angleHorizont = 0;

function Start () {

}

function Update () {
	var h = Input.GetAxisRaw("Horizontal");
	var v = Input.GetAxisRaw("Vertical");
	
	//move bullet
	transform.Translate(Vector3(0,0,speed) * Time.deltaTime);
	
	//rotate bullet
	angleHorizont += h;
	angleVertical -= v;
	
	//Debug.Log(transform.rotation.eulerAngles);
	transform.rotation = Quaternion.Euler(angleVertical, angleHorizont, 0);
}