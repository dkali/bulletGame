#pragma strict

var speed : float = 3.0;

var angleVertical = 0;
var angleHorizont = 0;
var v3Direction : Vector3;

function Start () {
	transform.rigidbody.velocity = Vector3(0, 0, speed);
}

function FixedUpdate () {
	var h = Input.GetAxisRaw("Horizontal");
	var v = Input.GetAxisRaw("Vertical");
	
	//move bullet
	//transform.Translate(Vector3(0,0,speed) * Time.deltaTime);
	
	//rotate bullet
	angleHorizont += h;
	angleVertical -= v;
	
	//Debug.Log(transform.rotation.eulerAngles);
	transform.rotation = Quaternion.Euler(angleVertical, angleHorizont, 0);
	//чтобы повернуть вектор на определенный угол вокруг заданной оси достаточно умножить кватернион вращения на этот вектор
	rigidbody.velocity = Quaternion.Euler(-v, h, 0) * rigidbody.velocity;
	
}

function OnCollisionEnter(collision : Collision) {
    // Debug-draw all contact points and normals
    for (var contact : ContactPoint in collision.contacts) {
        Debug.DrawRay(contact.point, contact.normal, Color.white, 2, true);
    }
        
    rigidbody.velocity = Vector3.Reflect(rigidbody.velocity, collision.contacts[0].normal);
    transform.rotation = Quaternion.LookRotation(rigidbody.velocity);
    angleHorizont = transform.rotation.eulerAngles.y;
    angleVertical = transform.rotation.eulerAngles.x;
}
