/// <reference path="quat.ts" />

// v: input vector
// u: axis of rotation, as a unit vector
// a: angle of rotation
function q_rotate(v : number[], u : number[], a : number) : number[] {

  // the rotation as a quaternion
  var q = new Quat( Math.cos(a/2),
    u[0]*Math.sin(a/2),
    u[1]*Math.sin(a/2),
    u[2]*Math.sin(a/2) );

  // convert vector v to a quaternion (it becomes a quaternion with zero real part)
  var v_ = new Quat(v);

  // quaternion product qvq'
  var q2 = q.mul(v_).mul(q.conjugate());

  return q2.vector();
}
